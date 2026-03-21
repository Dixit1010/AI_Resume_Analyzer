"use client";

import { useCallback, useState } from "react";

export type AnalyzePayload = {
  resumeId?: string;
  industry?: string;
  seniority?: string;
  fileType?: "pdf" | "docx" | "text";
  // If you upload on the client you can also pass base64/file metadata later.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawText?: any;
};

export function useATSScore() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (payload: AnalyzePayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Analyze failed");
      return data;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Analyze failed";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, analyze };
}

