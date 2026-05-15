import type { ILicitacionesRepo } from "@/core/repositories/ILicitacionesRepo";
import type { PaginatedResponse } from "@/core/entities/ApiResponse";
import type { Licitacion } from "@/core/entities";
import { httpClient } from "./http-client";
import {
  adaptPaginatedFeed,
  adaptLicitacion,
  type ApiFeedResponse,
  type LicitacionDTO,
} from "./adapters/licitacion-adapter";

function buildQuery(params: Record<string, string | number | null | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value != null && value !== "") {
      search.set(key, String(value));
    }
  }
  return search.toString();
}

export const licitacionesRepo: ILicitacionesRepo = {
  async getFeed({ cursor, limit = 20, filters, sort }): Promise<PaginatedResponse<Licitacion>> {
    const qs = buildQuery({
      cursor,
      limit,
      sort,
      rubro: filters.rubro,
      tipo: filters.tipo,
      region: filters.region,
      monto_min: filters.montoMin,
      monto_max: filters.montoMax,
    });

    const dto = await httpClient<ApiFeedResponse>(`/api/licitaciones?${qs}`);
    return adaptPaginatedFeed(dto);
  },

  async getById(id: string): Promise<Licitacion> {
    const dto = await httpClient<LicitacionDTO>(`/api/licitaciones/${id}`);
    return adaptLicitacion(dto);
  },
};
