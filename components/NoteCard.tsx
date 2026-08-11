import type { Note } from "@/types/note";
import { formatDate } from "@/lib/format";

export default function NoteCard({ note }: { note: Note }) {
  return (
    <div className="flex flex-col rounded-xl border border-[#E4E7EC] bg-white p-5 transition hover:border-[var(--accent)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold leading-tight">{note.title}</h3>
        {note.note_type && (
          <span className="shrink-0 rounded-full border border-[#E4E7EC] px-2 py-0.5 text-xs text-[#667085]">
            {note.note_type}
          </span>
        )}
      </div>

      <p className="mt-1 text-sm text-[#667085]">{note.class_name}</p>

      {note.tags_list && note.tags_list.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {note.tags_list.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded bg-[#F2F4F7] px-2 py-0.5 text-xs text-[#475467]"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-xs text-[#98A2B3]">
        <span>Updated {formatDate(note.updated_at)}</span>
        <span>
          {note.attachments_count} file{note.attachments_count === 1 ? "" : "s"}
        </span>
      </div>
    </div>
  );
}
