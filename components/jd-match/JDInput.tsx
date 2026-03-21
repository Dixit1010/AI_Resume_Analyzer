"use client";

import { useCallback } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
};

export default function JDInput({ value, onChange, onSubmit }: Props) {
  const handle = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
    [onChange],
  );

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4">
      <div className="text-sm font-semibold text-stone-900">Job Description</div>
      <textarea
        value={value}
        onChange={handle}
        className="mt-3 min-h-[220px] w-full resize-y rounded-xl border border-black/10 bg-stone-50 px-3 py-2 text-sm text-stone-800 outline-none"
        placeholder="Paste the job description here..."
      />
      {onSubmit ? (
        <button
          type="button"
          onClick={onSubmit}
          className="mt-3 rounded-[10px] bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-800"
        >
          Match Resume
        </button>
      ) : null}
    </div>
  );
}

