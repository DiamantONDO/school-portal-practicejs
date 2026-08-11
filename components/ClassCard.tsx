import type { TeacherClass } from "@/types/class";
import { enrollmentLabel } from "@/types/class";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default function ClassCard({ cls }: { cls: TeacherClass }) {
  return (
    <div className="flex flex-col rounded-xl border border-[#E4E7EC] bg-white p-5 transition hover:border-[var(--accent)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold leading-tight">{cls.name}</h3>
        <span className="shrink-0 rounded-full border border-[#E4E7EC] px-2 py-0.5 text-xs text-[#667085]">
          {enrollmentLabel[cls.enrollment_type] ?? cls.enrollment_type}
        </span>
      </div>

      <p className="mt-1 font-mono text-sm text-[#667085]">{cls.code}</p>

      {cls.school?.name && (
        <p className="mt-2 text-sm text-[#475467]">{cls.school.name}</p>
      )}

      <p className="mt-4 text-xs text-[#98A2B3]">Created {formatDate(cls.created_at)}</p>
    </div>
  );
}
