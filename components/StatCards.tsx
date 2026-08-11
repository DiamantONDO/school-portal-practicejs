"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { StatItem, StatsResponse } from "@/types/stats";

export default function StatCards() {
  const [stats, setStats] = useState<StatItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await api.get<StatsResponse>("/accounts/profile/stats/");
      setStats(data.stats);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <SkeletonGrid />;
  if (error) return <ErrorCard onRetry={load} />;
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-[#E4E7EC] bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-[#667085]">{s.label}</p>
          <p className="mt-3 text-4xl font-semibold tabular-nums text-[#1B2430]">{s.value}</p>
          <div className="mt-3 h-0.5 w-8 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
        </div>
      ))}
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-xl border border-[#E4E7EC] bg-white p-5">
          <div className="h-3 w-16 animate-pulse rounded bg-[#EDEFF2]" />
          <div className="mt-4 h-9 w-20 animate-pulse rounded bg-[#EDEFF2]" />
          <div className="mt-4 h-0.5 w-8 rounded-full bg-[#EDEFF2]" />
        </div>
      ))}
    </div>
  );
}

function ErrorCard({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-xl border border-[#E4E7EC] bg-white p-5">
      <p className="font-medium">Couldn&rsquo;t load your stats.</p>
      <p className="mt-1 text-sm text-[#667085]">Make sure the backend is running, then try again.</p>
      <button
        onClick={onRetry}
        className="mt-3 rounded-md px-3 py-1.5 text-sm font-medium text-white"
        style={{ backgroundColor: "var(--accent)" }}
      >
        Try again
      </button>
    </div>
  );
}