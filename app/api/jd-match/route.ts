import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  return NextResponse.json(
    {
      ok: true,
      route: "jd-match",
      input: body,
      // TODO: wire to lib/ai/jd-matcher.ts once external deps are installed.
      result: null,
    },
    { status: 200 },
  );
}

