import type { Licitacion } from "@/core/entities";

export interface LicitacionDTO {
  id: string;
  codigoExterno: string;
  nombre: string;
  organismoNombre: string;
  tipo: string | null;
  categoria: string | null;
  montoEstimado: number | null;
  montoLabel: string;
  moneda: string;
  fechaPublicacion: string;
  fechaCierre: string | null;
  estado: string;
  url: string;
  region: string | null;
  createdAt: string;
}

export function adaptLicitacion(dto: LicitacionDTO): Licitacion {
  return {
    id: dto.id,
    codigo: dto.codigoExterno,
    nombre: dto.nombre,
    descripcion: null,
    organismo: dto.organismoNombre,
    rubro: dto.categoria,
    tipo: dto.tipo,
    region: dto.region,
    estado: dto.estado,
    moneda: dto.moneda,
    montoEstimado: dto.montoEstimado,
    montoLabel: dto.montoLabel,
    fechaPublicacion: dto.fechaPublicacion,
    fechaCierre: dto.fechaCierre,
    urlFicha: dto.url,
    createdAt: dto.createdAt,
    notificada: false,
  };
}

export interface ApiFeedResponse {
  data: LicitacionDTO[];
  pageInfo: {
    limit: number;
    hasMore: boolean;
    nextCursor: string | null;
    sortMode: string;
    windowDays: number;
    windowStart: string;
  };
}

export function adaptPaginatedFeed(dto: ApiFeedResponse) {
  return {
    items: dto.data.map(adaptLicitacion),
    nextCursor: dto.pageInfo.nextCursor,
    total: dto.pageInfo.limit,
  };
}
