export interface PaginatedResponse<T> {
  items: T[];
  nextCursor: string | null;
  total: number;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}
