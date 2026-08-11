// Matches GET /api/messages/ (MessageSerializer).
// Note: sender/receiver are raw user UUIDs — the API does not nest names.
export interface Message {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  file: string | null;
  is_read: boolean;
  created_at: string;
}
