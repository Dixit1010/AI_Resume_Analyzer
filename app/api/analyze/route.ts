import { NextResponse } from "next/server";
import { z } from "zod";
import { analyzeResume } from "@/lib/ai/ats-scorer";

const schema = z.object({
  resumeText: z.string().min(50),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid input",
          code: "INVALID_INPUT",
        },
        { status: 400 }
      );
    }

    const { resumeText } = parsed.data;

    const result = await analyzeResume(resumeText, {
      industry: "technology",
      seniority: "entry",
      fileType: "text",
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Internal server error",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}