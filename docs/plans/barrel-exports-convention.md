# Barrel Exports Convention — FrontNotiChileC

> Basado en "Guía para Estructurar un Proyecto con Barrel Exports" de Gentleman Programming.

## Regla de Oro

> Barrel sí, pero con criterio. No todo es barrel.

Un barrel (`index.ts`) solo cuando los módulos de una carpeta **siempre se usan juntos**. Si se usan por separado, el barrel es deuda técnica.

## Reglas Estrictas

### 1. NUNCA usar `export *`
```ts
// ❌ MAL
export * from './Button';
export * from './Alert';

// ✅ BIEN
export { Button } from './Button';
export { Alert } from './Alert';
```

`export *` mata tree-shaking. Siempre usar named re-exports explícitos.

### 2. Un barrel NO debe cruzar capas
No hacer barrel global de features. Cada feature tiene su propio barrel.

### 3. Mantener barrels al día
Al eliminar un módulo, limpiar su referencia del barrel.

## Árbol de Decisión

```
¿Los módulos se importan SIEMPRE juntos (3+ ocurrencias)?
  ├── Sí → ¿Más de 8 módulos?
  │   ├── Sí → Partir en sub-barrels lógicos
  │   └── No → Crear barrel con named re-exports
  └── No → NO crear barrel. Import directo con path alias.
```

## Candidatos en FrontNotiChileC

| Carpeta | ¿Barrel? |
|---------|----------|
| `src/core/entities/` | ✅ |
| `src/core/repositories/` | ✅ |
| `src/shared/lib/` | ✅ |
| `src/shared/ui/` | ❌ (se importan individualmente) |
| `features/X/components/` | ✅ |
| `features/` global | ❌ (mata lazy loading) |

---

## Conexiones

- **Skill del agente**: `notichilec-barrels` (`.agents/skills/notichilec-barrels/`) — reglas compactas para agentes AI
- **Design doc principal**: `docs/plans/2026-05-15-frontend-architecture-design.md`
- **Component Design**: `docs/plans/component-design-patterns.md` + skill `notichilec-component-design`
