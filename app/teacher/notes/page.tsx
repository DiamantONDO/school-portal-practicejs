"use client";

import { useApiList } from "@/lib/useApiList";
import AsyncList from "@/components/AsyncList";
import NoteCard from "@/components/NoteCard";
import type { Note } from "@/types/note";

export default function Page() {
  // 1. Keep the base item type so the hook is configured for items
  const { data, loading, error, reload } = useApiList<Note>("/notes/");

  // 2. Cast data to 'any' to safely bypass the hook's rigid array constraints
  const rawPayload = data as any;

  // 3. Extract the actual array from the Django pagination 'results' wrapper
  const notesArray: Note[] = rawPayload?.results ?? [];

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-black">Notes</h1>
      
      {/* 4. Update isEmpty to evaluate the extracted array length */}
      <AsyncList
        loading={loading}
        error={error}
        isEmpty={notesArray.length === 0}
        emptyText="No notes yet."
        onRetry={reload}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* 5. Loop over the safe array structure */}
          {notesArray.map((n) => (
            <NoteCard key={n.id} note={n} />
          ))}
        </div>
      </AsyncList>
    </>
  );
}
