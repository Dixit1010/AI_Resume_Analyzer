import { prisma } from "./db/prisma";

type PlanFeature = "atsScan" | "jdMatch" | "coverLetter";

const PLAN_LIMITS: Record<
  "FREE" | "PRO" | "ENTERPRISE",
  { atsScansPerMonth: number | null; jdMatchesPerMonth: number | null }
> = {
  FREE: { atsScansPerMonth: 3, jdMatchesPerMonth: 1 },
  PRO: { atsScansPerMonth: null, jdMatchesPerMonth: null },
  ENTERPRISE: { atsScansPerMonth: null, jdMatchesPerMonth: null },
};

export async function checkPlanLimit(userId: string, feature: PlanFeature): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return false;

  const plan = (user.plan as keyof typeof PLAN_LIMITS) ?? "FREE";
  const limits = PLAN_LIMITS[plan];
  if (!limits) return false;

  const quota = (user.usageQuota as unknown as {
    scansUsed: number;
    scansLimit: number;
    jdMatchesUsed: number;
    jdMatchesLimit: number;
  }) ?? { scansUsed: 0, scansLimit: 3, jdMatchesUsed: 0, jdMatchesLimit: 1 };

  if (plan === "PRO" || plan === "ENTERPRISE") {
    return true;
  }

  if (feature === "atsScan") {
    return quota.scansUsed < quota.scansLimit;
  }

  if (feature === "jdMatch") {
    return quota.jdMatchesUsed < quota.jdMatchesLimit;
  }

  if (feature === "coverLetter") {
    return plan !== "FREE";
  }

  return false;
}

export function jsonError(error: string, code: string, status = 400): Response {
  return new Response(JSON.stringify({ error, code }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

