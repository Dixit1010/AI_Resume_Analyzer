import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "resume",
    resumes: [],
  });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  return NextResponse.json({
    ok: true,
    route: "resume",
    created: true,
    input: body,
    // TODO: wire to prisma + resume-parser.
    resume: null,
  });
}

