"use client";

import { useAuth } from "@/context/AuthContext";
import { roleTheme } from "@/lib/roles";
import StatCards from "@/components/StatCards";

function timeGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function Overview() {
  const { user } = useAuth();
  if (!user) return null;
  const theme = roleTheme[user.role];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight font-serif">
          {timeGreeting()}, {user.first_name}, {user.last_name}.
        </h1>
        <p className="mt-1 text-[#667085] font-serif">
          Here&rsquo;s what&rsquo;s happening in your {theme.greetingNoun}.
        </p>
      </div>
      <StatCards />
    </>
  );
}