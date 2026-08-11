"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { authStorage } from "@/lib/auth-storage";
import type { AuthUser, LoginResponse, Role } from "@/types/auth";

// Where each role lands after logging in.
export const roleHome: Record<Role, string> = {
  SUPERUSER: "/admin",
  ADMIN: "/admin",
  TEACHER: "/teacher",
  STUDENT: "/student",
};

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // On first mount, restore a saved session (if any).
  useEffect(() => {
    setUser(authStorage.getUser());
    setLoading(false);
  }, []);

  async function login(email: string, password: string): Promise<AuthUser> {
    const data = await api.post<LoginResponse>(
      "/auth/login/",
      { email, password },
      { auth: false } // no token yet
    );
    authStorage.save(data.access, data.refresh, data.user);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    authStorage.clear();
    setUser(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
