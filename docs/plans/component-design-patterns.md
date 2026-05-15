# Component Design Patterns — FrontNotiChileC

> Basado en "Clean Architecture en Front End" y "Manual Definitivo del Frontend Developer" de Gentleman Programming.

## Principios

### Single Responsibility (SRP)
Un componente = una responsabilidad. Si mezcla lógica de datos + presentación + estado UI, hay que partirlo.

### Container Pattern
Cada feature tiene UN Container que:
1. Obtiene datos (hooks de `application/` o TanStack Query)
2. Maneja estado UI del layout (expansión, tabs, modales)
3. Renderiza componentes hijos pasándoles props

Los componentes hijos son **puramente presentacionales**: NO hacen fetch, NO llaman a stores.

### Composición sobre Props Explosión

```tsx
// ❌ MAL
<Card variant="elevated" showImage badgeText="Nuevo" showActions onEdit={...} />

// ✅ BIEN
<Card variant="elevated">
  <CardImage src="..." />
  <CardBadge>Nuevo</CardBadge>
  <CardActions>
    <Button onClick={...}>Editar</Button>
  </CardActions>
</Card>
```

### Compound Components
Componentes con partes relacionadas que comparten estado interno vía Context.

## State Decision Tree

```
¿Solo lo usa este componente?          → useState
¿Lo usan componentes hermanos?          → Lifting State Up
¿Lo usan componentes lejanos?           → Zustand store
¿Son datos de API?                      → TanStack Query
¿Es parte de la URL?                    → React Router search params
¿Son valores de formulario?             → React Hook Form + Zod
```

## Anti-Patterns

- ❌ Prop drilling a través de 3+ niveles
- ❌ Efectos para derivar estado (`useEffect` → `setState` cuando se puede calcular directo)
- ❌ Fetch en componentes hijos (que el padre fetchee)
- ❌ Un archivo > 200 líneas mezclando lógica + JSX

## Reglas de importación

| Componente | Puede importar de |
|-----------|-------------------|
| Container | `core/`, `shared/`, `application/stores`, `application/hooks` |
| Presentational | `shared/`, `core/entities` (solo tipos) |
| Feature component | NUNCA otra feature |

---

## Conexiones

- **Skill del agente**: `notichilec-component-design` (`.agents/skills/notichilec-component-design/`) — reglas compactas para agentes AI
- **Design doc principal**: `docs/plans/2026-05-15-frontend-architecture-design.md`
- **Performance**: `docs/plans/performance-patterns.md` + skill `notichilec-performance`
- **Testing**: `docs/plans/testing-strategy.md` + skill `notichilec-testing-strategy`
