import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Placeholder implementation. Later this will accept multipart/form-data
  // and store the file + parsed resume.
  const contentType = req.headers.get("content-type") ?? "";
  const received = { contentType };

  if (contentType.includes("multipart/form-data")) {
    // Best-effort form parsing; ignore any errors for stub behavior.
    await req.formData().catch(() => null);
  } else {
    await req.json().catch(() => null);
  }

  return NextResponse.json({ ok: true, route: "upload", received });
}

