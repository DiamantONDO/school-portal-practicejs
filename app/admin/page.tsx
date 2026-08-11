"use client";

import RequireAuth from "@/components/RequireAuth";
import { useAuth } from "@/context/AuthContext";

export default function AdminPage() {
  return (
    <RequireAuth allow={["ADMIN", "SUPERUSER"]}>
      <Body />
    </RequireAuth>
  );
}

function Body() {
  const { user, logout } = useAuth();
  return (
    <main className="space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin dashboard, {user?.first_name}</h1>
        <button onClick={logout} className="rounded border px-3 py-1 text-sm">
          Log out
        </button>
      </div>
      
      <p>
        Welcome, {user?.first_name} {user?.last_name} ({user?.email}).
      </p>
      <p className="text-sm text-blue-500 font-extrabold text-blue-500">Role: {user?.role}</p>
      <div>
        <h1>Your courses: </h1>
        <p>{}</p>
      </div>
    </main>
  );
}
