import { create } from "zustand";
import type { FiltroFeed, SortMode } from "@/core/entities";

interface FilterState {
  filters: FiltroFeed;
  sort: SortMode;
  setFilter: <K extends keyof FiltroFeed>(key: K, value: FiltroFeed[K]) => void;
  setSort: (sort: SortMode) => void;
  resetFilters: () => void;
}

const defaultFilters: FiltroFeed = {
  rubro: null,
  tipo: null,
  region: null,
  montoMin: null,
  montoMax: null,
};

export const useFilterStore = create<FilterState>((set) => ({
  filters: defaultFilters,
  sort: "fecha",

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  setSort: (sort) => set({ sort }),

  resetFilters: () => set({ filters: defaultFilters }),
}));
