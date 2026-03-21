"use client";

type Props = {
  pdfUrl?: string | null;
};

export default function PDFPreview({ pdfUrl }: Props) {
  if (!pdfUrl) {
    return (
      <div className="rounded-2xl border border-black/5 bg-white p-4">
        <p className="text-sm text-stone-600">No PDF selected.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4">
      <p className="text-sm font-medium text-stone-900">PDF Preview</p>
      <a
        href={pdfUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-2 block text-sm text-blue-700 hover:underline"
      >
        Open PDF
      </a>
    </div>
  );
}

