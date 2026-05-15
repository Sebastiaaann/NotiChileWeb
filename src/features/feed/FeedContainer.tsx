import { useFeed } from "@/application/hooks/use-feed";
import { useFilterStore } from "@/application/stores/filter-store";
import { ErrorState } from "@/shared/components/ErrorState";
import { EmptyState } from "@/shared/components/EmptyState";
import { FeedTable } from "./components/FeedTable";
import { FeedFilters } from "./components/FeedFilters";
import { FeedSkeleton } from "./components/FeedSkeleton";

export function FeedContainer() {
  const { items, total, isLoading, isError, error, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } = useFeed();
  const filters = useFilterStore((state) => state.filters);
  const sort = useFilterStore((state) => state.sort);
  const setFilter = useFilterStore((state) => state.setFilter);
  const setSort = useFilterStore((state) => state.setSort);

  if (isLoading) return <FeedSkeleton />;

  if (isError) {
    return (
      <ErrorState
        message={error?.message ?? "Error al cargar licitaciones"}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Licitaciones</h1>
        <p className="text-sm text-muted-foreground">{total} resultados</p>
      </div>

      <FeedFilters filters={filters} sort={sort} onFilterChange={setFilter} onSortChange={setSort} />

      {items.length === 0 ? (
        <EmptyState message="No se encontraron licitaciones con los filtros actuales" />
      ) : (
        <FeedTable
          items={items}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={fetchNextPage}
        />
      )}
    </div>
  );
}
