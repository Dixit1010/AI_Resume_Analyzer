import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Resume Details",
};

type Props = {
  params: { id: string };
};

export default function ResumeDetailPage({ params }: Props) {
  if (!params?.id) notFound();

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
        Resume Details
      </h1>
      <p className="text-sm text-stone-600">
        Resume id: <span className="font-mono">{params.id}</span>
      </p>
      <p className="text-sm text-stone-600">
        Coming soon. This page will display the resume, ATS report, and JD matches.
      </p>
    </div>
  );
}

