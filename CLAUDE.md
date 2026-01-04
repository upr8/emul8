# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Emul8 is a React UI component library that emulates native design systems. Built with Vite, Tailwind CSS v4, and Storybook.

## Commands

```bash
# Storybook
pnpm storybook        # Start Storybook dev server (port 6006)
pnpm storybook:test   # Run all story tests with strict a11y (via vitest + axe-core)

# Build
pnpm build            # Build library to dist/ (ESM + CJS)
pnpm storybook:build  # Build static Storybook

# Code quality
pnpm lint:check       # Run oxlint (includes custom emul8 rules)
pnpm lint:fix         # Run oxlint with auto-fix
pnpm format:check     # Run Biome check
pnpm format:fix       # Run Biome with auto-fix

# Testing
pnpm unit             # Run unit tests
pnpm unit:coverage    # Run unit tests with coverage

# Validation
pnpm validate:structure # Check component file structure

# Lint governance
pnpm lint:scaffold      # Scaffold new lint rule
pnpm lint:governance    # Generate governance report
pnpm lint:audit         # Audit all lint rules
```

## Architecture

### Atomic Design Structure

Components follow atomic design methodology with strict dependency rules:

```
src/
├── layouts/    # Pure structural primitives (no colors/appearance)
├── atoms/      # Indivisible UI primitives (Button, Input, etc.)
├── molecules/  # Atom compositions (Card, FormField, etc.) [future]
├── organisms/  # Complex sections with logic [future]
├── templates/  # Page-level layouts [future]
├── styles/     # Global CSS (Tailwind theme)
└── utils/      # Shared utilities (cn, Slot)
```

**Dependency hierarchy:** Templates → Organisms → Molecules → Atoms → Layouts → Utils

### Component Structure

Each component follows this file pattern:
```
ComponentName/
├── ComponentName.tsx        # Component implementation
├── ComponentName.types.ts   # TypeScript interfaces
├── ComponentName.variants.ts # CVA variant definitions
├── ComponentName.stories.tsx # Storybook stories
├── ComponentName.mdx        # Documentation
└── index.ts                 # Exports
```

### Key Patterns

- **CVA (class-variance-authority)** for variant-based styling
- **Radix Slot** for `asChild` prop pattern (polymorphic components)
- **`cn()` utility** for merging Tailwind classes with conflict resolution
- **Tailwind v4** with `@theme` directive for design tokens in `globals.css`

## Commit Convention

Uses Conventional Commits with these scopes: `components`, `core`, `ios`, `android`, `web`, `docs`, `deps`

```
feat(components): add new Button variant
fix(core): resolve className merge issue
```

## Library Output

- ESM: `dist/index.js`
- CJS: `dist/index.cjs`
- Types: `dist/index.d.ts`
- Styles: `dist/styles/globals.css`

Consumers import styles separately: `import 'emul8/styles'`

## Quality Enforcement

### Automated Validation

The following validations run on every commit via Husky pre-commit hook:

| Validator | Tool | Command |
|-----------|------|---------|
| Code quality + a11y + i18n + perf | oxlint + jsx-a11y + emul8 plugin | `pnpm lint:check` |
| Component structure | Custom script | `pnpm validate:structure` |
| Unit tests | Vitest | `pnpm unit` |
| Story tests + axe-core a11y | Storybook + Vitest | `pnpm storybook:test` |

**Zero-token checks** cover: WCAG 2.2 a11y, RTL i18n, SSR safety, hydration

### Custom Lint Rules (emul8 plugin)

Located in `oxlint-plugins/emul8-lint-plugin/`, these rules enforce project conventions:

| Category | Rules | Purpose |
|----------|-------|---------|
| a11y | `no-div-onclick`, `no-span-onclick`, `no-positive-tabindex` | Accessibility patterns |
| i18n | `no-physical-margin/padding/position/text-align/border/rounded` | RTL support (auto-fixable) |
| perf | `no-direct-window/document/storage`, `no-layout-effect`, `no-render-random/date`, `no-deep-nesting`, `no-full-lodash`, `no-inline-style-object` | SSR safety |
| structure | `no-unnecessary-wrapper` | DOM efficiency hints (off by default) |
| imports | `atomic-hierarchy` | Atomic design layer enforcement |

### Import Hierarchy Rules

Components must follow strict import rules based on atomic design:

| Layer | Can Import From |
|-------|-----------------|
| `utils/` | External packages only |
| `layouts/` | `utils/`, external |
| `atoms/` | `layouts/`, `utils/`, external |
| `molecules/` | `atoms/`, `layouts/`, `utils/`, external |
| `organisms/` | `molecules/`, `atoms/`, `layouts/`, `utils/`, external |
| `templates/` | All internal layers, external |

**Forbidden patterns:**
- Importing from same atomic level (e.g., atom importing atom)
- Importing from higher level (e.g., atom importing molecule)
- Circular dependencies

### Required Component Files

Every component must have these 6 files:

1. `{Name}.tsx` - Component implementation with forwardRef
2. `{Name}.types.ts` - Props interface with JSDoc
3. `{Name}.variants.ts` - CVA variant definitions
4. `{Name}.stories.tsx` - Storybook stories
5. `{Name}.mdx` - Documentation
6. `index.ts` - Exports

## Claude Code Agents

### Coordinator Agent (Orchestrator)

The coordinator orchestrates review agents with a lint-first approach:

```
/coordinator Button              # Standard review (lint + agents)
/coordinator Button --quick      # Zero-token: lint + storybook tests only (~10s)
/coordinator Button --full       # All agents including platform
/coordinator Button --focus=api  # Specific focus areas
```

**Execution Phases:**
1. **Phase 0 (Automated)** - `pnpm lint:check && pnpm storybook:test` (zero tokens)
2. **Phase 1 (Agents)** - component-review, llm-api-review
3. **Phase 2 (Platform)** - M3, HIG, Fluent reviews (optional)
4. **Report** - Unified findings with priorities

**Note:** a11y, i18n RTL, and perf SSR checks are now handled by lint (Phase 0) and always run.

### General Review Agents

| Agent | Command | Purpose |
|-------|---------|---------|
| **Coordinator** | `/coordinator Button` | **Orchestrates all agents, resolves conflicts** |
| Component Review | `/component-review Button` | Comprehensive quality checklist |
| Architecture Review | `/arch-review` | Validate project structure |

### Specialized Review Agents

| Agent | Command | Purpose |
|-------|---------|---------|
| LLM API Review | `/llm-api-review Button` | Token efficiency, prop naming, anti-hallucination |
| Cross-Platform | `/cross-platform-review Button` | Unified M3/HIG/Fluent harmony |

**Removed (now covered by lint):**
- ~~a11y-review~~ → jsx-a11y plugin + storybook addon-a11y
- ~~i18n-review~~ → emul8 RTL lint rules (auto-fixable)
- ~~perf-review~~ → emul8 SSR safety lint rules

### Design System Agents

| Agent | Command | Platform |
|-------|---------|----------|
| M3 Review | `/m3-review Button` | Material Design 3 (Android) |
| HIG Review | `/hig-review Button` | Human Interface Guidelines (iOS) |
| Fluent Review | `/fluent-review Button` | Microsoft Fluent (Windows) |

These agents validate components against platform-specific design tokens and generate CVA variants, CSS variables, and Storybook stories.

### Agent Workflow

**Quick check (zero tokens):**
```bash
pnpm pre-commit  # Runs all automated checks
```

**Standard review:**
```
/coordinator Button
```

**Full review with platform agents:**
```
/coordinator Button --full
```

### Conflict Resolution

When agents provide contradictory recommendations, the coordinator applies a priority hierarchy:

| Priority | Category | Rationale |
|----------|----------|-----------|
| 1 | Accessibility | Legal/ethical requirement |
| 2 | Correctness | Must work correctly |
| 3 | Performance | User experience |
| 4 | i18n | Global reach |
| 5 | Platform | Native conventions |
| 6 | Style | Subjective |

Common conflicts (e.g., M3 48dp vs HIG 44pt touch targets) are resolved automatically using rules in `conflicts.json`.

### Agent Files

Located in `.claude/agents/`:

**Orchestration:**
- `coordinator.md` - Orchestrates agents with lint-first workflow
- `conflicts.json` - Conflict resolution rules and priority hierarchy

**General:**
- `component-review.md` - Quality checklist with quick checks
- `architecture-review.md` - Architecture validation

**Specialized:**
- `llm-api-review.md` - LLM-friendly API design
- `cross-platform-review.md` - Platform harmony

**Design Systems:**
- `m3-review.md` - Material Design 3 specs + code generation
- `hig-review.md` - Apple HIG specs + code generation
- `fluent-review.md` - Microsoft Fluent specs + code generation

**Lint Governance:**
- `lint-lifecycle.md` - Full lifecycle: pattern detection → rule generation → testing → deployment
- `lint-governance.md` - Rule audit, promotion, deprecation, and severity management

### Lint Rule Skill

| Skill | Command | Purpose |
|-------|---------|---------|
| Lint Rule | `/lint-rule` | Interactive wizard for creating new lint rules |

Located in `.claude/skills/lint-rule.md`

### Lint Governance Workflow

The lint system has a positive feedback loop from agents to automated enforcement:

```
Review Agents → Pattern Detection → Rule Generation → Testing → Deployment
      ↑                                                              ↓
      └──────────────── Governance & Reporting ←─────────────────────┘
```

**Already converted to lint:** a11y, i18n RTL, perf SSR (18 rules)

| Command | Description |
|---------|-------------|
| `/lint-lifecycle analyze` | Scan review agents for automatable patterns |
| `/lint-lifecycle generate <name>` | Generate a new lint rule from template |
| `/lint-lifecycle test <name>` | Run tests for a rule |
| `/lint-lifecycle deploy <name>` | Add rule to oxlint.json |
| `/lint-rule` | Interactive rule creation wizard |
| `/lint-governance audit` | Full audit of all rules |
| `/lint-governance promote <rule>` | Promote experimental → active |
| `/lint-governance deprecate <rule>` | Start deprecation workflow |
| `/lint-governance report` | Generate governance report |

### Lint Rule Metadata

Rule metadata is tracked in `oxlint-plugins/emul8-lint-plugin/metadata/registry.json`:

```json
{
  "rules": {
    "no-div-onclick": {
      "name": "no-div-onclick",
      "category": "a11y",
      "status": "active",           // active | experimental | deprecated
      "linkedPatterns": ["a11y-review:interactive-elements:div-onclick"],
      "effectiveness": {
        "violations30d": 0,
        "fixRate": 1.0,
        "falsePositiveRate": 0.0
      }
    }
  }
}
```

### Lint Rule Templates

Four templates for different detection patterns:

| Template | Use Case | Location |
|----------|----------|----------|
| `jsx-attribute` | JSX element + attribute checks | `rules/_templates/jsx-attribute.js.template` |
| `string-pattern` | Tailwind class patterns (auto-fixable) | `rules/_templates/string-pattern.js.template` |
| `import-analysis` | Import hierarchy validation | `rules/_templates/import-analysis.js.template` |
| `call-expression` | Function/hook call detection | `rules/_templates/call-expression.js.template` |

