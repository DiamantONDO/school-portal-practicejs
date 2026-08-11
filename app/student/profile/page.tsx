"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Profile } from "@/types/profile";

export default function Page() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Profile</h1>

      <div className="rounded-xl border border-[#E4E7EC] bg-white p-6">
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {profile.avatar}
          </div>
          <div>
            <p className="text-lg font-semibold">{profile.full_name}</p>
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
        </dl>
      </div>
    </>
  );
}
