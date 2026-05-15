import { API_URL } from "@/shared/lib";

export class HttpClientError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
  ) {
    super(message);
    this.name = "HttpClientError";
  }
}

interface RequestConfig {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export async function httpClient<T>(
  endpoint: string,
  config: RequestConfig = {},
): Promise<T> {
  const { method = "GET", body, headers = {}, signal } = config;

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include", // envía cookies httpOnly automáticamente
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new HttpClientError(
      errorBody.message ?? `HTTP ${response.status}`,
      response.status,
      errorBody.code ?? "UNKNOWN_ERROR",
    );
  }

  return response.json() as Promise<T>;
}
