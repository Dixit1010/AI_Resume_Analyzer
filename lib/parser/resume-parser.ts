export type ParsedResume = {
  rawText: string;
  warnings: string[];
};

export async function parseResumeFile(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _file: any,
  _fileType?: "pdf" | "docx" | "text",
): Promise<ParsedResume> {
  // TODO: implement parser using pdf-parse/mammoth (or Gemini extraction).
  return { rawText: "", warnings: [] };
}

