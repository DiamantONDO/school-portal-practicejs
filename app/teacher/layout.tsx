"use client";

import RoleLayout from "@/components/RoleLayout";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return <RoleLayout allow={["TEACHER"]}>{children}</RoleLayout>;
}