import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { FiltroFeed, SortMode } from "@/core/entities";
import { SORT_OPTIONS } from "@/core/entities";
import { RotateCcw } from "lucide-react";

interface FeedFiltersProps {
  filters: FiltroFeed;
  sort: SortMode;
  onFilterChange: <K extends keyof FiltroFeed>(key: K, value: FiltroFeed[K]) => void;
  onSortChange: (sort: SortMode) => void;
}

const rubros = ["Construcción", "Servicios", "Tecnología", "Salud", "Educación"];
const tipos = ["Licitación Pública", "Licitación Privada", "Trato Directo"];
const regiones = ["Metropolitana", "Valparaíso", "Biobío", "Antofagasta", "La Araucanía"];

export function FeedFilters({ filters, sort, onFilterChange, onSortChange }: FeedFiltersProps) {
  const hasActiveFilters = filters.rubro || filters.tipo || filters.region;

  return (
    <div className="flex flex-wrap gap-3 items-end">
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Rubro</label>
        <Select
          value={filters.rubro ?? ""}
          onValueChange={(v) => onFilterChange("rubro", v || null)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">Todos</SelectItem>
            {rubros.map((r) => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Tipo</label>
        <Select
          value={filters.tipo ?? ""}
          onValueChange={(v) => onFilterChange("tipo", v || null)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">Todos</SelectItem>
            {tipos.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Región</label>
        <Select
          value={filters.region ?? ""}
          onValueChange={(v) => onFilterChange("region", v || null)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">Todas</SelectItem>
            {regiones.map((r) => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Ordenar por</label>
        <Select value={sort} onValueChange={(v) => onSortChange(v as SortMode)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onFilterChange("rubro", null);
            onFilterChange("tipo", null);
            onFilterChange("region", null);
          }}
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Limpiar
        </Button>
      )}
    </div>
  );
}
