// Subset of GET /api/assignments/ (AssignmentSerializer) that the UI uses.
export interface Assignment {
  id: string;
  title: string;
  description: string;
  due_date: string | null;
  is_published: boolean;
  class_name: string;
  created_at: string;
}
