export interface User {
  id: string;
  email: string;
  nombre: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombre: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
