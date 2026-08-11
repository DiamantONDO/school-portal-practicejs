"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Profile } from "@/types/profile";
import { Icon } from "@/components/icons";
import { useApiList } from "@/lib/useApiList";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const p = await api.get<Profile>("/accounts/profile/");
        if (active) setProfile(p);
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (loading) return <p className="text-sm text-[#98A2B3]">Loading&hellip;</p>;

  if (error || !profile) {
    return (
      <div className="rounded-xl border border-[#E4E7EC] bg-white p-6">
        <p className="font-medium">Couldn&rsquo;t load your profile.</p>
        <p className="mt-1 text-sm text-[#667085]">
          Make sure the backend is running, then reload.
        </p>
      </div>
    );
  }

  const rows: [string, string][] = [
    ["Email", profile.email],
    ["Phone", profile.phone || "—"],
    ["Role", profile.role_label || profile.role],
    ["Institution", profile.institution || "—"],
    ["Member since", profile.joined_since || "—"],
  ];

  return (
    <>
      {/* 1. Main Grid Layout Container (1 Column on Mobile, 4 Columns on Large Screens) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start mt-2">
        
        {/* 2. Column 1: Settings Card - Explicitly takes up 1/4 of the width (lg:col-span-1) */}
        <div className="lg:col-span-1  rounded-xl border border-[#E4E7EC] bg-white p-6 min-h-[200px]">
          <h1 className="text-xl font-semibold mb-4 text-black">School Info</h1>
          
          <div className="space-y-4">
            <span className="flex items-center gap-2">
              <Icon name="email" className="text-gray-500 h-4 w-4 shrink-0" />
              <p className="text-sm text-gray-500 truncate">{profile.email}</p>     
            </span>

            <span className="flex items-center gap-2">
              <Icon className="text-gray-500 h-4 w-4 shrink-0" name="school" />
              <p className="text-sm text-gray-500 truncate">{profile.institution || "No Institution"}</p>     
            </span>

            <span className="flex items-center gap-2">
              <Icon className="text-gray-500 h-4 w-4 shrink-0" name="profile" />
              <p className="text-sm text-gray-500 truncate">{profile.full_name}</p>     
            </span>

            <span className="flex items-center gap-2">
              <Icon className="text-gray-500 h-4 w-4 shrink-0" name="calendar" />
              <p className="text-sm text-gray-500">Since {profile.joined_since || "—"}</p>     
            </span>
          </div>

          {/* Cleaned up nested 3-column stats block to look native inside the left narrow card */}
          <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-600">Classes</span>
              <span className="text-xs px-2 py-0.5 rounded font-mono text-gray-700">count</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-600">Assignments</span>
              <span className="text-xs0 px-2 py-0.5 rounded font-mono text-gray-700">count</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-600">Quizzes</span>
              <span className="text-xs px-2 py-0.5 rounded font-mono text-gray-700">0</span>
            </div>
            <button onClick={logout}
            className="rounded-2xl w-full h-8 bg-transparent hover:bg-red-100 hover:text-red-500"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* 3. Column 2: Profile Dashboard Card - Explicitly takes up 3/4 of the width (lg:col-span-3) */}
        <div className="lg:col-span-3 rounded-xl border border-[#E4E7EC] bg-white p-6 h-full">      
          <h1 className="mb-6 text-2xl font-semibold tracking-tight text-black">My Profile</h1>

          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold text-white"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {profile.avatar}
            </div>
            <div>
              <p className="text-lg font-semibold text-black">{profile.full_name}</p>
              <p className="text-sm text-[#667085]">
                {profile.role_label || profile.role}
              </p>
            </div>
          </div>

          {profile.bio && (
            <p className="mt-4 text-sm text-[#475467]">{profile.bio}</p>
          )}

          <dl className="mt-6 divide-y divide-[#EDEFF2]">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between py-2.5 text-sm">
                <dt className="text-[#667085]">{k}</dt>
                <dd className="font-medium text-[#1B2430]">{v}</dd>
              </div>
            ))}

            <div className="space-y-1 text-gray-500">
              <label className="text-sm" htmlFor="email">
                First Name
                </label>
                <input
                readOnly
                value={user?.first_name}
                className="w-1/2 rounded-2xl border px-3 py-2 read-only:cursor-not-allowed"
                />
            </div>
            <div className="space-y-1 text-gray-500">
              <label className="text-sm" htmlFor="email">
                Last Name
                </label>
                <input
                readOnly
                value={user?.last_name}
                className="w-1/2 rounded-2xl border px-3 py-2 read-only:cursor-not-allowed"
                />
            </div>
          </dl>
        </div>

      </div>
    </>
  );
}