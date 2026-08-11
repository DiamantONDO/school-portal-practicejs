"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useApiList } from "@/lib/useApiList";
import { formatDate } from "@/lib/format";
import { Icon } from "@/components/icons";
import type { TeacherClass } from "@/types/class";
import type { Assignment } from "@/types/assignment";

function timeGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function Page() {
  const { user } = useAuth();

  // 1. Move React Hooks safely INSIDE the functional component body
  const classesReq = useApiList<TeacherClass>("/classes/my-classes/");
  const assignmentsReq = useApiList<Assignment>("/assignments/");
  const quizzesReq = useApiList<any>("/quizzes/");

  // 2. Safely resolve arrays from paginated Django endpoints using your results fallback
  const rawClasses = classesReq.data as any;
  const classesList: TeacherClass[] = rawClasses?.results ?? (Array.isArray(classesReq.data) ? classesReq.data : []);

  const rawAssignments = assignmentsReq.data as any;
  const assignmentsList: Assignment[] = rawAssignments?.results ?? (Array.isArray(assignmentsReq.data) ? assignmentsReq.data : []);

  const rawQuizzes = quizzesReq.data as any;
  const quizzesList: any[] = rawQuizzes?.results ?? (Array.isArray(quizzesReq.data) ? quizzesReq.data : []);

  // 3. Compute structural loading/error states cleanly
  const loading = classesReq.loading || assignmentsReq.loading || quizzesReq.loading;
  const error = classesReq.error || assignmentsReq.error || quizzesReq.error;

  const assignmentCount = assignmentsList.length;
  const quizCount = quizzesList.length;

  // 4. Safely filter upcoming assignments using local component time parameters
  const now = Date.now();
  const upcoming = assignmentsList
    .filter((a) => a.due_date && new Date(a.due_date).getTime() >= now)
    .sort((a, b) => new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime())
    .slice(0, 5);

  if (!user) return null;

  const stats = [
    { label: "Classes", value: classesList.length },
    { label: "Assignments", value: assignmentCount },
    { label: "Quizzes", value: quizCount }
  ];

  const iconMap: Record<string, string> = {
    "classes": "book",
    "assignments": "assignments",
    "quizzes": "quizzes"
  };

  return (
    <>
      <div>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Welcome back, {user?.first_name}</h1>
            <p className="text-sm text-[#667085] mt-1">
              {new Date().toLocaleDateString("en-GB", { 
                weekday: "long", 
                day: "numeric", 
                month: "long", 
                year: "numeric" 
              })} · <span className="capitalize">{user?.role.toLowerCase()}</span>
            </p>
            <p className="mt-1 text-sm text-[#667085]">{timeGreeting()}! Here is a summary of your workspace.</p>
          </div>
          {classesList.length > 0 && (
            <span className="text-sm text-[#667085]">Total classes: {classesList.length}</span>
          )}
        </div>
      </div>

      {/* Metrics Row Section */}
      {loading ? (
        <div className="rounded-xl border border-[#E4E7EC] bg-white p-8 flex flex-col items-center justify-center min-h-[140px]">
          <div className="flex space-x-2">
            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
          </div>
          <p className="mt-3 text-xs text-[#667085] font-medium tracking-wide">Loading your metrics...</p>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <p className="font-semibold">Error occurred while fetching data.</p>
          <p className="text-sm mt-1">Check backend is running. Especially db container.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => {
            const iconName = iconMap[s.label.toLowerCase()] || "book";
            return (
              <div key={s.label} className="rounded-xl border border-[#E4E7EC] bg-white p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-[#667085]">
                      {s.label}
                    </p>
                    <p className="mt-3 text-4xl font-semibold tabular-nums text-[#1B2430]">
                      {s.value}
                    </p>
                  </div>
                  <Icon name={iconName} className="h-5 w-5 text-[#667085]" style={{ color: "var(--accent)" }} />
                </div>
                <div
                  className="mt-3 h-0.5 w-8 rounded-full"
                  style={{ backgroundColor: "var(--accent)" }}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Two Columns Layout Container */}
      {!loading && !error && (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          
          {/* Column 1: Upcoming Assignments Card Wrapper */}
          <div className="rounded-xl border border-[#E4E7EC] bg-white p-6 shadow-1xl">
            <div className="mb-4 flex items-center justify-between border-b border-[#F2F4F7] pb-3">
              <h2 className="font-semibold text-lg text-[#1B2430] flex items-center gap-2">
                <Icon name="assignments" className="h-5 w-5 text-blue-500" />
                Upcoming Assignments
              </h2>
              <span className="rounded-full bg-blue-50 text-blue-700 text-xs px-2.5 py-1 font-medium">
                Active
              </span>
            </div>
            
            <div className="space-y-3">
              {upcoming.length === 0 ? (
                <p className="text-sm text-[#667085]">Nothing due soon.</p>
              ) : (
                upcoming.map((a) => (
                  <Link
                    key={a.id}
                    href={`/teacher/assignments/${a.id}`}
                    className="flex items-start justify-between rounded-lg p-3 bg-gray-50 border border-gray-100 transition hover:border-[var(--accent)]"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#1B2430]">{a.title}</p>
                      <p className="text-xs text-[#667085] mt-0.5">
                        Due: {formatDate(a.due_date)}
                      </p>
                    </div>
                    <span className="ml-3 shrink-0 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      Pending
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Column 2: Recent Activity Notification Simulation Block */}
          <div className="rounded-xl border border-[#E4E7EC] bg-white p-6 shadow-1xl h-40">
            <div className="mb-4 flex items-center justify-between border-b border-[#F2F4F7] pb-3">
              <h2 className="font-semibold text-lg text-[#1B2430] flex items-center gap-2">
                <Icon name="quizzes" className="h-5 w-5 text-purple-500" />
                Recent System Activity
              </h2>
              <Link href="/teacher/notifications" className="text-xs font-medium text-blue-600 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {[1].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                  <div className="mt-0.5 rounded-full p-1 bg-purple-50 text-purple-600">
                    <div className="h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm text-[#1B2430] font-medium">
                      {item === 1 ? "No notifications for the moment." : "System update completed."}
                    </p>
                    <p className="text-xs text-[#667085] mt-0.5">{item * 2} hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </>
  );
}
