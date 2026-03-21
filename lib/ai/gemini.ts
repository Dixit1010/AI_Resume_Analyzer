import { GoogleGenerativeAI, type GenerativeModel } from "@google/generative-ai";

/**
 * Reads `GEMINI_API_KEY` from the environment (trimmed).
 * Set this in `.env.local` for local dev and restart `next dev` after changes.
 */
let cachedFlashModel: GenerativeModel | null | undefined;

export function getFlashModel(): GenerativeModel | null {
  if (cachedFlashModel !== undefined) {
    return cachedFlashModel;
  }

  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) {
    cachedFlashModel = null;
    return null;
  }

  const genAI = new GoogleGenerativeAI(key);
  cachedFlashModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });
  return cachedFlashModel;
}

export function isGeminiConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY?.trim());
}
