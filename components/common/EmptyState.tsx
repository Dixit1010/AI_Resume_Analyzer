"use client";

type Props = {
  title: string;
  description?: string;
};

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4">
      <div className="text-sm font-semibold text-stone-900">{title}</div>
      {description ? (
        <div className="mt-1 text-sm text-stone-600">{description}</div>
      ) : null}
    </div>
  );
}

