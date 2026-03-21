import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  return NextResponse.json({
    ok: true,
    route: "cover-letter",
    input: body,
    // TODO: implement cover-letter generator.
    coverLetter: null,
  });
}

