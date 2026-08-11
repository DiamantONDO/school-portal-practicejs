"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { roleTheme } from "@/lib/roles";
import { Icon } from "@/components/icons";

export default function RoleSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!user) return null;
  const theme = roleTheme[user.role];

  // `mini` = icon-only mode. True for the collapsed desktop rail; always
  // false in the mobile drawer.
  function NavLinks({ mini, onClick }: { mini: boolean; onClick?: () => void }) {
    return (
      <nav className="flex-1 space-y-1 px-3">
        {theme.nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClick}
              title={mini ? item.label : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                mini ? "justify-center" : ""
              } ${active ? "font-medium" : "text-[#475467] hover:bg-[#F5F6F8]"}`}
              style={
                active
                  ? {
                      backgroundColor: "color-mix(in srgb, var(--accent) 12%, white)",
                      color: "var(--accent)",
                    }
                  : undefined
              }
            >
              <Icon name={item.icon} />
              {!mini && item.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  function Footer({ mini }: { mini: boolean }) {
    if (mini) {
      return (
        <div className="border-t border-[#E4E7EC] p-2">
          <button
            onClick={logout}
            title="Log out"
            aria-label="Log out"
            className="flex w-full justify-center rounded-md p-2 text-[#475467] hover:bg-[#F5F6F8]"
          >
            <Icon name="logout" />
          </button>
        </div>
      );
    }
    return (
      <div className="border-t border-[#E4E7EC] p-3">
        <div className="px-2 pb-2">
          <p className="truncate text-sm font-medium">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="truncate text-xs text-[#667085]">{theme.label}</p>
        </div>
        <button
          onClick={logout}
          className="w-full rounded-md border border-[#E4E7EC] px-3 py-1.5 text-sm transition hover:bg-red-100 hover:text-red-500 hover:font-bold"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <>
      {/*Desktop sidebar (collapsible)*/}
      <aside
        className={`fixed inset-y-0 left-0 z-10 hidden flex-col border-r border-[#E4E7EC] bg-white transition-[width] duration-200 md:flex ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {collapsed ? (
          <div className="flex justify-center py-4">
            <button
              onClick={onToggle}
              title="Expand"
              aria-label="Expand sidebar"
              className="rounded-md p-2 text-[#856667] hover:bg-[#f8f6f5]"
            >
              <Icon name="chevronRight" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-2">
              <Icon name="book" className="text-blue-500 h-5 w-9" />
              <span className="font-semibold tracking-tight">School Portal</span>
            </div>
            <button
              onClick={onToggle}
              title="Collapse"
              aria-label="Collapse sidebar"
              className="rounded-2xl p-4 text-[#667085] hover:bg-[#f8f5f5]"
            >
              <Icon name="chevronLeft" />
            </button>
          </div>
        )}
        <NavLinks mini={collapsed} />
        <Footer mini={collapsed} />
      </aside>

      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-[#E4E7EC] bg-white px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-5 w-5 rounded"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <span className="font-semibold tracking-tight">School Portal</span>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="rounded-md border border-[#E4E7EC] p-2"
        >
          <Icon name="menu" />
        </button>
      </div>

      {/* Mobile drawer (always full-width, never mini) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-20 md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-white">
            <div className="flex items-center gap-2 px-4 py-4">
              <span
                className="inline-block h-5 w-5 rounded"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <span className="font-semibold tracking-tight">School Portal</span>
            </div>
            <NavLinks mini={false} onClick={() => setDrawerOpen(false)} />
            <Footer mini={false} />
          </aside>
        </div>
      )}
    </>
  );
}
