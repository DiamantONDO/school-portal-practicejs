"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";
import RoleSidebar from "@/components/RoleSidebar";
import { useAuth } from "@/context/AuthContext";
import { roleTheme } from "@/lib/roles";
import type { Role } from "@/types/auth";

const COLLAPSE_KEY = "sidebar_collapsed";

export default function RoleLayout({
  allow,
  children,
}: {
  allow: Role[];
  children: ReactNode;
}) {
  return (
    <RequireAuth allow={allow}>
      <Frame>{children}</Frame>
    </RequireAuth>
  );
}

function Frame({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  // Restore the last collapse choice (starts expanded to avoid a hydration
  // mismatch, then corrects on mount).
  useEffect(() => {
    setCollapsed(localStorage.getItem(COLLAPSE_KEY) === "true");
  }, []);

  function toggle() {
    setCollapsed((c) => {
      const next = !c;
      localStorage.setItem(COLLAPSE_KEY, String(next));
      return next;
    });
  }

  if (!user) return null;
  const theme = roleTheme[user.role];

  return (
    <div
      style={{ ["--accent" as string]: theme.accent } as CSSProperties}
      className="min-h-screen bg-[#F5F6F8] text-[#1B2430]"
    >
      <RoleSidebar collapsed={collapsed} onToggle={toggle} />
      <div
        className={`transition-[padding] duration-200 ${
          collapsed ? "md:pl-16" : "md:pl-64"
        }`}
      >
        <main className="mx-auto max-w-8xl px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
