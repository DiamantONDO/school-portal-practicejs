// Shapes that mirror what the Django backend returns.

export type Role = "SUPERUSER" | "ADMIN" | "TEACHER" | "STUDENT";

export interface AuthUser {
  id: string; // UUID
  email: string;
  role: Role;
  first_name: string;
  last_name: string;
}

//Response body of POST /api/auth/login/
export interface LoginResponse {
  access: string;
  refresh: string;
  user: AuthUser;
}
