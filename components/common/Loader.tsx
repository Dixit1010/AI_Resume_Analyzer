"use client";

export default function Loader() {
  return (
    <div className="flex items-center gap-2 text-sm text-stone-600">
      <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-stone-500" />
      Loading...
    </div>
  );
}

