"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useApiList } from "@/lib/useApiList";
import ClassCard from "@/components/ClassCard";
import type { TeacherClass } from "@/types/class";

function timeGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function Page() {
  const { user } = useAuth();
  // Real, student-scoped data — same endpoints as the list pages.
  const classes = useApiList<TeacherClass>("/classes/my-classes/");
  const assignments = useApiList<unknown>("/assignments/");
  const quizzes = useApiList<unknown>("/quizzes/");
  if (!user) return null;

  const statsLoading =
    classes.loading || assignments.loading || quizzes.loading;

  const stats = [
    { label: "Classes", value: classes.data?.length ?? 0 },
    { label: "Assignments", value: assignments.data?.length ?? 0 },
    { label: "Quizzes", value: quizzes.data?.length ?? 0 },
  ];

  const recent = (classes.data ?? []).slice(0, 3);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          {timeGreeting()}, {user.first_name}.
        </h1>
        <p className="mt-1 text-[#667085]"></p>
      </div>

      {statsLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-[#E4E7EC] bg-white p-5">
              <div className="h-3 w-16 animate-pulse rounded bg-[#EDEFF2]" />
              <div className="mt-4 h-9 w-16 animate-pulse rounded bg-[#EDEFF2]" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-[#E4E7EC] bg-white p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-[#667085]">
                {s.label}
              </p>
              <p className="mt-3 text-4xl font-semibold tabular-nums text-[#1B2430]">
                {s.value}
              </p>
              <div
                className="mt-3 h-0.5 w-8 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
            </div>
          ))}
        </div>
      )}

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wider text-[#667085]">
            Recent classes
          </h2>
          <Link
            href="/student/my-classes"
            className="text-sm font-medium"
            style={{ color: "var(--accent)" }}
          >
            View all &rarr;
          </Link>
        </div>

        {classes.loading ? (
          <p className="text-sm text-[#98A2B3]">Loading&hellip;</p>
        ) : recent.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#D0D5DD] bg-white p-8 text-center">
            <p className="text-[#667085]">You&rsquo;re not enrolled in any classes yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {recent.map((c) => (
              <ClassCard key={c.id} cls={c} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
