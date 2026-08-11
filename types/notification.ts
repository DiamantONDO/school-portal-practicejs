// Matches GET /api/notifications/ (NotificationSerializer).
// Named AppNotification to avoid clashing with the DOM's global Notification.
export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  read: boolean;
  read_at: string | null;
  created_at: string;
}
