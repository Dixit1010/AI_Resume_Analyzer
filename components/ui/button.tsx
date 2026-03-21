import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, ...props }: Props) {
  return (
    <button
      {...props}
      className={`rounded-[10px] bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-800 ${
        className ?? ""
      }`}
    />
  );
}

