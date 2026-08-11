// Matches the fields returned by GET /api/classes/my-classes/
export type EnrollmentType =
  | "TEACHER_ONLY"
  | "STUDENT_REQUEST"
  | "OPEN_ENROLLMENT";

export interface TeacherClass {
  id: string; // UUID
  name: string;
  code: string;
  enrollment_type: EnrollmentType;
  created_at: string; // ISO datetime
  school?: { id?: string; name?: string } | null;
  created_by?: string | null;
}

// Human-friendly labels for the enrollment type.
export const enrollmentLabel: Record<EnrollmentType, string> = {
  TEACHER_ONLY: "Teacher added",
  STUDENT_REQUEST: "By request",
  OPEN_ENROLLMENT: "Open enrollment",
};