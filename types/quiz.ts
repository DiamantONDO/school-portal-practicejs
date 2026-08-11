// Matches GET /api/quizzes/ (QuizSerializer) — fields the UI uses.
export interface Quiz {
  id: string;
  title: string;
  description: string;
  time_limit_minutes: number | null;
  is_published: boolean;
  class_obj: { name?: string } | null;
  questions: { id: string }[];
  created_at: string;
}
