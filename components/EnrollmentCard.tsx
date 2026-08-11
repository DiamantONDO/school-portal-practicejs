import type { Enrollment } from "@/types/enrollment";
import { formatDate } from "@/lib/format";

export default function EnrollmentCard({ enrollment }: { enrollment: Enrollment }) {
  const s = enrollment.student;
  const name = s
    ? `${s.first_name} ${s.last_name}`.trim() || s.email
    : "Unknown student";

  return (
    <div className="flex items-center justify-between rounded-xl border border-[#E4E7EC] bg-white p-4">
      <div className="min-w-0">
        <p className="truncate font-medium">{name}</p>
        <p className="mt-0.5 truncate text-sm text-[#667085]">
          {enrollment.class_obj?.name ?? "—"}
          {s?.email ? ` · ${s.email}` : ""}
        </p>
      </div>
      <span className="ml-3 shrink-0 text-xs text-[#98A2B3]">
        Joined {formatDate(enrollment.joined_at)}
      </span>
    </div>
  );
}