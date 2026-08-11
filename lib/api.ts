import { authStorage } from "@/lib/auth-storage";

// http://localhost:8000/api  (from .env.local)
const BASE = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, message: string, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

interface ApiOptions extends RequestInit {
  auth?: boolean; // attach the access token? default true
}

async function request<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { auth = true, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  };

  if (auth) {
    const token = authStorage.getAccess();
    if (token) finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  let res = await fetch(`${BASE}${path}`, { ...rest, headers: finalHeaders });

  // Access tokens live 30 min. If one expired, refresh once and retry.
  if (res.status === 401 && auth && authStorage.getRefresh()) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      finalHeaders["Authorization"] = `Bearer ${authStorage.getAccess()}`;
      res = await fetch(`${BASE}${path}`, { ...rest, headers: finalHeaders });
    }
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message =
      (body as { detail?: string })?.detail ?? `Request failed (${res.status})`;
    throw new ApiError(res.status, message, body);
  }

  if (res.status === 204) return undefined as T; // no content
  return res.json() as Promise<T>;
}

async function tryRefresh(): Promise<boolean> {
  const refresh = authStorage.getRefresh();
  if (!refresh) return false;
  try {
    const res = await fetch(`${BASE}/auth/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
    if (!res.ok) {
      authStorage.clear(); // refresh token is dead too — force re-login
      return false;
    }
    const data = (await res.json()) as { access: string };
    authStorage.setAccess(data.access);
    return true;
  } catch {
    return false;
  }
}

// Convenience wrappers. Note: paths must keep DRF's trailing slash.
export const api = {
  get: <T>(path: string, opts?: ApiOptions) =>
    request<T>(path, { ...opts, method: "GET" }),
  post: <T>(path: string, data?: unknown, opts?: ApiOptions) =>
    request<T>(path, {
      ...opts,
      method: "POST",
      body: data !== undefined ? JSON.stringify(data) : undefined,
    }),
  patch: <T>(path: string, data?: unknown, opts?: ApiOptions) =>
    request<T>(path, {
      ...opts,
      method: "PATCH",
      body: data !== undefined ? JSON.stringify(data) : undefined,
    }),
  delete: <T>(path: string, opts?: ApiOptions) =>
    request<T>(path, { ...opts, method: "DELETE" }),
};
