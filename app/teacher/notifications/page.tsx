"use client";

import { useApiList } from "@/lib/useApiList";
import AsyncList from "@/components/AsyncList";
import NotificationCard from "@/components/NotificationCard";
import { api } from "@/lib/api";
import type { AppNotification } from "@/types/notification";

export default function Page() {
  // 1. Pass the base item type here so the hook natively prepares for an array structure
  const { data, loading, error, reload } =
    useApiList<AppNotification>("/notifications/");

  // 2. Cast data to 'any' briefly to bypass the hook's rigid array typing constraint
  const rawPayload = data as any;

  // 3. Extract your arrays and counters securely from the network envelope
  const notificationArray: AppNotification[] = rawPayload?.results ?? [];
  const hasUnread = (rawPayload?.unread_count ?? 0) > 0;

  async function markAllRead() {
    try {
      await api.post("/notifications/mark-all-read/");
      reload();
    } catch {
      // no-op; the list simply won't change
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
