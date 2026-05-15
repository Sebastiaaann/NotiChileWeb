import type { IAuthRepo } from "@/core/repositories/IAuthRepo";
import type { AuthResponse, LoginRequest, RegisterRequest, User } from "@/core/entities";
import { httpClient } from "@/infrastructure/api/http-client";

export const authRepo: IAuthRepo = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    return httpClient<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: data,
    });
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    return httpClient<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: data,
    });
  },

  async logout(): Promise<void> {
    await httpClient<void>("/api/auth/logout", { method: "POST" });
  },

  async getSession(): Promise<User | null> {
    try {
      return await httpClient<User>("/api/auth/session");
    } catch {
      return null;
    }
  },
};
