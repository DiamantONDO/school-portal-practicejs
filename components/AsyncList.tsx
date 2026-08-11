"use client";

import type { ReactNode } from "react";

// Wraps a list's async states. Renders children only when data is ready.
export default function AsyncList({
  loading,
  error,
  isEmpty,
  emptyText,
  onRetry,
  children,
}: {
  loading: boolean;
  error: boolean;
  isEmpty: boolean;
  emptyText: string;
  onRetry?: () => void;
  children: ReactNode;
}) {
  if (loading) {
    return <p className="text-sm text-[#98A2B3]">Loading&hellip;</p>;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-[#E4E7EC] bg-white p-6">
        <p className="font-medium">Couldn&rsquo;t load this list.</p>
        <p className="mt-1 text-sm text-[#667085]">
          Make sure the backend is running, then try again.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 rounded-md px-3 py-1.5 text-sm font-medium text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="rounded-xl border border-dashed border-[#D0D5DD] bg-white p-10 text-center">
        <p className="text-[#667085]">{emptyText}</p>
      </div>
    );
  }

  return <>{children}</>;
}