"use client";

type Props = {
  score: number;
};

export default function ATSScoreRing({ score }: Props) {
  const safeScore = Number.isFinite(score) ? Math.max(0, Math.min(100, score)) : 0;

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4 text-center">
      <div className="text-4xl font-semibold text-stone-900">{safeScore}</div>
      <div className="mt-1 text-sm text-stone-600">ATS Score</div>
    </div>
  );
}

