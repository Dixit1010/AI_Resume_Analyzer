import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: Props) {
  return (
    <input
      {...props}
      className={`w-full rounded-[10px] border border-black/10 bg-white px-3 py-2 text-sm outline-none shadow-sm shadow-black/5 focus:border-blue-300 ${
        className ?? ""
      }`}
    />
  );
}

