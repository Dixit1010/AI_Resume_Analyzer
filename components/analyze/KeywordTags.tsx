"use client";

type Props = {
  tags: string[];
  tone?: "green" | "amber" | "rose" | "stone";
};

const TONE: Record<NonNullable<Props["tone"]>, string> = {
  green: "bg-green-50 text-green-800 border-green-200",
  amber: "bg-amber-50 text-amber-800 border-amber-200",
  rose: "bg-rose-50 text-rose-800 border-rose-200",
  stone: "bg-stone-50 text-stone-700 border-black/10",
};

export default function KeywordTags({ tags, tone = "stone" }: Props) {
  const cls = TONE[tone];

  if (!tags.length) {
    return <div className="text-xs text-stone-500">No keywords.</div>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className={`rounded-full border px-3 py-1 text-xs font-medium ${cls}`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

