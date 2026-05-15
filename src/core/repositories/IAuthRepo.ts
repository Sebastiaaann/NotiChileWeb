import type { User, LoginRequest, RegisterRequest, AuthResponse } from "../entities";

export interface IAuthRepo {
  login(data: LoginRequest): Promise<AuthResponse>;
  register(data: RegisterRequest): Promise<AuthResponse>;
  logout(): Promise<void>;
  getSession(): Promise<User | null>;
}
