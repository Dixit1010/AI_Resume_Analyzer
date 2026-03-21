"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    priceYearly: 0,
    highlight: false,
    features: [
      "3 ATS scans / month",
      "1 JD match / month",
      "Modern & Classic templates",
      "Watermarked PDF export",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 19,
    priceYearly: 182.4,
    highlight: true,
    features: [
      "Unlimited ATS scans",
      "Unlimited JD matches",
      "All templates unlocked",
      "AI suggestions & cover letters",
      "Version history",
      "No watermark exports",
    ],
  },
  {
    id: "business",
    name: "Business",
    priceMonthly: 49,
    priceYearly: 470.4,
    highlight: false,
    features: [
      "5 team seats included",
      "Bulk analysis",
      "API access (500 calls / mo)",
      "White-label branding",
      "Priority support",
    ],
  },
];

export default function MarketingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-black/5 bg-stone-50/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-blue-600 text-white shadow-sm shadow-black/10 flex items-center justify-center text-sm font-semibold">
              RQ
            </div>
            <span className="text-lg font-semibold tracking-tight text-stone-900">
              ResumeIQ
            </span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-stone-600 md:flex">
            <a href="#features" className="hover:text-stone-900">
              Features
            </a>
            <a href="#pricing" className="hover:text-stone-900">
              Pricing
            </a>
            <a href="#about" className="hover:text-stone-900">
              About
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-md border border-black/10 px-3 py-1.5 text-sm font-medium text-stone-800 hover:bg-white shadow-sm shadow-black/5"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="hidden rounded-md bg-stone-900 px-3.5 py-1.5 text-sm font-medium text-stone-50 shadow-sm shadow-black/10 hover:bg-stone-800 md:inline-block"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-black/5 bg-gradient-to-b from-stone-50 to-stone-100/80">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:items-center md:py-20">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 shadow-sm shadow-blue-500/10">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                AI-Powered Resume Analysis
              </div>
              <div className="space-y-4">
                <h1 className="text-balance text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
                  Get Past ATS. Land More Interviews.
                </h1>
                <p className="max-w-xl text-sm text-stone-600 sm:text-base">
                  ResumeIQ analyzes your resume against any job description, optimizes it
                  for Applicant Tracking Systems, and helps you tailor every application
                  with AI-powered insights.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/register"
                  className="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 shadow-sm shadow-black/10 hover:bg-stone-800"
                >
                  Analyze My Resume Free
                </Link>
                <a
                  href="#how-it-works"
                  className="rounded-md border border-black/10 px-4 py-2 text-sm font-medium text-stone-800 shadow-sm shadow-black/5 hover:bg-white"
                >
                  See How It Works
                </a>
              </div>
              <p className="text-xs text-stone-500">
                Trusted by <span className="font-semibold text-stone-800">10,000+</span>{" "}
                job seekers worldwide.
              </p>
            </div>

            {/* Hero visual: animated ATS score ring demo */}
            <div className="mt-6 flex flex-1 justify-center md:mt-0">
              <motion.div
                className="relative w-64 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.04)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.svg
                  viewBox="0 0 120 120"
                  className="mx-auto h-32 w-32"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#E5E5E5"
                    strokeWidth="10"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 46}
                    strokeDashoffset={2 * Math.PI * 46}
                    transform="rotate(-90 60 60)"
                    animate={{
                      strokeDashoffset:
                        2 * Math.PI * 46 * (1 - 0.73),
                    }}
                    transition={{ duration: 1.6, ease: "easeOut" }}
                  />
                  <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="fill-stone-900 text-[20px] font-semibold"
                  >
                    73
                  </text>
                </motion.svg>
                <p className="mt-3 text-center text-xs font-medium text-stone-800">
                  ATS Score: <span className="text-blue-600">73 / 100 – Good</span>
                </p>
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2 rounded-md bg-amber-50 px-2 py-1 text-amber-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Optimize your keyword density for this JD.
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-rose-50 px-2 py-1 text-rose-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    Remove table-based layouts – some ATS cannot read them.
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-green-50 px-2 py-1 text-green-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Great use of quantified achievements in experience.
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="border-b border-black/5 bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 text-sm text-stone-700 sm:grid-cols-3">
            <div className="rounded-xl border border-black/5 bg-stone-50 px-4 py-3 shadow-sm shadow-black/5">
              <p className="text-xs text-stone-500">Resumes rejected by ATS</p>
              <p className="mt-1 text-lg font-semibold text-stone-900">75%</p>
            </div>
            <div className="rounded-xl border border-black/5 bg-stone-50 px-4 py-3 shadow-sm shadow-black/5">
              <p className="text-xs text-stone-500">Avg time recruiters scan</p>
              <p className="mt-1 text-lg font-semibold text-stone-900">6 seconds</p>
            </div>
            <div className="rounded-xl border border-black/5 bg-stone-50 px-4 py-3 shadow-sm shadow-black/5">
              <p className="text-xs text-stone-500">Applicants per role</p>
              <p className="mt-1 text-lg font-semibold text-stone-900">250+</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-b border-black/5 bg-stone-50">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              Everything you need
            </p>
            <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-stone-900 md:text-3xl">
                Your complete AI career toolkit
              </h2>
              <p className="max-w-md text-sm text-stone-600">
                From ATS scoring to AI-written cover letters, ResumeIQ gives you a
                single place to optimize every application.
              </p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "ATS Scorer",
                  desc: "Run deep ATS checks to catch formatting and keyword issues before you apply.",
                },
                {
                  title: "Resume Builder",
                  desc: "Edit with a rich editor and preview ATS-safe PDF templates in real time.",
                },
                {
                  title: "JD Matcher",
                  desc: "Match your resume to any job description and see exactly what’s missing.",
                },
                {
                  title: "AI Insights",
                  desc: "Get tailored, actionable suggestions driven by state-of-the-art AI models.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.04)]"
                >
                  <div className="mb-3 h-8 w-8 rounded-lg bg-stone-900 text-xs font-semibold text-stone-50 flex items-center justify-center">
                    {card.title.split(" ")[0][0]}
                  </div>
                  <h3 className="text-sm font-semibold text-stone-900">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-xs text-stone-600">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="border-b border-black/5 bg-white"
        >
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900 md:text-3xl">
              How ResumeIQ works
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  step: 1,
                  title: "Upload Resume",
                  desc: "Import your PDF or DOCX in seconds. We’ll automatically parse it for ATS issues.",
                },
                {
                  step: 2,
                  title: "Get ATS Score & Suggestions",
                  desc: "See your ATS score, section-by-section breakdown, and prioritized fixes.",
                },
                {
                  step: 3,
                  title: "Apply with Confidence",
                  desc: "Export an ATS-optimized resume and use AI to tailor it to each job.",
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="relative rounded-2xl border border-black/5 bg-stone-50 p-4 shadow-sm shadow-black/5"
                >
                  {index < 2 && (
                    <div className="pointer-events-none absolute right-[-16px] top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-stone-300 to-stone-200 md:block" />
                  )}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-xs font-semibold text-stone-50">
                    {item.step}
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-stone-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b border-black/5 bg-stone-50">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-stone-900 md:text-3xl">
                  Simple, transparent pricing
                </h2>
                <p className="mt-2 text-sm text-stone-600">
                  Start free, then upgrade when you’re ready to apply at scale.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-2 py-1 text-xs shadow-sm shadow-black/5">
                <button
                  type="button"
                  onClick={() => setBilling("monthly")}
                  className={`rounded-full px-3 py-1 font-medium ${
                    billing === "monthly"
                      ? "bg-stone-900 text-stone-50"
                      : "text-stone-700"
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBilling("annual")}
                  className={`rounded-full px-3 py-1 font-medium ${
                    billing === "annual"
                      ? "bg-stone-900 text-stone-50"
                      : "text-stone-700"
                  }`}
                >
                  Annual{" "}
                  <span className="ml-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {PRICING_PLANS.map((plan) => {
                const price =
                  billing === "monthly" ? plan.priceMonthly : plan.priceYearly;
                const suffix = billing === "monthly" ? "/mo" : "/year";
                return (
                  <div
                    key={plan.id}
                    className={`flex h-full flex-col rounded-2xl border bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.04)] ${
                      plan.highlight
                        ? "border-stone-900"
                        : "border-black/5"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-stone-900">
                        {plan.name}
                      </h3>
                      {plan.highlight && (
                        <span className="rounded-full bg-stone-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-stone-50">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <p className="mt-2 flex items-baseline gap-1">
                      <span className="text-2xl font-semibold text-stone-900">
                        {price === 0 ? "$0" : `$${price.toFixed(0)}`}
                      </span>
                      <span className="text-xs text-stone-500">{suffix}</span>
                    </p>
                    <ul className="mt-4 space-y-2 text-xs text-stone-700">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span className="mt-0.5 h-3 w-3 rounded-full bg-green-500" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5">
                      <Link
                        href="/register"
                        className={`block rounded-md px-3 py-1.5 text-center text-sm font-medium shadow-sm shadow-black/5 ${
                          plan.highlight
                            ? "bg-stone-900 text-stone-50 hover:bg-stone-800"
                            : "bg-white text-stone-900 border border-black/10 hover:bg-stone-50"
                        }`}
                      >
                        {plan.id === "free" ? "Get Started Free" : "Upgrade"}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* About / footer */}
        <section id="about" className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="flex flex-col justify-between gap-6 border-t border-black/5 pt-6 md:flex-row md:items-center">
              <div className="space-y-2 text-sm text-stone-600">
                <p className="font-semibold text-stone-900">ResumeIQ</p>
                <p>
                  Built for modern job seekers who want to stand out in a world of
                  automated screening.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-stone-500">
                <span>Privacy</span>
                <span>Terms</span>
                <span>Security</span>
                <span>Support</span>
              </div>
            </div>
            <div className="mt-4 text-xs text-stone-400">
              © {new Date().getFullYear()} ResumeIQ. All rights reserved.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

