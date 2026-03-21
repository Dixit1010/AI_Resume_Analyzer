"use client";

import { useCallback } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ResumeEditor({ value, onChange }: Props) {
  const handle = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
    [onChange],
  );

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4">
      <div className="text-sm font-semibold text-stone-900">Resume Editor</div>
      <textarea
        value={value}
        onChange={handle}
        className="mt-3 min-h-[260px] w-full resize-y rounded-xl border border-black/10 bg-stone-50 px-3 py-2 text-sm text-stone-800 outline-none"
        placeholder="Edit your resume text here..."
      />
    </div>
  );
}

