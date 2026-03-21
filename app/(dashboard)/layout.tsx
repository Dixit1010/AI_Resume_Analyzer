import type { ReactNode } from "react";
import Link from "next/link";

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/resume", label: "Resumes" },
  { href: "/analyze", label: "Analyze" },
  { href: "/jd-match", label: "JD Match" },
  { href: "/cover-letter", label: "Cover Letter" },
  { href: "/settings", label: "Settings" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        <aside className="hidden w-[210px] shrink-0 md:block">
          <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.04)]">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-blue-600 text-white shadow-sm shadow-black/10 flex items-center justify-center text-sm font-semibold">
                RQ
              </div>
              <span className="text-sm font-semibold tracking-tight">ResumeIQ</span>
            </Link>

            <nav className="mt-5 space-y-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-[10px] px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 rounded-xl border border-black/5 bg-stone-50 p-3">
              <div className="flex items-center justify-between">
                <div className="text-xs">
                  <div className="font-semibold text-stone-900">Test User</div>
                  <div className="text-stone-500">FREE</div>
                </div>
                <div className="h-9 w-9 rounded-full bg-stone-200" />
              </div>
              <Link
                href="/settings"
                className="mt-3 block rounded-[10px] bg-stone-900 px-3 py-2 text-center text-xs font-semibold text-stone-50 hover:bg-stone-800"
              >
                Upgrade
              </Link>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                ResumeIQ
              </div>
              <div className="text-lg font-semibold tracking-tight text-stone-900">
                Dashboard
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="rounded-[10px] border border-black/10 bg-white px-3 py-2 text-sm font-medium text-stone-800 shadow-sm shadow-black/5 hover:bg-stone-50"
              >
                Back to site
              </Link>
            </div>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}

