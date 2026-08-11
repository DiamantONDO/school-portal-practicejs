"use client";

import { useApiList } from "@/lib/useApiList";
import AsyncList from "@/components/AsyncList";
import QuizCard from "@/components/QuizCard";
import type { Quiz } from "@/types/quiz";

export default function Page() {
  const { data, loading, error, reload } = useApiList<Quiz>("/quizzes/");

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Quizzes</h1>
      <AsyncList
        loading={loading}
        error={error}
        isEmpty={data?.length === 0}
        emptyText="No quizzes yet."
        onRetry={reload}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((q) => (
            <QuizCard key={q.id} quiz={q} />
          ))}
        </div>
      </AsyncList>
    </>
  );
}
