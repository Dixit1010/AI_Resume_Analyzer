"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Enter a valid email."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Add at least one uppercase letter.")
      .regex(/[0-9]/, "Add at least one number.")
      .regex(/[^A-Za-z0-9]/, "Add at least one symbol."),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validation = useMemo(() => registerSchema.safeParse(form), [form]);
  const fieldErrors = !validation.success ? validation.error.flatten().fieldErrors : {};

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const parsed = registerSchema.safeParse(form);
    if (!parsed.success) return;

    setSubmitting(true);
    try {
      // UI-first: mock registration. Backend auth will be wired later.
      await new Promise((r) => setTimeout(r, 700));
      router.push("/dashboard");
    } catch {
      setError("Unable to create account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight text-stone-900">
          Create your account
        </h1>
        <p className="text-sm text-stone-600">
          Start with the Free plan and upgrade when you’re ready.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-stone-700" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Your name"
            className="w-full rounded-[10px] border border-black/10 bg-white px-3 py-2 text-sm outline-none shadow-sm shadow-black/5 focus:border-blue-300"
            autoComplete="name"
          />
          {fieldErrors.name?.[0] && (
            <p className="text-xs text-rose-600">{fieldErrors.name[0]}</p>
          )}
        </div>

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
            placeholder="Create a strong password"
            className="w-full rounded-[10px] border border-black/10 bg-white px-3 py-2 text-sm outline-none shadow-sm shadow-black/5 focus:border-blue-300"
            autoComplete="new-password"
          />
          {fieldErrors.password?.[0] && (
            <p className="text-xs text-rose-600">{fieldErrors.password[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            className="text-xs font-medium text-stone-700"
            htmlFor="confirmPassword"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm((f) => ({ ...f, confirmPassword: e.target.value }))
            }
            placeholder="Repeat password"
            className="w-full rounded-[10px] border border-black/10 bg-white px-3 py-2 text-sm outline-none shadow-sm shadow-black/5 focus:border-blue-300"
            autoComplete="new-password"
          />
          {fieldErrors.confirmPassword?.[0] && (
            <p className="text-xs text-rose-600">{fieldErrors.confirmPassword[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting || !validation.success}
          className="w-full rounded-[10px] bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 shadow-sm shadow-black/10 hover:bg-stone-800 disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create account"}
        </button>

        <div className="text-center text-xs text-stone-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-blue-700 hover:underline">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}

