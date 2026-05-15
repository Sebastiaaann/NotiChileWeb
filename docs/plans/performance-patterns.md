# Performance Patterns — FrontNotiChileC

> Basado en "Manual Definitivo del Frontend Developer" de Gentleman Programming.

## 4 Estados Obligatorios

TODO componente que fetchea datos maneja estos 4 estados:

```tsx
function DataContainer() {
  const { data, isLoading, error } = useQuery(...);

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorState message={error.message} onRetry={refetch} />;
  if (!data || data.length === 0) return <EmptyState message="Sin resultados" />;
  return <DataView data={data} />;
}
```

## Skeleton Screens

Siempre mostrar estructura ANTES de que carguen los datos. Se siente 2x más rápido que un spinner.

- Loading → Skeleton que matchea la estructura real
- Empty → Mensaje descriptivo + CTA
- Error → Mensaje + botón de reintento

## Scroll Infinito

Usar `useInfiniteQuery` de TanStack Query + `IntersectionObserver`:

```tsx
const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
  useInfiniteQuery({
    queryKey: ['feed', filters],
    queryFn: ({ pageParam }) => api.getFeed({ ...filters, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
```

NO usar scroll events. Usar IntersectionObserver.

## Optimistic UI

Para mutaciones: actualizar cache primero, rollback en error, invalidate al final.

## Lazy Loading

Todas las rutas con `lazy()` + `Suspense`:

```tsx
const FeedPage = lazy(() => import('@/features/feed'));
const DetailPage = lazy(() => import('@/features/licitacion-detail'));
```

## Core Web Vitals

| Métrica | Objetivo | Cómo |
|---------|----------|------|
| LCP | < 2.5s | Lazy loading, skeleton, preload fonts |
| FID | < 100ms | Evitar long tasks |
| CLS | < 0.1 | aspect-ratio en imágenes, espacio reservado para skeletons |

---

## Conexiones

- **Skill del agente**: `notichilec-performance` (`.agents/skills/notichilec-performance/`) — reglas compactas para agentes AI
- **Design doc principal**: `docs/plans/2026-05-15-frontend-architecture-design.md`
- **Component Design**: `docs/plans/component-design-patterns.md` + skill `notichilec-component-design`
- **React Patterns**: `docs/plans/react-patterns.md` + skill `notichilec-react-patterns`
