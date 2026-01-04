# Architecture Review Agent

## Purpose

Validate overall project architecture, dependency flow, and structural consistency.

## Usage

```
/arch-review
/architecture-review
```

## Validation Process

### Step 1: Run Automated Validators

Execute and analyze:

```bash
pnpm validate:imports    # dependency-cruiser
pnpm validate:structure  # structure validator
pnpm lint:check          # oxlint
```

### Step 2: Component Inventory

Generate inventory by layer:

| Layer | Components | Status |
|-------|------------|--------|
| layouts/ | Box, ... | Complete/Incomplete |
| atoms/ | Button, ... | Complete/Incomplete |
| molecules/ | (future) | - |
| organisms/ | (future) | - |
| templates/ | (future) | - |

### Step 3: Dependency Analysis

Check for:

- [ ] No circular dependencies
- [ ] No upward imports (atom importing molecule)
- [ ] No cross-layer imports (atom A importing atom B)
- [ ] All external dependencies are justified

### Step 4: Export Consistency

Verify:

- [ ] `src/index.ts` exports all public components
- [ ] Each component folder has `index.ts` with proper exports
- [ ] Types are exported with `export type`
- [ ] Variants are exported for consumer use

### Step 5: Utility Consistency

Check `src/utils/`:

- [ ] All utilities are pure functions
- [ ] No React components in utils
- [ ] Proper TypeScript exports
- [ ] `cn()` utility present and working
- [ ] `Slot` re-exported from Radix

### Step 6: Style Consistency

Verify styling patterns:

- [ ] All variants use CVA
- [ ] No inline styles in components
- [ ] Tailwind classes follow theme tokens
- [ ] `globals.css` has proper `@theme` tokens

### Step 7: Build Output

Check library output:

- [ ] ESM builds to `dist/index.js`
- [ ] CJS builds to `dist/index.cjs`
- [ ] Types generate to `dist/index.d.ts`
- [ ] Styles copy to `dist/styles/globals.css`

## Health Score Calculation

| Category | Weight | Score |
|----------|--------|-------|
| Import hierarchy | 25% | 0-100 |
| Component structure | 25% | 0-100 |
| Export consistency | 15% | 0-100 |
| Type safety | 15% | 0-100 |
| Documentation | 10% | 0-100 |
| Test coverage | 10% | 0-100 |

**Overall Score:** Weighted average

## Output Format

```markdown
## Architecture Review

### Health Score: XX/100

### Executive Summary
Brief overview of the architecture state.

### Metrics
- Components: X total (Y layouts, Z atoms, ...)
- Dependencies: X internal, Y external
- Import violations: X errors, Y warnings
- Structure violations: X components incomplete

### Critical Issues
1. Issue description with file paths

### Warnings
1. Warning description

### Recommendations
1. Actionable improvement suggestion

### Dependency Graph
Run `pnpm validate:imports:graph` to generate visual graph.
```

## Import Hierarchy Reference

```
templates/  → organisms/ → molecules/ → atoms/ → layouts/ → utils/
     │             │            │          │          │
     └─────────────┴────────────┴──────────┴──────────┘
                    (can import from lower levels)
```

**Allowed Imports:**

| From | Can Import |
|------|-----------|
| utils/ | External packages only |
| layouts/ | utils/, external |
| atoms/ | layouts/, utils/, external |
| molecules/ | atoms/, layouts/, utils/, external |
| organisms/ | molecules/, atoms/, layouts/, utils/, external |
| templates/ | All internal layers, external |
