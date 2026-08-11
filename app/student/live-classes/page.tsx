"use client";

import { useApiList } from "@/lib/useApiList";
import AsyncList from "@/components/AsyncList";
import LiveClassCard from "@/components/LiveClassCard";
import type { LiveClass } from "@/types/live-class";

export default function Page() {
  const { data, loading, error, reload } =
    useApiList<LiveClass>("/live-classes/");

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Live classes</h1>

      <AsyncList
        loading={loading}
        error={error}
        isEmpty={data?.length === 0}
        emptyText="No live classes scheduled."
        onRetry={reload}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((lc) => (
            <LiveClassCard key={lc.id} liveClass={lc} />
          ))}
        </div>
      </AsyncList>
    </>
  );
}
