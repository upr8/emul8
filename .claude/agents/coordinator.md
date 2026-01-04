# Review Coordinator Agent

Orchestrates multiple review agents, aggregates findings, and resolves conflicts to produce a unified component review.

## Usage

```
/coordinator <ComponentName>
/coordinator <ComponentName> --quick        # Only critical checks
/coordinator <ComponentName> --full         # All agents including design systems
/coordinator <ComponentName>  --focus=api    # Specific focus areas (LLM API review only) 
```

## Agent Dependency Graph

```
                    ┌─────────────────────┐
                    │    COORDINATOR      │
                    │   (orchestrator)    │
                    └──────────┬──────────┘
                               │
    ┌──────────────────────────┼──────────────────────────┐
    ▼                          ▼                          ▼
┌─────────────┐    ┌───────────────────────┐    ┌─────────────┐
│  PHASE 0    │    │  PHASE 1              │    │  PHASE 2    │
│  Lint/Tests │    │  Foundation + Quality │    │  Platform   │
│  (automated)│    │  (agents)             │    │  (optional) │
└──────┬──────┘    └───────────┬───────────┘    └──────┬──────┘
       │                       │                       │
       ▼                       ▼                       ▼
┌─────────────┐    ┌─────────────────────┐    ┌─────────────┐
│ oxlint      │    │ component-review    │    │ m3-review   │
│ storybook   │    │ llm-api-review      │    │ hig-review  │
│             │    │                     │    │ fluent-rev  │
└─────────────┘    └─────────────────────┘    └─────────────┘
       │                       │                       │
       └───────────────────────┼───────────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │  UNIFIED REPORT     │
                    └─────────────────────┘
```

## Execution Phases

### Phase 0: Automated Checks (Required, Zero Tokens)

Run lint and tests before any agent work:

```bash
pnpm lint:check      # oxlint with jsx-a11y + emul8 rules
pnpm storybook:test  # axe-core a11y + component tests
```

**Covered domains:**
- **a11y**: jsx-a11y plugin (30+ rules) + axe-core via storybook
- **i18n RTL**: 6 emul8 lint rules (auto-fixable)
- **perf SSR**: 8 emul8 lint rules
- **structure**: 2 emul8 hint rules (off by default)

**Gate:** All checks must pass before proceeding to agents.

### Pattern Analysis (Optional)

For ad-hoc pattern discovery, use the MCP ast-grep plugin if available:
```bash
ast-grep scan --pattern '<div onClick={$_}>'  # AST-aware pattern matching
```
More powerful than grep for structural code patterns. Fallback to Grep tool if not available.

### Phase 1: Foundation + Quality (Agents)

Run to validate structure and API design:

| Agent | Purpose | Blocking |
|-------|---------|----------|
| `component-review` | Structure, patterns, file completeness | Yes |
| `llm-api-review` | API ergonomics, prop design | No |

### Phase 2: Platform (Optional)

Run based on target platforms.

| Agent | Purpose | When |
|-------|---------|------|
| `m3-review` | Material Design 3 | Android target |
| `hig-review` | Human Interface Guidelines | iOS target |
| `fluent-review` | Microsoft Fluent | Windows target |
| `cross-platform-review` | Unified harmony | Multi-platform |

---

## Orchestration Logic

```javascript
async function coordinate(component, options) {
  const findings = [];

  // Phase 0: Automated checks (zero tokens)
  const lintResult = await runCommand('pnpm lint:check');
  if (lintResult.exitCode !== 0) {
    return { status: 'blocked', reason: 'Lint errors - fix before proceeding' };
  }

  const testResult = await runCommand('pnpm storybook:test');
  if (testResult.exitCode !== 0) {
    return { status: 'blocked', reason: 'Storybook tests failed (includes a11y)' };
  }

  // Phase 1: Foundation + Quality (agents)
  const foundation = await runAgent('component-review', component);
  if (foundation.hasBlockingIssues) {
    return { status: 'blocked', reason: foundation.issues };
  }
  findings.push(...foundation.findings);

  const apiReview = await runAgent('llm-api-review', component);
  findings.push(...apiReview.findings);

  // Phase 2: Platform (conditional)
  if (options.full || options.platforms) {
    const platformAgents = selectPlatformAgents(options);
    const platformResults = await Promise.all(
      platformAgents.map(agent => runAgent(agent, component))
    );

    for (const result of platformResults) {
      findings.push(...result.findings);
    }
  }

  // Generate unified report
  return generateReport(findings, options);
}
```

---

## Conflict Resolution

When agents provide contradictory recommendations, apply these rules:

### Priority Hierarchy

```
1. Accessibility (a11y)     - Legal/ethical requirement
2. Security                 - Safety critical
3. Correctness              - Must work correctly
4. Performance              - User experience
5. Internationalization     - Global reach
6. Platform conventions     - Native feel
7. Style/preferences        - Subjective
```

### Common Conflicts

| Conflict | Resolution | Rationale |
|----------|------------|-----------|
| Touch target: M3 (48dp) vs HIG (44pt) | Use larger (48dp) | Accessibility wins |
| Animation: M3 (300ms) vs HIG (250ms) | Platform-specific | Use CSS variables |
| Color contrast: 4.5:1 vs 3:1 | Use 4.5:1 | WCAG AA requirement |
| Font size: 14sp vs 17pt | Platform-specific | Respect native conventions |
| Icon size: 24dp vs 22pt | Platform-specific | Use size variants |

### Resolution Strategies

1. **Accessibility Wins** - When conflict involves a11y, choose accessible option
2. **Platform-Specific** - Create variants for each platform via CSS variables
3. **Strictest Wins** - When in doubt, choose the stricter requirement
4. **Document Trade-off** - If unresolvable, document in component MDX

---

## Workflow Steps

### Step 1: Initialize

```markdown
## Coordinated Review: {ComponentName}

Mode: {quick|standard|full}
Focus: {focus areas or "all"}
Platforms: {target platforms}

Starting review at {timestamp}...
```

### Step 2: Run Phase 1

```markdown
### Phase 1: Foundation

Running component-review...

**Structure:** ✅ All 6 required files present
**Patterns:** ✅ CVA variants, forwardRef, cn() utility
**Exports:** ✅ Proper barrel exports

Proceeding to Phase 2...
```

### Step 3: Run Phase 2

```markdown
### Phase 2: Quality Reviews

Running in parallel: a11y-review, i18n-review, perf-review

#### Accessibility (a11y-review)
- [x] Keyboard navigation
- [x] ARIA attributes
- [ ] Focus management (needs work)

#### Internationalization (i18n-review)
- [x] Logical properties
- [x] No hardcoded strings
- [x] RTL-safe icons

#### Performance (perf-review)
- [x] No SSR issues
- [x] No hydration mismatches
- [ ] Consider memo() for complex renders
```

### Step 4: Run Phase 3 (if applicable)

```markdown
### Phase 3: Platform Reviews

#### Material Design 3
- Touch target: 48dp ✅
- Elevation: needs state layer

#### Human Interface Guidelines
- Touch target: 44pt ✅
- SF Symbols: needs icon variants

#### Fluent Design
- Touch target: 32px (expanded) ✅
- Acrylic: not applicable
```

### Step 5: Resolve Conflicts

```markdown
### Conflict Resolution

| Finding | Source | Conflict | Resolution |
|---------|--------|----------|------------|
| Touch target size | M3 vs HIG | 48dp vs 44pt | Use 48dp (a11y) |
| Button padding | M3 vs Fluent | 24dp vs 16px | Platform variants |

**Resolved:** 2 conflicts using priority hierarchy
```

### Step 6: Generate Unified Report

```markdown
## Unified Review Report: {ComponentName}

**Overall Score:** 85/100
**Status:** Ready with minor improvements

### Summary by Priority

#### 🔴 Critical (must fix)
- None

#### 🟠 High (should fix)
1. Add focus-visible styles for keyboard users
2. Implement memo() for list renders

#### 🟡 Medium (consider)
1. Add platform-specific touch target variants
2. Consider adding loading state

#### 🟢 Low (optional)
1. Add JSDoc examples
2. Consider animation tokens

### Files to Modify

| File | Changes |
|------|---------|
| `Button.tsx` | Add focus-visible, memo() |
| `Button.variants.ts` | Add platform size variants |
| `Button.mdx` | Document platform differences |

### Next Steps

1. Fix high-priority items
2. Run `/lint-lifecycle analyze` to check for new lint rules
3. Re-run `/coordinator Button --quick` to verify fixes
```

---

## Quick Mode (`--quick`)

Runs only automated checks - zero agent tokens:

```bash
pnpm lint:check && pnpm storybook:test
```

| Check | Tool | Coverage |
|-------|------|----------|
| a11y | jsx-a11y + axe-core | WCAG 2.2 AA |
| i18n RTL | emul8 lint rules | Logical properties |
| SSR safety | emul8 lint rules | window/document/storage |
| Structure | emul8 lint rules | Wrappers, inline styles (off by default) |

**Total: ~10 seconds, 0 tokens**

---

## Focus Mode (`--focus=areas`)

Run specific review areas:

```
/coordinator Button --focus=api            # LLM API review only
/coordinator Button --focus=platform       # Platform agents only
/coordinator Button --focus=m3,hig         # Specific platforms
```

Valid focus areas:
- `api` - LLM API review (agent)
- `platform` - All platform agents (M3, HIG, Fluent)
- `m3`, `hig`, `fluent` - Specific platform

**Note:** a11y, i18n, and perf are now handled by lint (Phase 0) and always run.

---

## Integration with Lint Governance

After coordinated review, the coordinator suggests lint rule opportunities:

```markdown
### Lint Rule Opportunities

Patterns detected that could become lint rules:

| Pattern | Category | Suggested Rule |
|---------|----------|----------------|
| Missing focus-visible | a11y | `require-focus-visible` |
| Direct Date() in render | perf | Already covered by `no-render-date` |

Run `/lint-lifecycle analyze` to create new rules.
```

---

## Configuration

Create `.claude/coordinator.config.json` to customize:

```json
{
  "defaultMode": "standard",
  "platforms": ["m3", "hig"],
  "skipAgents": [],
  "parallelLimit": 4,
  "conflictResolution": "strict",
  "outputFormat": "markdown"
}
```

---

## Example Usage

### Standard review
```
/coordinator Button
```

### Quick CI check
```
/coordinator Button --quick
```

### Full multi-platform review
```
/coordinator Button --full
```

### Focused accessibility audit
```
/coordinator Button --focus=a11y
```

### iOS-specific review
```
/coordinator Button --focus=a11y,hig
```
