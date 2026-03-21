export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
          Good morning, Test User
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          Here’s your resume health overview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Resumes", value: "2" },
          { label: "Analyses This Month", value: "1" },
          { label: "Best ATS Score", value: "73" },
          { label: "JD Matches", value: "0" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-black/5 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.04)]"
          >
            <div className="text-xs text-stone-500">{s.label}</div>
            <div className="mt-2 text-2xl font-semibold text-stone-900">
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-black/5 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-stone-900">
                Resume Health
              </div>
              <div className="text-xs text-stone-500">
                Default resume: Software Engineer
              </div>
            </div>
            <button className="rounded-[10px] bg-stone-900 px-3 py-2 text-xs font-semibold text-stone-50 hover:bg-stone-800">
              Improve Score
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              "Add more JD keywords to Skills",
              "Standardize date formats (MM/YYYY)",
              "Avoid multi-column layouts",
            ].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-black/5 bg-stone-50 p-3 text-xs text-stone-700"
              >
                {i}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.04)]">
          <div className="text-sm font-semibold text-stone-900">Quick Actions</div>
          <div className="mt-4 space-y-2">
            {[
              "Upload New Resume",
              "Analyze Resume",
              "Match to JD",
              "Cover Letter",
            ].map((a) => (
              <button
                key={a}
                className="w-full rounded-[10px] border border-black/10 bg-white px-3 py-2 text-left text-sm font-medium text-stone-800 shadow-sm shadow-black/5 hover:bg-stone-50"
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

