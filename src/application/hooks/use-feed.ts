import { useInfiniteQuery } from "@tanstack/react-query";
import { licitacionesRepo } from "@/infrastructure/api/licitaciones-repo";
import { useFilterStore } from "@/application/stores/filter-store";

export function useFeed() {
  const filters = useFilterStore((state) => state.filters);
  const sort = useFilterStore((state) => state.sort);

  const query = useInfiniteQuery({
    queryKey: ["feed", filters, sort],
    queryFn: ({ pageParam }) =>
      licitacionesRepo.getFeed({
        cursor: pageParam as string | undefined,
        filters,
        sort,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const items = query.data?.pages.flatMap((p) => p.items) ?? [];

  return {
    items,
    total: query.data?.pages[0]?.total ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    refetch: query.refetch,
  };
}
