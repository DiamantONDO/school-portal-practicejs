"use client";

import { useApiList } from "@/lib/useApiList";
import AsyncList from "@/components/AsyncList";
import ClassCard from "@/components/ClassCard";
import type { TeacherClass } from "@/types/class";

export default function Page() {
  const { data, loading, error, reload } =
    useApiList<TeacherClass>("/classes/my-classes/");

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">My classes</h1>
        <p className="mt-1 text-[#667085]">Classes you&rsquo;re enrolled in.</p>
      </div>

      <AsyncList
        loading={loading}
        error={error}
        isEmpty={data?.length === 0}
        emptyText="You're not enrolled in any classes yet."
        onRetry={reload}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((c) => (
            <ClassCard key={c.id} cls={c} />
          ))}
        </div>
      </AsyncList>
    </>
  );
}
