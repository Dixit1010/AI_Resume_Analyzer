import type { JDMatchResult } from "@/types";

type Props = {
  result: JDMatchResult | null;
};

export default function MatchResult({ result }: Props) {
  if (!result) {
    return (
      <div className="rounded-2xl border border-black/5 bg-white p-4">
        <p className="text-sm text-stone-600">No match computed yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4 space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-stone-900">Match Score</div>
          <div className="mt-1 text-2xl font-semibold text-stone-900">
            {result.matchScore}
          </div>
        </div>
        <div className="text-right text-xs text-stone-500">
          Semantic: {Math.round(result.semanticScore)}
        </div>
      </div>

      <div className="text-sm text-stone-600">
        Keyword coverage: {result.keywordCoverageScore}%
      </div>
    </div>
  );
}

