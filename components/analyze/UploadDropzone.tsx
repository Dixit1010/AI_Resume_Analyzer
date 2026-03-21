"use client";

import { useCallback, useState } from "react";

type Props = {
  onFile?: (file: File) => void;
};

export default function UploadDropzone({ onFile }: Props) {
  const [error, setError] = useState<string | null>(null);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      const file = e.target.files?.[0];
      if (!file) return;
      onFile?.(file);
    },
    [onFile],
  );

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      <label className="block text-sm font-medium text-stone-800">
        Upload resume
        <input
          type="file"
          className="mt-2 block w-full text-sm text-stone-600"
          onChange={onChange}
          accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
        />
      </label>
      {error ? <p className="mt-2 text-sm text-rose-700">{error}</p> : null}
    </div>
  );
}

