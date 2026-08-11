"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";

// One hook for every list endpoint. Give it a path, get back the array plus
// loading/error/reload. Endpoints are role-aware on the backend, so a student
// automatically receives student-scoped data.
export function useApiList<T>(path: string) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      setData(await api.get<T[]>(path));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
