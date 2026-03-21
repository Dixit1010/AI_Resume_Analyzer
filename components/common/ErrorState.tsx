"use client";

type Props = {
  message: string;
};

export default function ErrorState({ message }: Props) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
      <div className="text-sm font-semibold text-rose-900">Error</div>
      <div className="mt-1 text-sm text-rose-800">{message}</div>
    </div>
  );
}

