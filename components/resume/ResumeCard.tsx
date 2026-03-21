type Props = {
  title: string;
  subtitle?: string;
  onOpen?: () => void;
};

export default function ResumeCard({ title, subtitle, onOpen }: Props) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-stone-900">{title}</div>
          {subtitle ? (
            <div className="mt-1 text-xs text-stone-500">{subtitle}</div>
          ) : null}
        </div>
        {onOpen ? (
          <button
            type="button"
            onClick={onOpen}
            className="rounded-[10px] bg-stone-900 px-3 py-2 text-xs font-semibold text-stone-50 hover:bg-stone-800"
          >
            Open
          </button>
        ) : null}
      </div>
    </div>
  );
}

