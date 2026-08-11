"use client";

import RoleLayout from "@/components/RoleLayout";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return <RoleLayout allow={["STUDENT"]}>{children}</RoleLayout>;
}