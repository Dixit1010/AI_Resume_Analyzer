export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterMs: number };

export async function rateLimit(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _key: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _limit: any,
): Promise<RateLimitResult> {
  // TODO: implement Redis/in-memory rate limiter.
  return { allowed: true };
}

