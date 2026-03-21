import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <div
      className={`rounded-2xl border border-black/5 bg-white p-4 ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}

