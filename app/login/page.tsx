"use client";

import { useState, type FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, roleHome } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";

export default function LoginPage() {
  const { login, loading, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user)
      router.replace(roleHome[user.role]);//redirect if already logged in
  }, [loading, user, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const user = await login(email, password);
      router.replace(roleHome[user.role]); // send to the right dashboard
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("Something went wrong. Is the backend running?");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 w-full max-w-sm space-y-4 rounded-xl border p-6 border-blue-500"
      >
        <h1 className="text-xl font-semibold text-gray-800">
          School Portal
        </h1>
        <p className="text-gray-400">Sign in to your SchoolPortal account</p>

        {error && (
          <p className="rounded bg-red-50 p-2 text-sm text-red-700">{error}</p>
        )}

        <div className="space-y-1 text-gray-800">
          <label className="text-sm" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="eg:you@school.dev"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-4xl border px-3 py-2"
          />
        </div>

        <div className="space-y-1 text-gray-800">
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="********"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-4xl border px-3 py-2"
          />
        </div>

        {}
        <button
          type="submit"
          //disabled={submitting}
          className="w-full rounded-4xl bg-blue-600 py-2 text-white transition-colors duration-200 hover:bg-blue-500 hover:text-black-500 disabled:opacity-50"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
        <p className="text-sm text-gray-500">
          Don't have an account? -
          <a href="/register" className="text-blue-600 hover:underline"> Register</a></p>
      </form>
    </main>
  );
}
