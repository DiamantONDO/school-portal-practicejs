import type { LiveClass } from "@/types/live-class";
import { formatDateTime } from "@/lib/format";

// Map backend status to a small colored badge.
function statusStyle(status: string): { bg: string; color: string; label: string } {
  const s = (status || "").toUpperCase();
  if (s === "LIVE")
    return { bg: "#DCFCE7", color: "#15803D", label: "Live now" };
  if (s === "ENDED")
    return { bg: "#F2F4F7", color: "#667085", label: "Ended" };
  return { bg: "#EEF2FF", color: "#4F46E5", label: "Scheduled" };
}

export default function LiveClassCard({ liveClass }: { liveClass: LiveClass }) {
  const s = statusStyle(liveClass.status);

  return (
    <div className="flex flex-col rounded-xl border border-[#E4E7EC] bg-white p-5 transition hover:border-[var(--accent)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold leading-tight">{liveClass.title}</h3>
        <span
          className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{ backgroundColor: s.bg, color: s.color }}
        >
          {s.label}
        </span>
      </div>

      <p className="mt-1 text-sm text-[#667085]">{liveClass.class_name}</p>

      {liveClass.description && (
        <p className="mt-2 line-clamp-2 text-sm text-[#475467]">
          {liveClass.description}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between text-xs text-[#98A2B3]">
        <span>Starts {formatDateTime(liveClass.scheduled_start)}</span>
        <span>{liveClass.teacher_name}</span>
      </div>
    </div>
  );
}
