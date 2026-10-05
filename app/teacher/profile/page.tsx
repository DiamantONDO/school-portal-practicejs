"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Profile } from "@/types/profile";
import { Icon } from "@/components/icons";
import { useAuth } from "@/context/AuthContext";

type Tab = "personal" | "security" | "notifications";

const TABS: { id: Tab; label: string }[] = [
  { id: "personal", label: "Personal Info" },
  { id: "security", label: "Security" },
  { id: "notifications", label: "Notifications" },
];

export default function Page() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const { user, logout } = useAuth();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left column — School Info */}
      <aside className="rounded-xl border border-[#E4E7EC] bg-white p-6 lg:col-span-1">
        <h1 className="mb-4 text-xl font-semibold text-black">School Info</h1>

        <div className="space-y-4">
          <InfoRow icon="email" text={profile.email} />
          <InfoRow icon="school" text={profile.institution || "No institution"} />
          <InfoRow icon="profile" text={profile.full_name} />
          <InfoRow icon="calendar" text={`Since ${profile.joined_since || "—"}`} />
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <button
            onClick={logout}
            className="h-9 w-full rounded-lg bg-transparent text-sm transition hover:bg-red-50 hover:text-red-600"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Right column — tabbed content */}
      <section className="rounded-xl border border-[#E4E7EC] bg-white p-6 lg:col-span-2">
        {/* Tab bar */}
        <div className="mb-6 border-b border-[#E4E7EC]">
          <ul className="-mb-px flex flex-wrap text-sm font-medium">
            {TABS.map((t) => {
              const active = activeTab === t.id;
              return (
                <li key={t.id} className="me-2">
                  <button
                    onClick={() => setActiveTab(t.id)}
                    className="inline-block border-b-2 p-4 transition"
                    style={
                      active
                        ? { borderColor: "var(--accent)", color: "var(--accent)" }
                        : { borderColor: "transparent", color: "#667085" }
                    }
                  >
                    {t.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Tab panels — only the active one renders */}
        {activeTab === "personal" && <PersonalInfo profile={profile} />}
        {activeTab === "security" && <Security />}
        {activeTab === "notifications" && <Notifications />}
      </section>
    </div>
  );
}

/* ---------- small helpers ---------- */

function InfoRow({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="flex items-center gap-2">
      <Icon name={icon} className="h-4 w-4 shrink-0 text-gray-500" />
      <p className="truncate text-sm text-gray-500">{text}</p>
    </span>
  );
}

/* ---------- Tab 1: Personal Info ---------- */

function PersonalInfo({ profile }: { profile: Profile }) {
  const rows: [string, string][] = [
    ["Email", profile.email],
    ["Phone", profile.phone || "—"],
    ["Role", profile.role_label || profile.role],
    ["Institution", profile.institution || "—"],
    ["Member since", profile.joined_since || "—"],
  ];

  return (
    <div>
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

      {profile.bio && <p className="mt-4 text-sm text-[#475467]">{profile.bio}</p>}

      <dl className="mt-6 divide-y divide-[#EDEFF2]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between py-2.5 text-sm">
            <dt className="text-[#667085]">{k}</dt>
            <dd className="font-medium text-[#1B2430]">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ---------- Tab 2: Security ---------- */

function Security() {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-800"></h2>
      <>Change Password</>
      <p className="text-sm text-[#667085] mb-6">
        Choose a strong password you haven't used before.
      </p>
      
        <h2>Current Password</h2>
        <input
            id="password"
            type="password"
            placeholder="********"
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white outline-indigo-600 focus:outline-4"
            />
          <div className="space-y-4 max-w-xl">
  
  {/* Row 1: New Password */}
  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
    <div className="sm:w-1/3">
      <label htmlFor="new-password" className="text-sm font-semibold text-gray-700">
        New Password
      </label>
    </div>
    <div className="sm:w-2/3">
      <input
        id="new-password"
        type="password"
        placeholder="********"
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white text-black outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
      />
    </div>
  </div>

  {/* Row 2: Confirm New Password */}
  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
    <div className="sm:w-1/3">
      <label htmlFor="confirm-password" className="text-sm font-semibold text-gray-700">
        Confirm New Password
      </label>
    </div>
    <div className="sm:w-2/3">
      <input
        id="confirm-password" /* Unique ID */
        type="password"
        placeholder="********"
        required
        className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white text-black outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
      />
    </div>
  </div>

</div>


          <div className="flex justify-end">
            <button className="inline-flex items-center justify-center font-medium
           rounded-lg transition-colors duration-150 select-none focus-visible:outline-none 
           focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 
           disabled:opacity-50 disabled:cursor-not-allowed bg-[#4F46E5] text-white 
           hover:bg-[#4338CA] border border-transparent h-9 px-4 text-sm gap-2">
            <span>Update Password</span>
          </button>
          </div>

      
      <div className="mt-4 rounded-lg border border-dashed border-[#D0D5DD] p-6 text-center text-sm text-[#98A2B3]">
        Password change and security options coming soon.
      </div>
    </div>
  );
}

/*Tab 3: Notifications*/

function Notifications() {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-800">Notification settings</h2>
      <p className="text-sm text-[#667085]">
        Choose how you receive portal system alerts.
      </p>
      <div className="mt-4 rounded-lg border border-dashed border-[#D0D5DD] p-6 text-center text-sm text-[#98A2B3]">
        Notification preferences coming soon.
      </div>
    </div>
  );
}