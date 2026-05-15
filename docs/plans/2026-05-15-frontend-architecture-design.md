# FrontNotiChileC — Arquitectura Frontend Web

Stack: **Bun + Vite + React 19 + TypeScript + shadcn/ui + Tailwind CSS v4**

---

## Stack y justificación

| Librería | Versión | Para qué | Por qué esta y no otra |
|----------|---------|----------|------------------------|
| **Bun** | latest | Runtime + package manager | Velocidad (instalaciones 10x más rápidas que npm). El usuario lo pidió explicitamente. |
| **Vite** | 6.x | Bundler + dev server | Estándar de facto para React SPA. HMR instantáneo. shadcn tiene template oficial. |
| **React** | 19 | UI library | El usuario lo pidió. Ecosistema más maduro para web. |
| **TypeScript** | 5.x | Type safety | No negociable en proyectos serios. |
| **shadcn/ui** | latest (v4) | Componentes UI accesibles | Componentes sobre Radix UI con full accesibilidad. No es una dependencia — es código que poseemos. Tailwind v4 incluido. |
| **Tailwind CSS** | v4 | Estilos utilitarios | shadcn corre sobre Tailwind. Design tokens via CSS variables. |
| **React Router** | v7 | Ruteo SPA | 3-4 pantallas, no necesita más. TanStack Router es overkill para este alcance. |
| **Better Auth** | 1.6.x | Autenticación + sesiones | 28K⭐, framework-agnostic, cliente React nativo con hooks (`useSession`). Se monta como middleware en Express existente. |
| **React Hook Form** | 7.x | Formularios performantes | Integración oficial con shadcn. Minimiza re-renders. |
| **Zod** | 3.x | Validación de esquemas | Tipado inferido (`z.infer`). Resolver nativo con RHF. |
| **TanStack Query** | 5.x | Server state + caché | Cache automático, `useInfiniteQuery` para scroll infinito, retry, stale management. El usuario lo pidió. |
| **Zustand** | 5.x | Client state global | 1KB, sin providers, selectors automáticos. Solo para estado UI (filtros, tema, modales). |
| **Lucide React** | latest | Iconos | Reemplazo liviano de Ionicons (@expo/vector-icons). Open source. |

### Lo que NO usamos (y por qué)

| Librería | Motivo |
|----------|--------|
| Redux / Redux Toolkit | Overkill. Zustand + TanStack Query cubren ambos tipos de estado con menos boilerplate. |
| Next.js | SPA de 3 pantallas no necesita SSR/SSG. React Router alcanza y sobra. |
| TanStack Router | Excelente librería, pero para 3-4 rutas con search params no justifica la curva. |
| Jotai / Recoil | Atoms sería válido pero Zustand se alinea mejor con el patrón contenedor (una store = un ámbito). |
| Axios | fetch nativo + un wrapper de 20 líneas alcanza. Si se necesita, se agrega después. |
| Framer Motion | No hay animaciones complejas planeadas. Agregar cuando sea necesario. |
| tRPC | El backend es Express con REST. No hay GraphQL ni RPC. fetch directo + TanStack Query. |

---

## Arquitectura en capas

### Principio rector

> **El dominio no sabe que React existe.**

Cada capa solo puede importar de capas más internas. Las flechas apuntan en la dirección de dependencia:

```
core/  ←  infrastructure/  ←  application/  ←  features/  ←  shared/
( nada)   (impl. concreta)   (orquestación)   (UI + lógica)  (reutilizable)
```

### Core (`src/core/`) — Cero dependencias externas

Define las **entidades de dominio** y los **contratos (interfaces)**. No importa React, ni TanStack Query, ni nada del mundo exterior.

```
src/core/
├── entities/
│   ├── Licitacion.ts        → { id, codigo, nombre, monto, ... }
│   ├── User.ts              → { id, email, nombre, ... }
│   └── FiltroFeed.ts        → { rubro, tipo, region, montoMin, ... }
├── repositories/            ← INTERFACES (contratos)
│   ├── ILicitacionesRepo.ts
│   └── IAuthRepo.ts
└── errors/
    └── DomainError.ts       → Clase base para errores de dominio
```

**Regla**: Cero imports de `@tanstack/*`, `better-auth/*`, `react/*`, etc.

### Infrastructure (`src/infrastructure/`) — Implementaciones concretas

Implementa los contratos definidos en `core/`. Aquí vive la comunicación con el mundo exterior.

```
src/infrastructure/
├── api/
│   ├── http-client.ts       → Wrapper sobre fetch (timeout, headers, error handling)
│   ├── licitaciones-repo.ts → Implementa ILicitacionesRepo (usa TanStack Query internamente)
│   └── adapters/
│       ├── licitacion-adapter.ts  → DTO API → Licitacion entity
│       └── feed-adapter.ts        → Respuesta paginada → FeedPage entity
├── auth/
│   ├── auth-client.ts       → Better Auth client instance
│   └── auth-repo.ts         → Implementa IAuthRepo (wrapea better-auth)
└── storage/
    └── local-storage.ts     → get/set/remove con tipado
```

**Regla**: Puede importar `core/`. NO importa `features/` ni `application/` (excepto casos muy específicos como providers).

### Application (`src/application/`) — Orquestación global

Capa que conecta la infraestructura con la UI. Aquí viven los **stores de Zustand** (client state global) y **providers** de React.

```
src/application/
├── stores/                  ← Zustand — solo client state
│   ├── filter-store.ts      → Filtros activos del feed
│   └── ui-store.ts          → Tema, sidebar, modales globales
├── providers/
│   ├── query-provider.tsx   → TanStack QueryClientProvider
│   ├── auth-provider.tsx    → Better Auth session provider
│   └── theme-provider.tsx   → Tema claro/oscuro
└── hooks/                   ← Hooks de aplicación (orquestan casos de uso)
    ├── use-feed.ts          → Combina Zustand filters + TanStack Query
    └── use-auth.ts          → Wrapper sobre Better Auth hooks
```

**Regla**: Puede importar `core/` e `infrastructure/`. NO importa `features/`.

### Features (`src/features/`) — Módulos de funcionalidad

Cada feature es **autocontenida**: tiene su contenedor, componentes, servicios si aplica, y adapters.

```
src/features/
├── feed/
│   ├── FeedContainer.tsx    → Contenedor: estado, paginación, layout
│   ├── components/
│   │   ├── FeedCard.tsx
│   │   ├── FeedFilters.tsx
│   │   └── FeedEmpty.tsx
│   └── index.ts
├── auth/
│   ├── AuthContainer.tsx    → Login/Register/Session management
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   └── index.ts
├── licitacion-detail/
│   ├── DetailContainer.tsx
│   ├── components/
│   │   ├── InfoGrid.tsx
│   │   └── TimelineBadge.tsx
│   └── index.ts
└── settings/
    ├── SettingsContainer.tsx
    ├── components/
    └── index.ts
```

**Cada feature puede tener además**:
- `services/` → solo si necesita lógica API específica que no cubre el repo global
- `adapters/` → transformaciones de datos específicas de la feature
- `hooks/` → hooks de estado locales a la feature

**Regla**: Puede importar `core/`, `shared/`, y `application/` (solo stores). NO importa de otras features.

### Shared (`src/shared/`) — Componentes root (alcance global)

```
src/shared/
├── ui/                      → shadcn components (generados por CLI)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── lib/
│   ├── cn.ts                → clsx + tailwind-merge
│   ├── format.ts            → formatDate, formatMonto, etc.
│   └── constants.ts         → API_URL, rutas, etc.
├── hooks/                   → Hooks compartidos (no de negocio)
│   ├── use-media-query.ts
│   └── use-debounce.ts
└── components/              → Componentes compartidos del proyecto
    ├── Badge.tsx
    ├── LoadingSpinner.tsx
    └── ErrorBoundary.tsx
```

**Regla**: NO importa de `features/`, `application/`, ni `infrastructure/`. Solo importa librerías externas y `shared/` mismo.

---

## Regla del alcance (Scope Rule)

> **Un archivo solo importa de capas iguales o más internas, y nunca de features hermanas.**

| ¿Dónde estoy? | ¿Puedo importar de otra feature? |
|---|---|
| `features/feed/` | ❌ No |
| `features/auth/` | ❌ No |
| `shared/` | ❌ No (solo capas internas: core) |
| `application/` | ❌ No |
| `infrastructure/` | ❌ No |
| `core/` | ❌ No (nada externo) |

**Excepción**: `application/providers/` puede importar `infrastructure/` para inicializar clientes.

**Excepción 2**: Un contenedor puede importar `application/stores/` y `application/hooks/`.

---

## Data flow: el ciclo completo

```
1. Usuario interactúa → FeedContainer.tsx
2. Container lee filtros de → Zustand filter-store (client state)
3. Container llama a → useFeed() (application/hooks)
4. useFeed() usa el filtro como queryKey → TanStack Query
5. TanStack Query llama a → LicitacionesRepo (infrastructure)
6. Repo hace fetch → Express API (:3001)
7. Vuelve DTO → Adapter transforma a → Licitacion entity (core)
8. Cache de TanStack Query almacena → entities
9. Container recibe datos → renderiza → FeedCard.tsx
```

### ¿Por qué TanStack Query y no Zustand para datos?

| Escenario | Zustand | TanStack Query |
|-----------|---------|----------------|
| Filtros seleccionados | ✅ Cliente, síncrono | ❌ |
| Tema claro/oscuro | ✅ Cliente, síncrono | ❌ |
| Lista de licitaciones | ❌ Cachearía manual | ✅ Cache + stale + refetch |
| Detalle de licitación | ❌ | ✅ |
| Scroll infinito | ❌ | ✅ useInfiniteQuery |
| Login/logout | ❌ Better Auth lo maneja | ❌ |
| Mutaciones (si aplica) | ❌ | ✅ useMutation |

---

## Módulos / Pantallas

| Ruta | Feature | ¿Requiere auth? | Componentes principales |
|------|---------|-----------------|------------------------|
| `/` | feed | No | FeedContainer, FeedCard, FeedFilters |
| `/licitacion/:id` | licitacion-detail | No | DetailContainer, InfoGrid |
| `/login` | auth | No (es la página de login) | AuthContainer > LoginForm |
| `/register` | auth | No | AuthContainer > RegisterForm |
| `/settings` | settings | Sí | SettingsContainer |
| `/auth/callback` | auth | No | Callback handler de Better Auth OAuth |

**Protección de rutas**: Higher-order layout que checkea `useSession()` de Better Auth. Si la ruta requiere auth y no hay sesión, redirige a `/login`.

---

## Árbol de dependencias completo

```
                    ┌──────────────────────────┐
                    │      features/            │
                    │  (feed, auth, detail,     │
                    │   settings)               │
                    │  importa: core, shared,   │
                    │  application/stores       │
                    └─────────┬────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
   ┌────────────────┐ ┌──────────────┐ ┌──────────────┐
   │    shared/     │ │ application/ │ │    core/     │
   │ (ui, lib,     │ │ (stores,    │ │ (entities,  │
   │  components)  │ │  providers) │ │  repos)     │
   └────────────────┘ └──────┬───────┘ └──────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │ infrastructure/│
                    │ (api, auth,   │
                    │  storage)     │
                    └────────────────┘
```

---

## Checklist de verificación

- [ ] `core/` no importa React, TanStack Query, Better Auth, ni nada externo
- [ ] `infrastructure/` implementa interfaces de `core/`, no las define
- [ ] `application/stores` solo tiene estado UI (filtros, tema, modales), no datos de API
- [ ] `features/` no importa de otras features
- [ ] TanStack Query se usa para server state; Zustand para client state
- [ ] Los adapters transforman DTO ↔ Entity en los boundaries
- [ ] Cada feature es lazy-loadable por ruta
- [ ] Better Auth corre en backend Express (+ cliente React)
- [ ] Los formularios usan React Hook Form + Zod + shadcn components
- [ ] `shared/ui/` solo tiene componentes shadcn y derivados, sin lógica de negocio
- [ ] Error Boundaries envuelven cada feature lazy-loadable (ver `docs/plans/react-patterns.md`)

## Documentos relacionados

| Documento | Contenido | Skill del agente |
|-----------|----------|-----------------|
| `component-design-patterns.md` | Container Pattern, SRP, composición | `notichilec-component-design` |
| `performance-patterns.md` | 4 estados, skeleton, lazy loading, optimistic UI | `notichilec-performance` |
| `testing-strategy.md` | Pirámide de testing, coverage, qué testear | `notichilec-testing-strategy` |
| `barrel-exports-convention.md` | Barrel exports, prohibición `export *` | `notichilec-barrels` |
| `react-patterns.md` | Error Boundaries, Custom Hooks, useEffect | `notichilec-react-patterns` |

> Cada doc tiene su skill correspondiente en `.agents/skills/` con reglas compactas para agentes AI. Los skills referencian los docs y los docs referencian los skills — todo conectado.
