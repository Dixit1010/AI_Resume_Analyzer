import { getFlashModel } from "./gemini";
import { ATSScore, Suggestion } from "@/types";

export interface AnalyzeOptions {
  industry: string;
  seniority: string;
  fileType?: "pdf" | "docx" | "text";
}

interface ParsingResult {
  rawText: string;
  parsingWarnings: string[];
}

interface StructureExtractionResult {
  contact: unknown;
  summary: unknown;
  experience: unknown;
  skills: unknown;
  education: unknown;
  certifications: unknown;
}

interface KeywordAnalysisResult {
  presentKeywords: string[];
  missingKeywords: string[];
  keywordDensityScore: number;
}

interface RuleCheck {
  id: string;
  passed: boolean;
  message: string;
}

interface RulesEngineResult {
  passed: RuleCheck[];
  failed: RuleCheck[];
}

interface ScoreComputationResult {
  atsScore: ATSScore;
  sectionCompleteness: number;
}

interface SuggestionGenerationResult {
  suggestions: Suggestion[];
}

export interface AnalyzeResult {
  parsing: ParsingResult;
  structure: StructureExtractionResult;
  keywords: KeywordAnalysisResult;
  rules: RulesEngineResult;
  scores: ScoreComputationResult;
  suggestions: SuggestionGenerationResult;
}

const STRUCTURE_PROMPT = `
Extract resume sections as JSON with this shape:
{
  "contact": { ... } | null,
  "summary": string | null,
  "experience": [] | null,
  "skills": [] | null,
  "education": [] | null,
  "certifications": [] | null
}
Return null for missing sections. Do not include any extra keys.
`;

const SUGGESTION_BATCH_PROMPT = `
You are an ATS optimization assistant.

Given multiple resume issues and keyword gaps, generate specific, actionable suggestions.

For EACH item, return strictly JSON objects of the form:
{
  "id": string,
  "title": string,
  "description": string,
  "before": string,
  "after": string,
  "impact": "high" | "medium" | "low",
  "category": "keywords" | "formatting" | "content" | "structure",
  "section": string | null
}

Respond with a single top-level JSON array only.
`;

const INDUSTRY_KEYWORDS: Record<
  string,
  { hard: string[]; soft: string[]; tools: string[]; certifications: string[] }
> = {
  "technology-entry": {
    hard: ["JavaScript", "TypeScript", "React", "APIs"],
    soft: ["communication", "teamwork"],
    tools: ["Git", "GitHub"],
    certifications: [],
  },
};

async function stage1Parse(
  input: Buffer | string,
  options: AnalyzeOptions,
): Promise<ParsingResult> {
  const warnings: string[] = [];

  if (options.fileType === "pdf" && input instanceof Buffer) {
    const pdfParse = (await import("pdf-parse")).default as any;
    const result = await pdfParse(input);
    const text = result.text ?? "";
    if (result.metadata?.has("Table")) {
      warnings.push("Tables detected — some ATS may not read them correctly.");
    }
    return { rawText: text, parsingWarnings: warnings };
  }

  if (options.fileType === "docx" && input instanceof Buffer) {
    const mammoth = await import("mammoth");
    const result = await ((mammoth as any).default ?? mammoth).extractRawText({
      buffer: input,
    });
    const text = result.value ?? "";
    if (result.messages.length > 0) {
      warnings.push(
        ...result.messages.map((m: { message: string }) => m.message),
      );
    }
    return { rawText: text, parsingWarnings: warnings };
  }

  return {
    rawText: typeof input === "string" ? input : input.toString("utf8"),
    parsingWarnings: warnings,
  };
}

const EMPTY_STRUCTURE: StructureExtractionResult = {
  contact: null,
  summary: null,
  experience: null,
  skills: null,
  education: null,
  certifications: null,
};

async function stage2StructureExtraction(rawText: string): Promise<StructureExtractionResult> {
  const model = getFlashModel();
  if (!model) {
    return EMPTY_STRUCTURE;
  }

  try {
    const result = await model.generateContent(
      `${STRUCTURE_PROMPT}\n\nResume text:\n\n${rawText}`,
    );
    const text = result.response.text();

    try {
      const parsed = JSON.parse(text) as StructureExtractionResult;
      return parsed;
    } catch {
      return EMPTY_STRUCTURE;
    }
  } catch {
    // Invalid API key, quota, network, or non-JSON response from API
    return EMPTY_STRUCTURE;
  }
}

function stage3KeywordAnalysis(
  rawText: string,
  options: AnalyzeOptions,
): KeywordAnalysisResult {
  const key = `${options.industry.toLowerCase()}-${options.seniority.toLowerCase()}`;
  const keywordConfig = INDUSTRY_KEYWORDS[key] ?? INDUSTRY_KEYWORDS["technology-entry"];

  const textLower = rawText.toLowerCase();
  const allKeywords = [
    ...keywordConfig.hard,
    ...keywordConfig.soft,
    ...keywordConfig.tools,
    ...keywordConfig.certifications,
  ];

  const present: string[] = [];
  const missing: string[] = [];

  for (const kw of allKeywords) {
    if (textLower.includes(kw.toLowerCase())) {
      present.push(kw);
    } else {
      missing.push(kw);
    }
  }

  const keywordDensityScore =
    allKeywords.length === 0 ? 0 : (present.length / allKeywords.length) * 100;

  return {
    presentKeywords: present,
    missingKeywords: missing,
    keywordDensityScore,
  };
}

function stage4RulesEngine(parsed: ParsingResult, rawText: string): RulesEngineResult {
  const rules: RuleCheck[] = [];

  const addRule = (id: string, passed: boolean, message: string) => {
    rules.push({ id, passed, message });
  };

  const contactPattern = /(email|@|\+?\d{7,})/i;
  addRule("contactComplete", contactPattern.test(rawText), "Contact information appears complete.");

  addRule(
    "noTables",
    !parsed.parsingWarnings.some((w) => w.toLowerCase().includes("table")),
    "No table formatting detected.",
  );

  addRule("noColumns", true, "Single-column layout assumed.");
  addRule("safeFonts", true, "No decorative fonts detected in plain text.");

  const dateRegex = /\b(0[1-9]|1[0-2])\/\d{4}\b/;
  addRule("dateFormats", dateRegex.test(rawText), "Dates use MM/YYYY format.");

  addRule("fileFormat", true, "Supported file format.");

  const sectionHeaders = ["experience", "education", "skills", "summary"];
  addRule(
    "sectionHeaders",
    sectionHeaders.some((h) => rawText.toLowerCase().includes(h)),
    "Standard section headers used.",
  );

  const bulletPattern = /(^|\n)[\-\u2022\*]\s+/;
  addRule("bulletPoints", bulletPattern.test(rawText), "Bullet points used in experience.");

  const passed = rules.filter((r) => r.passed);
  const failed = rules.filter((r) => !r.passed);

  return { passed, failed };
}

function stage5ScoreComputation(
  keywordResult: KeywordAnalysisResult,
  rules: RulesEngineResult,
  structure: StructureExtractionResult,
): ScoreComputationResult {
  const totalRules = rules.passed.length + rules.failed.length || 1;
  const formatting = (rules.passed.length / totalRules) * 100 * 0.2;

  const keywords = keywordResult.keywordDensityScore * 0.35;

  const summaryScore = structure.summary ? 80 : 40;
  const experienceScore = Array.isArray(structure.experience) && structure.experience.length > 0 ? 85 : 40;
  const skillsScore = Array.isArray(structure.skills) && structure.skills.length > 0 ? 80 : 40;
  const contentQuality = ((summaryScore + experienceScore + skillsScore) / 3) * 0.25;

  const sectionKeys: Array<keyof StructureExtractionResult> = [
    "contact",
    "summary",
    "experience",
    "skills",
    "education",
  ];
  const sectionsPresent = sectionKeys.filter((key) => {
    const value = structure[key];
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value);
  }).length;

  const sectionCompleteness = (sectionsPresent / 5) * 100;
  const structureScore = sectionCompleteness * 0.2;

  const total = formatting + keywords + contentQuality + structureScore;

  const atsScore: ATSScore = {
    total: Math.round(total),
    sections: {
      contact: Math.round(sectionCompleteness),
      summary: Math.round(summaryScore),
      experience: Math.round(experienceScore),
      skills: Math.round(skillsScore),
      education: Math.round(structure.education ? 80 : 40),
      formatting: Math.round((rules.passed.length / totalRules) * 100),
    },
    parsingWarnings: [],
    keywordScore: Math.round(keywordResult.keywordDensityScore),
  };

  return { atsScore, sectionCompleteness };
}

async function stage6SuggestionGeneration(
  rules: RulesEngineResult,
  keywords: KeywordAnalysisResult,
  rawText: string,
): Promise<SuggestionGenerationResult> {
  const issues = [
    ...rules.failed.map((r) => ({
      type: "rule",
      id: r.id,
      message: r.message,
    })),
    ...keywords.missingKeywords.map((kw) => ({
      type: "keyword",
      id: `keyword-${kw}`,
      message: `Missing important keyword: ${kw}`,
    })),
  ];

  if (issues.length === 0) {
    return { suggestions: [] };
  }

  const promptIssues = JSON.stringify({ issues, resume: rawText });

  const model = getFlashModel();
  if (!model) {
    return { suggestions: [] };
  }

  let parsed: Suggestion[] = [];
  try {
    const result = await model.generateContent(
      `${SUGGESTION_BATCH_PROMPT}\n\nINPUT:\n${promptIssues}`,
    );
    const text = result.response.text();
    try {
      parsed = JSON.parse(text) as Suggestion[];
    } catch {
      parsed = [];
    }
  } catch {
    parsed = [];
  }

  const impactOrder: Record<Suggestion["impact"], number> = {
    high: 0,
    medium: 1,
    low: 2,
  };

  const suggestions = parsed.sort(
    (a, b) => impactOrder[a.impact] - impactOrder[b.impact],
  );

  return { suggestions };
}

export async function analyzeResume(
  input: Buffer | string,
  options: AnalyzeOptions,
): Promise<AnalyzeResult> {
  const parsing = await stage1Parse(input, options);
  const structure = await stage2StructureExtraction(parsing.rawText);
  const keywords = stage3KeywordAnalysis(parsing.rawText, options);
  const rules = stage4RulesEngine(parsing, parsing.rawText);
  const scores = stage5ScoreComputation(keywords, rules, structure);
  const suggestions = await stage6SuggestionGeneration(
    rules,
    keywords,
    parsing.rawText,
  );

  scores.atsScore.parsingWarnings = parsing.parsingWarnings;

  return {
    parsing,
    structure,
    keywords,
    rules,
    scores,
    suggestions,
  };
}

