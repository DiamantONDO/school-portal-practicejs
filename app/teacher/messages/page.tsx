"use client";

import { useApiList } from "@/lib/useApiList";
import AsyncList from "@/components/AsyncList";
import MessageCard from "@/components/MessageCard";
import type { Message } from "@/types/message";

export default function Page() {
  const { data, loading, error, reload } = useApiList<Message>("/messages/");

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Messages</h1>
      <AsyncList
        loading={loading}
        error={error}
        isEmpty={data?.length === 0}
        emptyText="No messages yet."
        onRetry={reload}
      >
        <div className="space-y-3">
          {data?.map((m) => (
            <MessageCard key={m.id} message={m} />
          ))}
        </div>
      </AsyncList>
    </>
  );
}
