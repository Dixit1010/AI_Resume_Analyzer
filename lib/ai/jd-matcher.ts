import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { prisma } from "@/lib/db/prisma";
import { JDMatchResult } from "@/types";
import { flashModel } from "./gemini";

const EMBEDDING_MODEL = "text-embedding-3-large";

const JD_PARSE_PROMPT = `
Extract structured information from this job description. 
Return ONLY JSON with this shape:
{
  "title": string | null,
  "company": string | null,
  "requiredSkills": string[],
  "niceToHaveSkills": string[],
  "responsibilities": string[],
  "experienceLevel": "entry" | "mid" | "senior" | "executive" | null,
  "educationRequired": string | null,
  "salaryRange": string | null
}
`;

const REWRITE_PROMPT = `
You rewrite resume sections to better match job descriptions while keeping them truthful.

For EACH pair of resume section and JD requirement, return:
{
  "section": string,
  "original": string,
  "rewritten": string,
  "keywordsAdded": string[]
}

Respond with a JSON array only.
`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY ?? "",
});

function stringSimilarity(a: string, b: string): number {
  const s1 = a.toLowerCase();
  const s2 = b.toLowerCase();
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  const longerLength = longer.length;
  if (longerLength === 0) return 1;
  const match = longer.split("").filter((ch, i) => ch === shorter[i]).length;
  return match / longerLength;
}

async function parseJDWithAI(jdText: string) {
  const result = await flashModel.generateContent(`${JD_PARSE_PROMPT}\n\nJD:\n${jdText}`);
  const text = result.response.text();
  return JSON.parse(text) as {
    title: string | null;
    company: string | null;
    requiredSkills: string[];
    niceToHaveSkills: string[];
    responsibilities: string[];
    experienceLevel: "entry" | "mid" | "senior" | "executive" | null;
    educationRequired: string | null;
    salaryRange: string | null;
  };
}

async function embed(texts: string[]): Promise<number[][]> {
  const res = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
  });
  return res.data.map((d: { embedding: unknown }) => d.embedding as number[]);
}

function computeExperienceLevelScore(
  resumeLevel: "entry" | "mid" | "senior" | "executive",
  jdLevel: "entry" | "mid" | "senior" | "executive" | null,
): number {
  if (!jdLevel) return 70;
  const levels = ["entry", "mid", "senior", "executive"] as const;
  const diff = Math.abs(levels.indexOf(resumeLevel) - levels.indexOf(jdLevel));
  if (diff === 0) return 100;
  if (diff === 1) return 80;
  if (diff === 2) return 60;
  return 40;
}

export async function matchResumeToJD(
  resumeId: string,
  jdId: string,
  userId: string,
): Promise<JDMatchResult> {
  const resume = await prisma.resume.findUnique({
    where: { id: resumeId },
  });
  const jd = await prisma.jobDescription.findUnique({
    where: { id: jdId },
  });

  if (!resume || !jd || resume.userId !== userId || jd.userId !== userId) {
    throw new Error("Resume or job description not found");
  }

  const jdParsed = await parseJDWithAI(jd.rawText);

  const content = resume.content as unknown as {
    summary?: string;
    skills?: { technical?: string[]; soft?: string[]; tools?: string[] };
  };

  const resumeSummary = content.summary ?? "";
  const resumeSkills = [
    ...(content.skills?.technical ?? []),
    ...(content.skills?.soft ?? []),
    ...(content.skills?.tools ?? []),
  ].join(", ");

  const [jdEmbedding, resumeSummaryEmbedding, resumeSkillsEmbedding] =
    await embed([jd.rawText, resumeSummary, resumeSkills]);

  const index = pinecone.Index(process.env.PINECONE_INDEX ?? "resumeiq-jd-embeddings");

  await index.upsert([
    {
      id: jd.id,
      values: jdEmbedding,
      metadata: {
        jdId,
        userId,
        title: jdParsed.title ?? jd.title ?? "",
      },
    },
  ]);

  const semanticScore = Math.round(
    (resumeSummaryEmbedding.length > 0 && jdEmbedding.length === resumeSummaryEmbedding.length
      ? resumeSummaryEmbedding.reduce((sum, v, i) => sum + v * jdEmbedding[i], 0) /
        (Math.sqrt(resumeSummaryEmbedding.reduce((s, v) => s + v * v, 0)) *
          Math.sqrt(jdEmbedding.reduce((s, v) => s + v * v, 0)))
      : 0) * 100,
  );

  const jdRequired = jdParsed.requiredSkills ?? [];
  const jdNice = jdParsed.niceToHaveSkills ?? [];
  const jdSkills = [...jdRequired, ...jdNice];

  const present: string[] = [];
  const criticalMissing: string[] = [];
  const beneficialMissing: string[] = [];
  const overqualified: string[] = [];

  const resumeSkillTokens = resumeSkills.split(/[,;\n]/).map((s) => s.trim());

  for (const skill of jdRequired) {
    const inResume = resumeSkillTokens.some((s) => stringSimilarity(s, skill) > 0.85);
    if (inResume) present.push(skill);
    else criticalMissing.push(skill);
  }

  for (const skill of jdNice) {
    const inResume = resumeSkillTokens.some((s) => stringSimilarity(s, skill) > 0.85);
    if (inResume) present.push(skill);
    else beneficialMissing.push(skill);
  }

  for (const s of resumeSkillTokens) {
    if (!s) continue;
    const matches = jdSkills.some((jdSkill) => stringSimilarity(jdSkill, s) > 0.85);
    if (!matches) {
      overqualified.push(s);
    }
  }

  const totalConsidered = jdSkills.length || 1;
  const keywordCoverageScore = Math.round((present.length / totalConsidered) * 100);

  const inferredResumeLevel: "entry" | "mid" | "senior" | "executive" =
    jdParsed.experienceLevel ?? "mid";
  const experienceLevelScore = computeExperienceLevelScore(
    inferredResumeLevel,
    jdParsed.experienceLevel,
  );

  const matchScore =
    semanticScore * 0.4 + keywordCoverageScore * 0.4 + experienceLevelScore * 0.2;

  const rewriteInput = JSON.stringify({
    resumeSummary,
    resumeSkills,
    requiredSkills: jdRequired,
    responsibilities: jdParsed.responsibilities ?? [],
  });

  const rewriteResult = await flashModel.generateContent(
    `${REWRITE_PROMPT}\n\nINPUT:\n${rewriteInput}`,
  );
  const rewriteText = rewriteResult.response.text();
  const rewrites = JSON.parse(rewriteText) as JDMatchResult["rewrites"];

  const result: JDMatchResult = {
    matchScore: Math.round(matchScore),
    semanticScore,
    keywordCoverageScore,
    experienceLevelScore,
    skills: {
      criticalMissing,
      beneficialMissing,
      present,
      overqualified,
    },
    rewrites,
  };

  return result;
}

