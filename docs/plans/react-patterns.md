# React Patterns — FrontNotiChileC

> Basado en "Dominando React, la joya sin marco" de Gentleman Programming.

## 1. Error Boundaries

Capturan errores de **renderizado**, **ciclos de vida**, y **constructores**. NO capturan errores asíncronos (fetch), de event handlers, ni de SSR.

### Implementación
```tsx
class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo.componentStack);
  }
  render() {
    if (this.state.hasError) return this.props.fallback ?? <ErrorUI />;
    return this.props.children;
  }
}
```

### Placement
- Un ErrorBoundary por feature lazy-loadable
- ErrorBoundary por fuera de Suspense: `<ErrorBoundary><Suspense><Page /></Suspense></ErrorBoundary>`

## 2. Custom Hooks

### Cuándo extraer
- Lógica repetida en 2+ componentes → Hook
- Lógica con estado/efectos → Hook
- Más de 15 líneas en un componente → Extraer a hook local

### Estructura
```tsx
export function useFeed() {
  const filters = useFilterStore(state => state.filters);
  const query = useInfiniteQuery({ /* ... */ });
  return { items, isLoading, isError, fetchNextPage, hasNextPage, refetch };
}
```

Reglas: `useAlgo` naming, SRP (un hook una cosa), no exponer la librería externa al componente.

## 3. useEffect Discipline

### Regla de oro
> useEffect es para **sincronizar** con sistemas externos. NO para reaccionar a cambios de estado.

### ❌ NO va en useEffect
- Reaccionar a cambios de estado (va en el handler)
- Derivar valores computables (`const fullName = first + last`)
- Fetch de datos (usar TanStack Query)

### ✅ SÍ va en useEffect
- Suscripciones con cleanup (event bus, WebSocket)
- Sincronización con localStorage
- Efectos secundarios que NO son datos de API

### Anti-patrones comunes
| Anti-patrón | Solución |
|-------------|----------|
| Bucle infinito (setState de una dependencia) | Functional update o separar lógica |
| Estado derivado en useEffect | Calcular valor directamente |
| fetch en useEffect sin cleanup (race condition) | Usar TanStack Query |
| useEffect sin deps que debería tener | Agregar dependencias |

---

## Conexiones

- **Skill del agente**: `notichilec-react-patterns` (`.agents/skills/notichilec-react-patterns/`) — reglas compactas para agentes AI
- **Design doc principal**: `docs/plans/2026-05-15-frontend-architecture-design.md`
- **Component Design**: `docs/plans/component-design-patterns.md` + skill `notichilec-component-design`
- **Performance**: `docs/plans/performance-patterns.md` + skill `notichilec-performance`
