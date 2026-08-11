// Matches GET /api/accounts/profile/ (single object, not a list).
export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  bio: string;
  role: string;
  avatar: string; //initials to display
  role_label: string;
  institution: string;
  joined_since: string;
}
