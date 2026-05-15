# AGENTS.md — FrontNotiChileC

> **Project**: FrontNotiChileC — Frontend web para NOTICHILEC (sistema de licitaciones)  
> **Version**: 0.1.0  
> **Last Updated**: 2026-05-15

---

## 1. Project Overview & Tech Stack

### Core Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19 | UI library |
| **TypeScript** | 5.x | Type safety (strict mode) |
| **Vite** | 6.x | Bundler + dev server |
| **Tailwind CSS** | v4 | Utility-first CSS |
| **shadcn/ui** | latest (base-nova) | Accessible UI components |

### State & Data Management
| Library | Purpose | Usage |
|---------|---------|-------|
| **Zustand** | Client state (UI, filters, theme) | `src/application/stores/` |
| **TanStack Query** | Server state + caching | `src/main.tsx` provider |
| **React Hook Form** | Form handling | `src/features/auth/` |
| **Zod** | Schema validation | Form validation + types |

### Routing & Auth
| Library | Purpose |
|---------|---------|
| **React Router v7** | SPA routing with lazy loading |
| **Better Auth** | Authentication (OAuth + sessions) |

### Development
| Tool | Purpose |
|------|---------|
| **Bun** | Runtime + package manager |
| **Lucide React** | Icon library |
| **Sonner** | Toast notifications |
| **next-themes** | Dark/light theme |

---

## 2. Architecture & Directory Structure

### Layered DDD Architecture

```
src/
├── core/                    # Domain layer (ZERO external deps)
│   ├── entities/            # Type definitions (Licitacion, User, etc.)
│   └── repositories/        # Interface contracts (IAuthRepo, etc.)
│
├── infrastructure/          # Implementation layer
│   ├── api/                 # HTTP client + repo implementations
│   ├── auth/                # Better Auth client
│   └── adapters/            # DTO ↔ Entity transformers
│
├── application/             # Orchestration layer
│   ├── stores/              # Zustand stores (UI state only)
│   ├── hooks/               # Application-level hooks
│   └── providers/           # React providers
│
├── features/                # Feature modules (auto-contenidas)
│   ├── feed/                # Feed de licitaciones
│   ├── auth/                # Login/Register
│   ├── licitacion-detail/   # Detalle de licitación
│   └── settings/            # Configuración
│
├── shared/                  # Cross-cutting concerns
│   ├── components/          # Shared components (AuthGuard, etc.)
│   ├── ui/                  # shadcn/ui components
│   └── lib/                 # Utilities (cn, formatters, constants)
│
└── components/              # shadcn/ui base (generated)
```

### Dependency Rules (STRICT)

```
core/ ← infrastructure/ ← application/ ← features/ ← shared/
(nada)   (solo core)      (core + infra)  (core + shared + app)  (solo core)
```

**Golden Rule**: `features/` NUNCA importa de otras features. Cada feature es autocontenida.

### Path Aliases
```ts
@/* → src/*
@/components/ui → src/components/ui
@/lib → src/shared/lib
```

---

## 3. Coding Conventions

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| **Components** | PascalCase | `FeedContainer`, `LoginForm` |
| **Files** | PascalCase (components), camelCase (utils) | `FeedCard.tsx`, `format.ts` |
| **Types/Interfaces** | PascalCase | `Licitacion`, `IAuthRepo` |
| **Functions/Utils** | camelCase | `formatMonto`, `handleClick` |
| **Constants** | UPPER_SNAKE_CASE | `API_URL`, `SORT_OPTIONS` |
| **Stores/Hooks** | camelCase with prefix | `useAuthStore`, `useFeed` |

### Import Order (per file)
```ts
// 1. React
import { useState } from "react";

// 2. Third-party libraries
import { useForm } from "react-hook-form";
import { z } from "zod";

// 3. Internal aliases (core → infrastructure → application → features → shared)
import type { Licitacion } from "@/core/entities";
import { useAuthStore } from "@/application/stores/auth-store";
import { Button } from "@/shared/ui/button";

// 4. Relative imports (siblings only)
import { FeedCard } from "./FeedCard";
```

### Component Structure
```tsx
// 1. Imports
import { useState } from "react";
import { Card } from "@/shared/ui/card";

// 2. Types (component-local)
interface FeedCardProps {
  data: Licitacion;
  onClick?: () => void;
}

// 3. Component
export function FeedCard({ data, onClick }: FeedCardProps) {
  // Hooks first
  const [isExpanded, setIsExpanded] = useState(false);

  // Event handlers
  const handleClick = () => onClick?.();

  // Render
  return (
    <Card onClick={handleClick}>
      {/* JSX */}
    </Card>
  );
}
```

### Barrel Exports
```ts
// ✅ GOOD - explicit named exports
export { Button } from "./Button";
export { Card } from "./Card";

// ❌ BAD - kills tree-shaking
export * from "./Button";
```

**Rule**: Only barrel when modules are ALWAYS used together (3+ occurrences).

### State Management Decision Tree
```
1. ¿Solo este componente? → useState
2. ¿Componentes hermanos? → Lift state up
3. ¿Componentes lejanos? → Zustand store
4. ¿Datos de API? → TanStack Query
5. ¿URL state? → React Router searchParams
6. ¿Form values? → React Hook Form + Zod
```

---

## 4. Testing Strategy

### Testing Pyramid
```
       /\
      /  \     E2E (5-10%) — Playwright
     /----\
    /      \   Integration (20-30%) — Testing Library
   /________\
  /          \  Unit (60-70%) — Vitest
 /____________\
```

### What to Test & How

| Layer | Tool | What to Test |
|-------|------|--------------|
| **core/** | Vitest | Entities, validators, utils |
| **application/** | Testing Library | Hooks, stores, containers |
| **features/** | Testing Library | Container 4 states: loading, empty, error, success |
| **shared/** | Testing Library | UI components, events, accessibility |
| **E2E** | Playwright | Critical flows: login → feed → detail |

### Coverage Thresholds (target)
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
}
```

### What NOT to Test
- shadcn/ui components (third-party)
- TanStack Query internals
- Better Auth internals
- Simple constants

---

## 5. Common Commands & Workflows

### Development
```bash
bun install          # Install dependencies
bun dev              # Start dev server (:5173)
bun build            # Production build
bun preview          # Preview production build
bun lint             # ESLint check
```

### Git Workflow
```bash
git checkout -b feature/my-feature   # Create feature branch
git add .
git commit -m "feat: add new feature"  # Conventional commits
git push origin feature/my-feature
```

### shadcn/ui Commands
```bash
bunx shadcn add button    # Add button component
bunx shadcn add card      # Add card component
# Components go to src/components/ui/
```

---

## 6. AI Agent Guidelines

### When Making Changes

1. **Read existing code first** — Check if similar patterns exist
2. **Follow the layer rules** — Never break dependency direction
3. **Use existing utilities** — Check `shared/lib/` before creating new utils
4. **Maintain container pattern** — Containers fetch, children present
5. **Type everything** — No `any`, use proper TypeScript types

### Before Committing

- [ ] Verify imports follow layer rules
- [ ] Check barrel exports are updated (if applicable)
- [ ] Ensure component follows SRP (< 200 lines)
- [ ] Validate forms with Zod schema
- [ ] Handle all 4 states for data components
- [ ] Use `cn()` for className composition

### Decision Checklist

```
[ ] ¿Esta lógica va en core, infrastructure o application?
[ ] ¿Necesita ser un Zustand store o es server state?
[ ] ¿El componente es container o presentational?
[ ] ¿Los imports respetan la jerarquía de capas?
[ ] ¿Hay tests para este cambio?
```

### Anti-Patterns to Avoid

- ❌ Importing `features/` from another feature
- ❌ Using `export *` in barrels
- ❌ Mixing concerns (fetch + render + events in one component)
- ❌ Prop drilling through 3+ levels
- ❌ useEffect for derived state
- ❌ Core layer importing React or external libs

---

## 7. Documentation References

| Document | Purpose |
|----------|---------|
| `docs/plans/2026-05-15-frontend-architecture-design.md` | Full architecture guide |
| `docs/plans/component-design-patterns.md` | Container pattern, composition |
| `docs/plans/testing-strategy.md` | Testing pyramid, tools |
| `docs/plans/performance-patterns.md` | Lazy loading, 4 states, optimistic UI |
| `docs/plans/barrel-exports-convention.md` | Barrel export rules |
| `docs/plans/react-patterns.md` | Error boundaries, hooks, useEffect |

---

## 8. Project-Specific Patterns

### Feed Container Pattern
```tsx
// Features/X/XContainer.tsx
export function FeedContainer() {
  const filters = useFilterStore();  // Zustand
  const { data, isLoading, error } = useFeed(filters);  // TanStack Query
  
  if (isLoading) return <FeedSkeleton />;
  if (error) return <FeedError />;
  if (!data) return <FeedEmpty />;
  
  return <FeedTable data={data} />;
}
```

### Auth Guard Pattern
```tsx
// shared/components/AuthGuard.tsx
export function AuthGuard() {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;
  
  return <Outlet />;
}
```

---

## 9. Key Files Quick Reference

| File | Purpose |
|------|---------|
| `src/main.tsx` | App entry, providers setup |
| `src/App.tsx` | Routes definition |
| `src/core/entities/` | Domain types |
| `src/application/stores/` | Zustand stores |
| `src/shared/components/` | Shared components |

---

**Remember**: This is a **production codebase**, not a playground. Every change should respect the architecture, maintain type safety, and follow established patterns. When in doubt, read the existing code first.
