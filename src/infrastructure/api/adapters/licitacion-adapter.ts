import type { Licitacion } from "@/core/entities";

export interface LicitacionDTO {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  organismo_comprador: string;
  rubro: string | null;
  tipo: string | null;
  region: string | null;
  estado: string;
  moneda: string;
  monto_estimado: number | null;
  monto_label: string;
  fecha_publicacion: string;
  fecha_cierre: string | null;
  url_ficha: string;
  created_at: string;
  notificada: boolean;
}

export function adaptLicitacion(dto: LicitacionDTO): Licitacion {
  return {
    id: dto.id,
    codigo: dto.codigo,
    nombre: dto.nombre,
    descripcion: dto.descripcion,
    organismo: dto.organismo_comprador,
    rubro: dto.rubro,
    tipo: dto.tipo,
    region: dto.region,
    estado: dto.estado,
    moneda: dto.moneda,
    montoEstimado: dto.monto_estimado,
    montoLabel: dto.monto_label,
    fechaPublicacion: dto.fecha_publicacion,
    fechaCierre: dto.fecha_cierre,
    urlFicha: dto.url_ficha,
    createdAt: dto.created_at,
    notificada: dto.notificada,
  };
}

export interface PaginatedDTO {
  items: LicitacionDTO[];
  nextCursor: string | null;
  total: number;
}

export function adaptPaginatedFeed(dto: PaginatedDTO) {
  return {
    items: dto.items.map(adaptLicitacion),
    nextCursor: dto.nextCursor,
    total: dto.total,
  };
}
