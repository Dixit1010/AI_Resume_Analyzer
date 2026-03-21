import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  children?: ReactNode;
};

export default function Sidebar({ children }: Props) {
  return (
    <aside className="hidden w-[210px] shrink-0 md:block">
      <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.04)]">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-blue-600 text-white shadow-sm shadow-black/10 flex items-center justify-center text-sm font-semibold">
            RQ
          </div>
          <span className="text-sm font-semibold tracking-tight">ResumeIQ</span>
        </Link>
        <div className="mt-5">{children}</div>
      </div>
    </aside>
  );
}

