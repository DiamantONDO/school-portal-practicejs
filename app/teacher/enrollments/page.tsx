"use client";

import { useApiList } from "@/lib/useApiList";
import AsyncList from "@/components/AsyncList";
import EnrollmentCard from "@/components/EnrollmentCard";
import type { Enrollment } from "@/types/enrollment";

export default function Page() {
  const { data, loading, error, reload } =
    useApiList<Enrollment>("/enrollments/");

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Enrollments</h1>
        <p className="mt-1 text-[#667085]">Students enrolled in your classes.</p>
      </div>
      <AsyncList
        loading={loading}
        error={error}
        isEmpty={data?.length === 0}
        emptyText="No enrollments yet."
        onRetry={reload}
      >
        <div className="space-y-3">
          {data?.map((e) => (
            <EnrollmentCard key={e.id} enrollment={e} />
          ))}
        </div>
      </AsyncList>
    </>
  );
}
