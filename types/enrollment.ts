import type { TeacherClass } from "@/types/class";

// Matches GET /api/enrollments/ (StudentEnrollmentSerializer)
export interface EnrollmentStudent {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface Enrollment {
  id: string;
  class_obj: TeacherClass | null; // nested class
  student: EnrollmentStudent | null; // nested user
  joined_at: string;
}
