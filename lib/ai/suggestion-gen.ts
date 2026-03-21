import type { Suggestion } from "@/types";

export async function generateSuggestions(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _args: any,
): Promise<Suggestion[]> {
  // TODO: hook to your existing LLM suggestion pipeline.
  return [];
}

