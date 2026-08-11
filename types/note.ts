// Matches GET /api/notes/ (NoteListSerializer)
export interface Note {
  id: string;
  title: string;
  note_type: string;
  visibility: string;
  tags_list: string[];
  created_at: string;
  updated_at: string;
  view_count: number;
  created_by: string;
  created_by_name: string;
  class_name: string;
  attachments_count: number;
  is_favorited: boolean;
}
