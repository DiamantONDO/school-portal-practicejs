import type { AuthUser } from "@/types/auth";

// All token/user persistence goes through this one module.
// When you later upgrade to httpOnly cookies, THIS is the only file
// you rewrite — the rest of the app doesn't know or care how tokens
// are stored.

const ACCESS = "access_token";
const REFRESH = "refresh_token";
const USER = "auth_user";

export const authStorage = {
  getAccess(): string | null {
    if (typeof window === "undefined") return null; // guard for server render
    return localStorage.getItem(ACCESS);
  },

  getRefresh(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH);
  },

  getUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(USER);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  },

  save(access: string, refresh: string, user: AuthUser): void {
    localStorage.setItem(ACCESS, access);
    localStorage.setItem(REFRESH, refresh);
    localStorage.setItem(USER, JSON.stringify(user));
  },

  setAccess(access: string): void {
    localStorage.setItem(ACCESS, access);
  },

  clear(): void {
    localStorage.removeItem(ACCESS);
    localStorage.removeItem(REFRESH);
    localStorage.removeItem(USER);
  },
};
