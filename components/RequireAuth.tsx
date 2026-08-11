"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth, roleHome } from "@/context/AuthContext";
import type { Role } from "@/types/auth";

// Wrap any protected page with this. Pass `allow` to restrict by role.
export default function RequireAuth({
  allow,
  children,
}: {
  allow?: Role[];
  children: ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;//wait until session is restored
    if (!user) {
      router.replace("/login");//logged out, send to login
    } else if (allow && !allow.includes(user.role)) {
      // Logged in, but this page isn't for their role -> their own home.
      router.replace(roleHome[user.role]);
    }
  }, [user, loading, allow, router]);

  if (loading || !user) return <p className="p-8">Loading…</p>;
  if (allow && !allow.includes(user.role)) return null; // redirecting
  return <>{children}</>;
}
