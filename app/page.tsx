"use client";

import Link from "next/link";
import { useAuth, roleHome } from "@/context/AuthContext";

export default function NotFound() {
  const { user } = useAuth();
  const home = user ? roleHome[user.role] : "/login";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-[#667085]">That page doesn&rsquo;t exist.</p>
      <Link href={home} className="rounded-md bg-black px-4 py-2 text-sm text-white">
        {user ? "Back to your dashboard" : "Go to login"}
      </Link>
    </main>
  );
}