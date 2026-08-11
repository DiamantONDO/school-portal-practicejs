import type { Quiz } from "@/types/quiz";

export default function QuizCard({ quiz }: { quiz: Quiz }) {
  const questionCount = quiz.questions?.length ?? 0;

  return (
    <div className="flex flex-col rounded-xl border border-[#E4E7EC] bg-white p-5 transition hover:border-[var(--accent)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold leading-tight">{quiz.title}</h3>
        <span
          className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={
            quiz.is_published
              ? {
                  backgroundColor: "color-mix(in srgb, var(--accent) 12%, white)",
                  color: "var(--accent)",
                }
              : { backgroundColor: "#F2F4F7", color: "#667085" }
          }
        >
          {quiz.is_published ? "Published" : "Draft"}
        </span>
      </div>

      {quiz.class_obj?.name && (
        <p className="mt-1 text-sm text-[#667085]">{quiz.class_obj.name}</p>
      )}

      <div className="mt-4 flex items-center gap-4 text-xs text-[#98A2B3]">
        <span>
          {questionCount} question{questionCount === 1 ? "" : "s"}
        </span>
        {quiz.time_limit_minutes ? (
          <span>{quiz.time_limit_minutes} min</span>
        ) : (
          <span>No time limit</span>
        )}
      </div>
    </div>
  );
}
