"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth, roleHome } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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
  <main className="flex min-h-screen items-center justify-center p-4 bg-white">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4 rounded-4xl border p-8 bg-gray-100 border-gray-300"
    >
      <h1 className="rounded-4xl text-xl font-semibold text-black">
        School Portal
      </h1>
      <p className="text-gray-600">
        Sign in to your SchoolPortal account
      </p>

      {error && (
        <p className="rounded bg-red-50 p-2 text-sm text-red-700">{error}</p>
      )}

      {/* Note: Ensure htmlFor matches the input id for accessibility */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-black" htmlFor="
         rounded-4xl">
          Username
        </label>
        <input
          id="username"
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-4xl px-3 py-2 bg-white text-black border-gray-300 focus:outline-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-black" htmlFor="phone">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-4xl border px-3 py-2 bg-white text-black border-gray-300 focus:outline-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-black" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-4xl border px-3 py-2 bg-white text-black border-gray-300 focus:outline-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-black" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-4xl border px-3 py-2 bg-white text-black border-gray-300 focus:outline-blue-500"
        />
      </div>

      <button
        type="submit"
        //disabled={submitting}
        className="w-full rounded-4xl bg-blue-600 py-2 text-white transition-colors duration-200 hover:bg-blue-500 hover:text-black disabled:opacity-50"
      >
        {submitting ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-sm text-black">
        Already have an account? 
        <a href="/login" className="text-blue-600 hover:underline font-medium"> Sign in</a>
      </p>
    </form>
  </main>
);

}
