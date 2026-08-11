import type { AppNotification } from "@/types/notification";
import { formatDateTime } from "@/lib/format";

export default function NotificationCard({
  notification,
}: {
  notification: AppNotification;
}) {
  const unread = !(notification.is_read ?? notification.read);

  return (
    <div className="flex gap-3 rounded-xl border border-[#E4E7EC] bg-white p-4">
      <span
        className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: unread ? "var(--accent)" : "#D0D5DD" }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="font-medium">{notification.title}</p>
          <span className="shrink-0 text-xs text-[#98A2B3]">
            {formatDateTime(notification.created_at)}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-[#667085]">{notification.message}</p>
      </div>
    </div>
  );
}