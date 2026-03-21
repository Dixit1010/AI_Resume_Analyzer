"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validation = useMemo(() => loginSchema.safeParse(form), [form]);
  const fieldErrors = !validation.success ? validation.error.flatten().fieldErrors : {};

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const parsed = loginSchema.safeParse(form);
    if (!parsed.success) return;

    setSubmitting(true);
    try {
      // UI-first: mock sign-in. Backend auth will be wired later with NextAuth.
      await new Promise((r) => setTimeout(r, 700));
      router.push("/dashboard");
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight text-stone-900">
          Log in
        </h1>
        <p className="text-sm text-stone-600">
          Continue to your dashboard and improve your resume health.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-stone-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
            className="w-full rounded-[10px] border border-black/10 bg-white px-3 py-2 text-sm outline-none shadow-sm shadow-black/5 focus:border-blue-300"
            autoComplete="email"
          />
          {fieldErrors.email?.[0] && (
            <p className="text-xs text-rose-600">{fieldErrors.email[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            className="text-xs font-medium text-stone-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            placeholder="••••••••"
            className="w-full rounded-[10px] border border-black/10 bg-white px-3 py-2 text-sm outline-none shadow-sm shadow-black/5 focus:border-blue-300"
            autoComplete="current-password"
          />
          {fieldErrors.password?.[0] && (
            <p className="text-xs text-rose-600">{fieldErrors.password[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting || !validation.success}
          className="w-full rounded-[10px] bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 shadow-sm shadow-black/10 hover:bg-stone-800 disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>

        <div className="text-center text-xs text-stone-500">
          Don’t have an account?{" "}
          <Link href="/register" className="font-medium text-blue-700 hover:underline">
            Create one
          </Link>
        </div>
      </form>

      <div className="pt-2">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
          Or continue with
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="rounded-[10px] border border-black/10 bg-white px-3 py-2 text-sm font-medium text-stone-800 shadow-sm shadow-black/5 hover:bg-stone-50"
            onClick={() => router.push("/dashboard")}
          >
            Google (mock)
          </button>
          <button
            type="button"
            className="rounded-[10px] border border-black/10 bg-white px-3 py-2 text-sm font-medium text-stone-800 shadow-sm shadow-black/5 hover:bg-stone-50"
            onClick={() => router.push("/dashboard")}
          >
            LinkedIn (mock)
          </button>
        </div>
      </div>
    </div>
  );
}

