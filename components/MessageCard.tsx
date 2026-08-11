import type { Message } from "@/types/message";
import { formatDateTime } from "@/lib/format";

export default function MessageCard({ message }: { message: Message }) {
  return (
    <div className="rounded-xl border border-[#E4E7EC] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-[#1B2430]">{message.content}</p>
        {!message.is_read && (
          <span
            className="mt-1 h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
          />
        )}
      </div>
      <p className="mt-2 text-xs text-[#b39b98]">
        {formatDateTime(message.created_at)}
      </p>
    </div>
  );
}
