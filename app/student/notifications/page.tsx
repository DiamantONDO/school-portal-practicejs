"use client";

import { useApiList } from "@/lib/useApiList";
import AsyncList from "@/components/AsyncList";
import NotificationCard from "@/components/NotificationCard";
import { api } from "@/lib/api";
import type { AppNotification } from "@/types/notification";

export default function Page() {
  // 1. Keep the base item type so the hook targets notification entities
  const { data, loading, error, reload } =
    useApiList<AppNotification>("/notifications/");

  // 2. Cast data to 'any' to safely bypass the hook's array restrictions
  const rawPayload = data as any;

  // 3. Extract the array and use the backend's unread_count variable directly
  const notificationArray: AppNotification[] = rawPayload?.results ?? [];
  const hasUnread = (rawPayload?.unread_count ?? 0) > 0;

  async function markAllRead() {
    try {
      await api.post("/notifications/mark-all-read/");
      reload();
    } catch {
      // no-op
    }
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-black">Notifications</h1>
        {hasUnread && (
          <button
            onClick={markAllRead}
            className="rounded-md border border-[#E4E7EC] bg-white px-3 py-1.5 text-sm transition hover:bg-[#F5F6F8] text-black"
          >
            Mark all read
          </button>
        )}
      </div>
      
      {/* 4. Pass the extracted notificationArray to the AsyncList template */}
      <AsyncList
        loading={loading}
        error={error}
        isEmpty={notificationArray.length === 0}
        emptyText="No notifications yet."
        onRetry={reload}
      >
        <div className="space-y-3">
          {notificationArray.map((n) => (
            <NotificationCard key={n.id} notification={n} />
          ))}
        </div>
      </AsyncList>
    </>
  );
}
