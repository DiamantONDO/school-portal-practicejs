import type { Assignment } from "@/types/assignment";
import { formatDate } from "@/lib/format";

export default function AssignmentCard({ assignment }: { assignment: Assignment }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#E4E7EC] bg-white p-4">
      <div className="min-w-0">
        <p className="truncate font-medium">{assignment.title}</p>
        <p className="mt-0.5 text-sm text-[#667085]">
          {assignment.class_name} &middot; Due Date:  {formatDate(assignment.due_date)}
        </p>
      </div>
      <span
        className="ml-3 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium"
        style={
          assignment.is_published
            ? {
                backgroundColor: "color-mix(in srgb, var(--accent) 12%, white)",
                color: "var(--accent)",
              }
            : { backgroundColor: "#F2F4F7", color: "#667085" }
        }
      >
        {assignment.is_published ? "Published" : "Draft"}
      </span>
    </div>
  );
}
