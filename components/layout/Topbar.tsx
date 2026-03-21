type Props = {
  title: string;
  description?: string;
};

export default function Topbar({ title, description }: Props) {
  return (
    <header className="mb-6 flex items-center justify-between">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
          ResumeIQ
        </div>
        <div className="text-lg font-semibold tracking-tight text-stone-900">
          {title}
        </div>
        {description ? (
          <div className="mt-1 text-sm text-stone-600">{description}</div>
        ) : null}
      </div>
    </header>
  );
}

