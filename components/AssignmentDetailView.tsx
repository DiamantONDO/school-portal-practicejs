"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { authStorage } from "@/lib/auth-storage";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/lib/format";

interface AssignmentDetail {
  id: string;
  title: string;
  description: string;
  instructions?: string;
  due_date: string | null;
  is_published: boolean;
  class_name: string;
  allow_resubmission?: boolean;
  allowed_formats?: string[];
  max_file_size?: number;
}

export default function AssignmentDetailView() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { user } = useAuth();

  const [assignment, setAssignment] = useState<AssignmentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    let active = true;
    (async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await api.get<AssignmentDetail>(`/assignments/${id}/`);
        if (active) setAssignment(data);
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  const backHref =
    user?.role === "STUDENT" ? "/student/assignments" : "/teacher/assignments";

  return (
    <>
      <Link
        href={backHref}
        className="text-sm font-medium"
        style={{ color: "var(--accent)" }}
      >
        &larr; Back to assignments
      </Link>

      {loading ? (
        <p className="mt-6 text-sm text-[#98A2B3]">Loading&hellip;</p>
      ) : error || !assignment ? (
        <div className="mt-6 rounded-xl border border-[#E4E7EC] bg-white p-6">
          <p className="font-medium">Couldn&rsquo;t load this assignment.</p>
          <p className="mt-1 text-sm text-[#667085]">
            It may not exist, or the backend isn&rsquo;t running.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">
                {assignment.title}
              </h1>
              <span
                className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={
                  assignment.is_published
                    ? {
                        backgroundColor:
                          "color-mix(in srgb, var(--accent) 12%, white)",
                        color: "var(--accent)",
                      }
                    : { backgroundColor: "#F2F4F7", color: "#667085" }
                }
              >
                {assignment.is_published ? "Published" : "Draft"}
              </span>
            </div>
            <p className="mt-1 text-[#667085]">
              {assignment.class_name} &middot; Due {formatDate(assignment.due_date)}
            </p>
          </div>

          {/* Instructions */}
          <Section title="Instructions">
            {assignment.instructions || assignment.description ? (
              <p className="whitespace-pre-wrap text-[#1B2430]">
                {assignment.instructions || assignment.description}
              </p>
            ) : (
              <p className="text-[#667085]">No instructions provided.</p>
            )}
          </Section>

          {/* Submission — students only (backend rejects others) */}
          {user?.role === "STUDENT" ? (
            <SubmissionForm assignment={assignment} />
          ) : (
            <div className="rounded-xl border border-dashed border-[#D0D5DD] bg-white p-6 text-center">
              <p className="text-[#667085]">
                Only students can submit to an assignment.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#E4E7EC] bg-white p-6">
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-[#667085]">
        {title}
      </h2>
      {children}
    </div>
  );
}

function SubmissionForm({ assignment }: { assignment: AssignmentDetail }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canSubmit = (text.trim().length > 0 || file !== null) && !submitting;

  const acceptAttr = assignment.allowed_formats?.length
    ? assignment.allowed_formats.map((f) => `.${f}`).join(",")
    : undefined;

  function clearForm() {
    setText("");
    setFile(null);
    setSubmitError(null);
    setSuccess(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    setSuccess(false);
    try {
      const form = new FormData();
      form.append("assignment", assignment.id);
      if (text.trim()) form.append("text_answer", text);
      if (file) form.append("file", file);

      const token = authStorage.getAccess();
      // NOTE: don't set Content-Type — the browser adds the multipart boundary.
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/submissions/`,
        {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: form,
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({} as Record<string, unknown>));
        const msg =
          (body.detail as string) ||
          (body.text_answer as string) ||
          (body.file as string) ||
          (body.assignment as string) ||
          "Submission failed.";
        throw new Error(msg);
      }

      setSuccess(true);
      setText("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-xl border border-[#E4E7EC] bg-white p-6">
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-[#667085]">
        Your submission
      </h2>

      {success && (
        <p className="mb-3 rounded-md bg-green-50 p-3 text-sm text-green-700">
          Submitted successfully.
        </p>
      )}
      {submitError && (
        <p className="mb-3 rounded-md bg-red-50 p-3 text-sm text-red-700">
          {submitError}
        </p>
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Type your answer here…"
        className="w-full rounded-lg border border-[#E4E7EC] p-3 text-sm outline-none focus:border-[var(--accent)]"
      />

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-[#475467]">
          Attach file <span className="font-normal text-[#98A2B3]">(optional)</span>
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptAttr}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm text-[#667085] file:mr-3 file:rounded-md file:border file:border-[#E4E7EC] file:bg-[#F5F6F8] file:px-3 file:py-1.5 file:text-sm"
        />
        {(assignment.allowed_formats?.length || assignment.max_file_size) && (
          <p className="mt-1 text-xs text-[#98A2B3]">
            {assignment.allowed_formats?.length
              ? `Allowed: ${assignment.allowed_formats.join(", ")}. `
              : ""}
            {assignment.max_file_size
              ? `Max ${(assignment.max_file_size / (1024 * 1024)).toFixed(1)}MB.`
              : ""}
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="rounded-md px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {submitting ? "Submitting…" : "Submit"}
        </button>
        <button
          onClick={clearForm}
          disabled={submitting}
          className="rounded-md border border-[#E4E7EC] px-4 py-2 text-sm transition hover:bg-[#F5F6F8] disabled:opacity-50"
        >
          Clear
        </button>
        <span className="text-xs text-[#98A2B3]">
          Provide a text answer, a file, or both.
        </span>
      </div>
    </div>
  );
}