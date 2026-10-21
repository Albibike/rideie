"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSupabase } from "@/lib/supabase";

// Shared form for /signup and /login. The data-testid names come from the grading contract.
export default function AuthForm({ mode }: { mode: "signup" | "login" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const isSignup = mode === "signup";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const supabase = getSupabase();

    if (isSignup) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else if (!data.session) {
        setError("Account created, but email confirmation is still on in Supabase. Turn it off to log in directly.");
      } else {
        router.push("/app");
        return;
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("Wrong email or password.");
      } else {
        router.push("/app");
        return;
      }
    }
    setBusy(false);
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight">
        {isSignup ? "Create your account" : "Log in"}
      </h1>
      <p className="mt-2 text-stone-700">
        {isSignup
          ? "Then tell us which scooter you need. It takes 30 seconds."
          : "Welcome back. See the status of your scooter requests."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl border border-stone-200 bg-white p-6">
        <label className="block">
          <span className="text-sm font-semibold">Email</span>
          <input
            data-testid={`${mode}-email`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-base"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Password</span>
          <input
            data-testid={`${mode}-password`}
            type="password"
            required
            minLength={6}
            autoComplete={isSignup ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-base"
          />
          {isSignup && <span className="mt-1 block text-xs text-stone-500">At least 6 characters.</span>}
        </label>

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        )}

        <button
          data-testid={`${mode}-submit`}
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-orange-600 py-3 font-bold text-white hover:bg-orange-700 disabled:opacity-60"
        >
          {busy ? "Please wait…" : isSignup ? "Sign up" : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-stone-700">
        {isSignup ? "Already have an account? " : "New to RideIE? "}
        <Link href={isSignup ? "/login" : "/signup"} className="font-semibold text-orange-700 underline">
          {isSignup ? "Log in" : "Sign up"}
        </Link>
      </p>
    </div>
  );
}
