"use client";

import { useState } from "react";
import type { ATSScore, Suggestion } from "@/types";
import { Button, Card } from "@/components/ui";
import ATSScoreRing from "@/components/analyze/ATSScoreRing";
import KeywordTags from "@/components/analyze/KeywordTags";
import SuggestionCard from "@/components/analyze/SuggestionCard";
import Loader from "@/components/common/Loader";
import ErrorState from "@/components/common/ErrorState";

type AnalyzeApiData = {
  scores: {
    atsScore: ATSScore;
    sectionCompleteness: number;
  };
  keywords: {
    presentKeywords: string[];
    missingKeywords: string[];
    keywordDensityScore: number;
  };
  suggestions: {
    suggestions: Suggestion[];
  };
};

type AnalyzeSuccessResponse = {
  success: true;
  data: AnalyzeApiData;
};

type AnalyzeErrorResponse = {
  error: string;
  code?: string;
};

export default function AnalyzePage() {
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyzeApiData | null>(null);

  async function handleAnalyze() {
    setError(null);
    setData(null);

    if (resumeText.trim().length < 50) {
      setError("Please paste at least 50 characters of resume text.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: resumeText.trim() }),
      });

      const json = (await res.json()) as AnalyzeSuccessResponse | AnalyzeErrorResponse;

      if (!res.ok || !("success" in json) || !json.success) {
        const err = json as AnalyzeErrorResponse;
        setError(err.error ?? "Something went wrong. Please try again.");
        return;
      }

      setData(json.data);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
          Analyze Resume
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          Paste your resume text and run an ATS-style analysis.
        </p>
      </div>

      <Card className="space-y-4">
        <div>
          <label
            htmlFor="resume-text"
            className="mb-2 block text-sm font-medium text-stone-800"
          >
            Resume text
          </label>
          <textarea
            id="resume-text"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={14}
            placeholder="Paste your full resume here (minimum 50 characters)..."
            className="w-full resize-y rounded-xl border border-black/10 bg-stone-50/80 px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10"
            disabled={loading}
          />
          <p className="mt-1 text-xs text-stone-500">
            {resumeText.trim().length} / 50+ characters
          </p>
        </div>
        <Button type="button" onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing…" : "Analyze"}
        </Button>
        {loading ? (
          <div className="pt-2">
            <Loader />
          </div>
        ) : null}
      </Card>

      {error ? (
        <ErrorState message={error} />
      ) : null}

      {data && !loading ? (
        <div className="space-y-6">
          <Card>
            <h2 className="mb-4 text-sm font-semibold text-stone-900">
              ATS score
            </h2>
            <ATSScoreRing score={data.scores.atsScore.total} />
          </Card>

          <Card className="space-y-4">
            <h2 className="text-sm font-semibold text-stone-900">Keywords</h2>
            <div>
              <p className="mb-2 text-xs font-medium text-stone-600">
                Matched in your resume
              </p>
              <KeywordTags tags={data.keywords.presentKeywords} tone="green" />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-stone-600">
                Missing or not detected
              </p>
              <KeywordTags tags={data.keywords.missingKeywords} tone="rose" />
            </div>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-sm font-semibold text-stone-900">
              Suggestions
            </h2>
            {data.suggestions.suggestions.length === 0 ? (
              <p className="text-sm text-stone-500">No suggestions this run.</p>
            ) : (
              <ul className="space-y-3">
                {data.suggestions.suggestions.map((suggestion, index) => (
                  <li key={suggestion.id || `suggestion-${index}`}>
                    <SuggestionCard suggestion={suggestion} />
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      ) : null}
    </div>
  );
}
