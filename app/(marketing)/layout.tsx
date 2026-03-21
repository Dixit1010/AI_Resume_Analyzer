import type { ReactNode } from "react";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-stone-50 text-stone-900">{children}</div>;
}

