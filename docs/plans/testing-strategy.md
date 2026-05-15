# Testing Strategy — FrontNotiChileC

> Basado en "Manual Definitivo del Frontend Developer" de Gentleman Programming.

## Pirámide de Testing

```
       /\
      /E2E\         ← 5-10%: Playwright (flujos críticos)
     /______\
    /        \
   /Integr.   \    ← 20-30%: Testing Library (containers + hooks)
  /____________\
 /              \
/  Unit Tests    \  ← 60-70%: Vitest (entidades, utils, validaciones)
/_________________\
```

## Qué testear en cada capa

### Core (Unit Tests — Vitest)
Entidades de dominio, utilidades, validaciones, schemas Zod. Tests aislados, sin React, sin DOM.

### Application (Integration Tests — Testing Library)
Containers, hooks, stores de Zustand, queries de TanStack Query. Renderizar con providers mockeados.

### Features (Integration Tests — Testing Library)
Containers con datos reales mockeados. Testear los 4 estados (loading, empty, error, success).

### Shared Components (Integration Tests)
Componentes de UI con Testing Library. Testear render, eventos, accesibilidad.

### E2E (Playwright)
Flujos completos: login → feed → detalle de licitación.

## Coverage Thresholds

```ts
coverage: {
  thresholds: {
    global: {
      functions: 100,
      lines: 80,
      branches: 80,
      statements: 80,
    },
  },
},
```

## Lo que NO testeamos

- shadcn/ui components (son de terceros)
- TanStack Query internals
- Better Auth internals
- Constantes simples

## Testing Library Philosophy

> "Cuanto más tus tests se parecen a cómo se usa el software, más confianza pueden darte."

Buscar por `getByRole`, `getByText`, `getByLabelText`. NO testear implementación interna.

---

## Conexiones

- **Skill del agente**: `notichilec-testing-strategy` (`.agents/skills/notichilec-testing-strategy/`) — reglas compactas para agentes AI
- **Design doc principal**: `docs/plans/2026-05-15-frontend-architecture-design.md`
- **Component Design**: `docs/plans/component-design-patterns.md` + skill `notichilec-component-design`
- **Performance**: `docs/plans/performance-patterns.md` + skill `notichilec-performance`
