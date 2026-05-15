export interface FiltroFeed {
  rubro: string | null;
  tipo: string | null;
  region: string | null;
  montoMin: number | null;
  montoMax: number | null;
}

export type SortMode = "fecha" | "monto" | "relevancia";

export const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "fecha", label: "Más recientes" },
  { value: "monto", label: "Mayor monto" },
  { value: "relevancia", label: "Relevancia" },
];
