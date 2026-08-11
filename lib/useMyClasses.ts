"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { TeacherClass } from "@/types/class";

// Shared data hook so the dashboard preview and the full list page
// don't duplicate fetch/loading/error logic.
export function useMyClasses() {
  const [data, setData] = useState<TeacherClass[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      setData(await api.get<TeacherClass[]>("/classes/my-classes/"));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}