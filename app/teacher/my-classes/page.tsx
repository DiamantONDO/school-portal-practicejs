"use client";

import type { ReactNode } from "react";
import ClassCard from "@/components/ClassCard";
import { useMyClasses } from "@/lib/useMyClasses";

export default function Page() {
  const { data, loading, error, reload } = useMyClasses();
  return (
    <>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My classes</h1>
          <p className="mt-1 text-[#667085]">Classes you&rsquo;ve created.</p>
        </div>
        {data && data.length > 0 && (
          <span className="text-sm text-[#667085]">Total calsses: {data.length}</span>
        )}
      </div>

      {loading && (
        <Grid>
          {[0, 1, 2].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </Grid>
      )}

      {error && !loading && (
        <div className="rounded-xl border border-[#E4E7EC] bg-white p-6">
          <p className="font-medium">Couldn&rsquo;t load your classes.</p>
          <p className="mt-1 text-sm text-[#667085]">
            Make sure the backend is running, then try again.
          </p>
          <button
            onClick={reload}
            className="mt-3 rounded-md px-3 py-1.5 text-sm font-medium text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Try again
          </button>
        </div>
      )}

      {data && !loading && data.length === 0 && (
        <div className="rounded-xl border border-dashed border-[#D0D5DD] bg-white p-10 text-center">
          <p className="text-[#667085]">You haven&rsquo;t created any classes yet.</p>
        </div>
      )}

      {data && data.length > 0 && (
        <Grid>
          {data.map((c) => (
            <ClassCard key={c.id} cls={c} />
          ))}
        </Grid>
      )}
    </>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-[#E4E7EC] bg-white p-5">
      <div className="h-4 w-2/3 animate-pulse rounded bg-[#EDEFF2]" />
      <div className="mt-3 h-3 w-1/3 animate-pulse rounded bg-[#EDEFF2]" />
      <div className="mt-6 h-3 w-1/4 animate-pulse rounded bg-[#EDEFF2]" />
    </div>
  );
}
