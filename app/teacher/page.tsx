"use client";

import RequireAuth from "@/components/RequireAuth";
import { useAuth } from "@/context/AuthContext";

export default function TeacherPage() {
  return (
    <RequireAuth allow={["TEACHER"]}>
      <Body />
    </RequireAuth>
  );
}

function Body() {
  const { user, logout } = useAuth();
  return (
    <main className="space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Teacher dashboard</h1>
        <button onClick={logout} className="rounded border px-3 py-1 text-sm">
          Log out
        </button>
      </div>
      <p>
        Welcome, {user?.first_name} {user?.last_name} ({user?.email}).
      </p>
      <p className="text-sm text-gray-500">Role: {user?.role}</p>
    </main>
  );
}
