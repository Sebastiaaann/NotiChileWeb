# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| sdd init, iniciar sdd, openspec init | sdd-init | C:/Users/elwax/.config/opencode/skills/sdd-init/SKILL.md |
| SDD verification phase, verify change | sdd-verify | C:/Users/elwax/.config/opencode/skills/sdd-verify/SKILL.md |
| Implement SDD tasks from specs | sdd-apply | C:/Users/elwax/.config/opencode/skills/sdd-apply/SKILL.md |
| Explore SDD ideas before committing | sdd-explore | C:/Users/elwax/.config/opencode/skills/sdd-explore/SKILL.md |
| Write SDD delta specs | sdd-spec | C:/Users/elwax/.config/opencode/skills/sdd-spec/SKILL.md |
| Create SDD change proposal | sdd-propose | C:/Users/elwax/.config/opencode/skills/sdd-propose/SKILL.md |
| Archive completed SDD change | sdd-archive | C:/Users/elwax/.config/opencode/skills/sdd-archive/SKILL.md |
| Create Gentle AI pull requests | branch-pr | C:/Users/elwax/.config/opencode/skills/branch-pr/SKILL.md |
| Break SDD change into tasks | sdd-tasks | C:/Users/elwax/.config/opencode/skills/sdd-tasks/SKILL.md |
| Create SDD technical design | sdd-design | C:/Users/elwax/.config/opencode/skills/sdd-design/SKILL.md |
| Create/update skill registry | skill-registry | C:/Users/elwax/.config/opencode/skills/skill-registry/SKILL.md |
| Create Gentle AI issues | issue-creation | C:/Users/elwax/.config/opencode/skills/issue-creation/SKILL.md |
| Go tests, coverage, teatest | go-testing | C:/Users/elwax/.config/opencode/skills/go-testing/SKILL.md |
| Judgment day, dual review | judgment-day | C:/Users/elwax/.config/opencode/skills/judgment-day/SKILL.md |
| Plan commits as work units | work-unit-commits | C:/Users/elwax/.config/opencode/skills/work-unit-commits/SKILL.md |
| Multi-step task planning | writing-plans | C:/Users/elwax/.config/opencode/skills/writing-plans/SKILL.md |
| Create/edit/verify skills | writing-skills | C:/Users/elwax/.config/opencode/skills/writing-skills/SKILL.md |
| Use git worktrees for isolation | using-git-worktrees | C:/Users/elwax/.config/opencode/skills/using-git-worktrees/SKILL.md |
| Verify before claiming complete | verification-before-completion | C:/Users/elwax/.config/opencode/skills/verification-before-completion/SKILL.md |
| TDD before implementation | test-driven-development | C:/Users/elwax/.config/opencode/skills/test-driven-development/SKILL.md |
| Systematic debugging | systematic-debugging | C:/Users/elwax/.config/opencode/skills/systematic-debugging/SKILL.md |
| Subagent-driven development | subagent-driven-development | C:/Users/elwax/.config/opencode/skills/subagent-driven-development/SKILL.md |
| Request code review | requesting-code-review | C:/Users/elwax/.config/opencode/skills/requesting-code-review/SKILL.md |
| Receive code review feedback | receiving-code-review | C:/Users/elwax/.config/opencode/skills/receiving-code-review/SKILL.md |
| Dispatch parallel agents | dispatching-parallel-agents | C:/Users/elwax/.config/opencode/skills/dispatching-parallel-agents/SKILL.md |
| Finish development branch | finishing-a-development-branch | C:/Users/elwax/.config/opencode/skills/finishing-a-development-branch/SKILL.md |
| Execute implementation plans | executing-plans | C:/Users/elwax/.config/opencode/skills/executing-plans/SKILL.md |
| Write collaboration comments | comment-writer | C:/Users/elwax/.config/opencode/skills/comment-writer/SKILL.md |
| Design docs to reduce cognitive load | cognitive-doc-design | C:/Users/elwax/.config/opencode/skills/cognitive-doc-design/SKILL.md |
| Split large PRs into chains | chained-pr | C:/Users/elwax/.config/opencode/skills/chained-pr/SKILL.md |
| Brainstorm before creative work | brainstorming | C:/Users/elwax/.config/opencode/skills/brainstorming/SKILL.md |

## Compact Rules

### sdd-init
- Run when user asks to initialize SDD in a project
- Detect real stack, conventions, architecture, testing tools from actual files (package.json, configs)
- In `engram` mode: save context and capabilities to Engram only, do NOT create openspec/
- Always persist testing capabilities separately as `sdd/{project}/testing-capabilities`
- Always build `.atl/skill-registry.md`
- Use `capture_prompt: false` for automated SDD config saves
- Return structured result: status, executive_summary, artifacts, next_recommended, risks

### sdd-apply
- Implement tasks from spec + design artifacts
- Read apply-progress for continuity on continuation batches
- Follow Strict TDD mode if active (check sdd-init result)
- Use work-unit commits for reviewable chunks
- Respect delivery_strategy and chain_strategy from orchestrator
- Save apply-progress after each batch

### sdd-verify
- Execute tests and prove implementation matches specs, design, and tasks
- Report CRITICAL / WARNING / SUGGESTION levels
- Run test command from testing-capabilities if Strict TDD active
- Compare actual behavior against spec scenarios

### test-driven-development
- Write tests BEFORE implementation code
- Follow testing pyramid: Unit (60-70%), Integration (20-30%), E2E (5-10%)
- Use Vitest for core/ utils, Testing Library for components/containers
- Test 4 states for data components: loading, empty, error, success
- Do NOT test third-party libs (shadcn/ui, TanStack Query, Better Auth)

### branch-pr
- Create issues FIRST, then link PR to issue
- Use conventional commits in PR title
- Include summary, what changed, testing notes in PR body
- Request review from maintainers after creation

### work-unit-commits
- Each commit = one reviewable unit of work
- Include tests + docs with code in same commit
- Write meaningful commit messages (why, not just what)
- Keep commits small enough for single-concept review

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| AGENTS.md | D:/Expo movil/FrontNotiChileC/AGENTS.md | Index — references docs below |
| Architecture Design | docs/plans/2026-05-15-frontend-architecture-design.md | Full architecture guide |
| Component Patterns | docs/plans/component-design-patterns.md | Container pattern, composition |
| Testing Strategy | docs/plans/testing-strategy.md | Testing pyramid, tools |
| Performance Patterns | docs/plans/performance-patterns.md | Lazy loading, 4 states, optimistic UI |
| Barrel Exports | docs/plans/barrel-exports-convention.md | Barrel export rules |
| React Patterns | docs/plans/react-patterns.md | Error boundaries, hooks, useEffect |

### AGENTS.md Key Rules (auto-resolved)

**Dependency Direction (STRICT)**:
```
core/ ← infrastructure/ ← application/ ← features/ ← shared/
(nada)  (solo core)     (core + infra)   (core + shared + app)  (solo core)
```
- `features/` NUNCA importa de otras features. Cada feature es autocontenida.

**Import Order**:
1. React
2. Third-party libraries
3. Internal aliases (core → infrastructure → application → features → shared)
4. Relative imports (siblings only)

**Component Structure**:
- Hooks first
- Event handlers
- Render

**Barrel Exports**:
- ✅ `export { Button } from "./Button";` (explicit named)
- ❌ `export * from "./Button";` (kills tree-shaking)
- Only barrel when modules are ALWAYS used together (3+ occurrences)

**State Management Decision Tree**:
1. ¿Solo este componente? → useState
2. ¿Componentes hermanos? → Lift state up
3. ¿Componentes lejanos? → Zustand store
4. ¿Datos de API? → TanStack Query
5. ¿URL state? → React Router searchParams
6. ¿Form values? → React Hook Form + Zod

**Naming Conventions**:
- Components: PascalCase (`FeedContainer`)
- Files: PascalCase (components), camelCase (utils)
- Functions: camelCase (`formatMonto`, `handleClick`)
- Constants: UPPER_SNAKE_CASE (`API_URL`)
- Stores/Hooks: camelCase with prefix (`useAuthStore`)

**Container Pattern** (Feed Container Example):
```tsx
export function FeedContainer() {
  const filters = useFilterStore();
  const { data, isLoading, error } = useFeed(filters);
  
  if (isLoading) return <FeedSkeleton />;
  if (error) return <FeedError />;
  if (!data) return <FeedEmpty />;
  
  return <FeedTable data={data} />;
}
```

**Anti-Patterns to Avoid**:
- ❌ Importing `features/` from another feature
- ❌ Using `export *` in barrels
- ❌ Mixing concerns (fetch + render + events in one component)
- ❌ Prop drilling through 3+ levels
- ❌ useEffect for derived state
- ❌ Core layer importing React or external libs

---

Read the convention files listed above for project-specific patterns and rules. All referenced paths have been extracted — no need to read index files to discover more.
