export const API_URL = import.meta.env.VITE_API_URL ?? "";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  LICITACION: (id: string) => `/licitacion/${id}`,
  SETTINGS: "/settings",
} as const;
