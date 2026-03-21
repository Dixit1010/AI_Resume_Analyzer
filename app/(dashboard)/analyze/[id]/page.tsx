import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Analysis Details",
};

type Props = {
  params: { id: string };
};

export default function AnalyzeDetailPage({ params }: Props) {
  if (!params?.id) notFound();

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
        Analysis Details
      </h1>
      <p className="text-sm text-stone-600">
        Analysis id: <span className="font-mono">{params.id}</span>
      </p>
      <p className="text-sm text-stone-600">
        Coming soon. This page will show ATS score breakdown and improvement suggestions.
      </p>
    </div>
  );
}

