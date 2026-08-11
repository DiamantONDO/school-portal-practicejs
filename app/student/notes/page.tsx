"use client";

import { useApiList } from "@/lib/useApiList";
import AsyncList from "@/components/AsyncList";
import NoteCard from "@/components/NoteCard";
import type { Note } from "@/types/note";

export default function Page() {
  // 1. Maintain base type declarations inside the hook
  const { data, loading, error, reload } = useApiList<Note>("/notes/");

  // 2. Cast data wrapper as any to unblock TypeScript properties
  const rawPayload = data as any;

  // 3. Extract the array from the backend results parameter
  const notesArray: Note[] = rawPayload?.results ?? [];

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-black">Notes</h1>

      {/* 4. Bind the validation rules directly to your isolated notesArray variable */}
      <AsyncList
        loading={loading}
        error={error}
        isEmpty={notesArray.length === 0}
        emptyText="No notes shared yet."
        onRetry={reload}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* 5. Safely cycle the data fields without runtime failures */}
          {notesArray.map((n) => (
            <NoteCard key={n.id} note={n} />
          ))}
        </div>
      </AsyncList>
    </>
  );
}
