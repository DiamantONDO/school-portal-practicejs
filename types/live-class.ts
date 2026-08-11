// Matches GET /api/live-classes/ (LiveClassListSerializer)
export interface LiveClass {
  id: string;
  title: string;
  description: string;
  status: string; //SCHEDULED or LIVE or ENDED
  is_locked: boolean;
  scheduled_start: string | null;
  scheduled_end: string | null;
  teacher: string;
  teacher_name: string;
  class_obj: string;
  class_name: string;
  participant_count: number;
  room_name: string;
  created_at: string;
}
