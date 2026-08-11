"use client";

import { useApiList } from "@/lib/useApiList";
import AsyncList from "@/components/AsyncList";
import AssignmentCard from "@/components/AssignmentCard";
import type { Assignment } from "@/types/assignment";

export default function Page() {
  const { data, loading, error, reload } =
    useApiList<Assignment>("/assignments/");

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Assignments</h1>
      <AsyncList
        loading={loading}
        error={error}
        isEmpty={data?.length === 0}
        emptyText="No assignments yet."
        onRetry={reload}
      >
        <div className="space-y-3">
          {data?.map((a) => (
            <AssignmentCard key={a.id} assignment={a} />
          ))}
        </div>
      </AsyncList>
    </>
  );
}
