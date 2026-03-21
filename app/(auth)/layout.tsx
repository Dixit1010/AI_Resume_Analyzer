import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-blue-600 text-white shadow-sm shadow-black/10 flex items-center justify-center text-sm font-semibold">
            RQ
          </div>
          <span className="text-lg font-semibold tracking-tight">ResumeIQ</span>
        </Link>
        <div className="text-xs text-stone-500">AI career toolkit</div>
      </div>

      <div className="mx-auto flex w-full max-w-lg px-4 pb-16 pt-8">
        <div className="w-full rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.04)]">
          {children}
        </div>
      </div>
    </div>
  );
}

