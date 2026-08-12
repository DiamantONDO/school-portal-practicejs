"use client";

import { useState, type FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, roleHome } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";
import { Icon } from "@/components/icons";

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
      router.replace(roleHome[user.role]);//send to the right dashboard
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
    <> {/*parent fragment tag here to enclose both elements safely*/}
      {/*Swapped all 'class' parameters with 'className' and camelCased SVG vectors*/}
      <header className="fixed top-0 left-0 w-full px-6 py-4 flex items-center justify-between bg-transaprent backdrop-blur-md border-b border-gray-100 z-50">
        <a className="flex items-center gap-2" href="/">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#1E3A5F]">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </span>
          <span className="font-semibold text-[#1E3A5F] text-sm">SchoolPortal</span>
        </a>
        <a className="text-xs text-[#6B7280] hover:text-[#111827] transition-colors duration-150" href="/">
          ← Back to home
        </a>
      </header>
    <main className="flex min-h-screen items-center justify-center p-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md space-y-4 rounded-xl border p-12 border-gray-200 shadow-5xl h-5/5"
      >
        <h1 className="text-xl font-semibold text-gray-800 mb-1">
          Welcome back
        </h1>
        <p className="text-gray-500 mb-8 text-sm">Sign in to your SchoolPortal account</p>

        {error && (
          <p className="rounded bg-red-50 p-2 text-sm text-red-700">{error}</p>
        )}

        <div className="space-y-1 text-gray-800">
          <label className="text-sm" htmlFor="email mb-2">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="eg:you@school.dev"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg px-3 py-2 bg-white border border-gray-200 outline-indigo-600 focus:outline-4"
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
            className="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white outline-indigo-600 focus:outline-4"
          />
        </div>
        <div>
            <a 
            href="/forgot-password" 
            className="text-indigo-600 text-xs font-medium flex justify-end mb-6">{/**later */}
            Forgot password?
            </a>
        </div>

        {}
        <button
          type="submit"
          //disabled={submitting}
          className="w-full rounded-2xl bg-indigo-600 py-2 text-white transition-colors duration-200 hover:bg-blue-500 hover:bg-indigo-700 disabled:opacity-50"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>
        <p className="text-sm text-gray-500 text-center mt-6">
          Don't have an account? 
          <a href="/register" className="text-indigo-600 font-semibold"> Create one free</a>
        </p>
      </form>
    </main>
    </>
  );
}
