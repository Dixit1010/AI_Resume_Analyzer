import type { Suggestion } from "@/types";

type Props = {
  suggestion: Suggestion;
};

export default function SuggestionCard({ suggestion }: Props) {
  return (
    <div className="rounded-xl border border-black/5 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-stone-900">
          {suggestion.title}
        </h3>
        <span className="text-xs font-medium text-stone-600">
          {suggestion.impact}
        </span>
      </div>
      <p className="mt-2 text-sm text-stone-600">{suggestion.description}</p>
      {suggestion.section ? (
        <p className="mt-2 text-xs text-stone-500">
          Applies to: <span className="font-medium">{suggestion.section}</span>
        </p>
      ) : null}
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div>
          <div className="text-xs font-medium text-stone-500">Before</div>
          <pre className="mt-1 whitespace-pre-wrap rounded-md bg-stone-50 p-2 text-xs text-stone-700">
            {suggestion.before}
          </pre>
        </div>
        <div>
          <div className="text-xs font-medium text-stone-500">After</div>
          <pre className="mt-1 whitespace-pre-wrap rounded-md bg-stone-50 p-2 text-xs text-stone-700">
            {suggestion.after}
          </pre>
        </div>
      </div>
    </div>
  );
}

