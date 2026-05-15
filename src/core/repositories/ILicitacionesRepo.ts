import type { Licitacion, FiltroFeed, SortMode } from "../entities";
import type { PaginatedResponse } from "../entities/ApiResponse";

export interface ILicitacionesRepo {
  getFeed(params: {
    cursor?: string;
    limit?: number;
    filters: FiltroFeed;
    sort: SortMode;
  }): Promise<PaginatedResponse<Licitacion>>;

  getById(id: string): Promise<Licitacion>;
}
