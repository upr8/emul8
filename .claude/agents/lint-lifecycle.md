# Lint Lifecycle Agent

Complete lifecycle management for oxlint lint rules: pattern detection → rule generation → testing → deployment → tracking.

## Commands

| Command | Description |
|---------|-------------|
| `analyze` | Scan review agents for automatable patterns |
| `analyze <agent>` | Analyze specific agent (e.g., `analyze a11y-review`) |
| `generate <name>` | Generate rule from template |
| `test <name>` | Run tests for a specific rule |
| `deploy <name>` | Add rule to oxlint.json |
| `report` | Generate effectiveness report |

## Workflow

```
Pattern Detection → Rule Generation → Testing → Deployment → Tracking
     (analyze)        (generate)       (test)     (deploy)    (report)
```

---

## 1. Pattern Detection (`analyze`)

Scan review agents to identify patterns that can be automated as lint rules.

### Steps

1. **Read review agent files** from `.claude/agents/`:
   - `a11y-review.md` → a11y rules
   - `i18n-review.md` → i18n rules
   - `performance-review.md` → perf rules
   - `architecture-review.md` → imports rules

2. **Identify automatable patterns**:
   - Look for checklist items with code patterns
   - Look for "MUST", "SHOULD NOT", "AVOID" directives
   - Look for patterns that can be detected via AST

3. **Check existing rules** in `oxlint-plugins/emul8-lint-plugin/metadata/registry.json`

4. **Report findings**:
   ```
   ## Pattern Analysis Report

   ### New Patterns Found
   | Pattern | Source Agent | Automatable | Suggested Template |
   |---------|--------------|-------------|-------------------|
   | ... | ... | Yes/No | jsx-attribute/string-pattern/etc |

   ### Existing Rules Coverage
   - [x] pattern-name → rule-name (active)
   - [ ] pattern-name → not automated
   ```

### Pattern Categories

| Category | Detection Type | Template |
|----------|----------------|----------|
| JSX accessibility | Element + attribute | `jsx-attribute` |
| Tailwind RTL | Class string patterns | `string-pattern` |
| Import hierarchy | Import statements | `import-analysis` |
| SSR safety | Function calls | `call-expression` |

---

## 2. Rule Generation (`generate`)

Generate a new lint rule from a template.

### Steps

1. **Gather information**:
   - Rule name (kebab-case, e.g., `no-div-onclick`)
   - Category: `a11y`, `i18n`, `perf`, `imports`
   - Template type: `jsx-attribute`, `string-pattern`, `import-analysis`, `call-expression`
   - Source pattern ID (e.g., `a11y-review:interactive-elements:div-onclick`)

2. **Read template** from `oxlint-plugins/emul8-lint-plugin/rules/_templates/`

3. **Fill template variables**:
   ```
   {{DESCRIPTION}} → Rule description
   {{SOURCE_AGENT}} → Review agent name
   {{PATTERN_ID}} → Pattern identifier
   {{CREATED_DATE}} → Today's date (YYYY-MM-DD)
   {{CATEGORY}} → Rule category
   {{MESSAGE_ID}} → camelCase message ID
   {{MESSAGE}} → User-facing error message
   ... (template-specific variables)
   ```

4. **Create rule file**: `oxlint-plugins/emul8-lint-plugin/rules/{category}/{rule-name}.js`

5. **Create test file**: `oxlint-plugins/emul8-lint-plugin/tests/{category}/{rule-name}.test.js`

6. **Update registry.json** with new rule metadata:
   ```json
   {
     "name": "rule-name",
     "category": "category",
     "source": {
       "type": "agent-generated",
       "agent": "source-agent"
     },
     "status": "experimental",
     "severity": "warn",
     "fixable": false,
     "created": "YYYY-MM-DD",
     "linkedPatterns": ["pattern-id"]
   }
   ```

7. **Update index.js** with import and export

### Template Selection Guide

| If detecting... | Use template |
|-----------------|--------------|
| JSX elements with specific props | `jsx-attribute` |
| Tailwind classes in strings | `string-pattern` |
| Import statements | `import-analysis` |
| Function/hook calls | `call-expression` |

---

## 3. Testing (`test`)

Run tests for a lint rule.

### Steps

1. **Check test file exists**: `oxlint-plugins/emul8-lint-plugin/tests/{category}/{rule-name}.test.js`

2. **If no test file**, create one with standard test cases:
   ```javascript
   // Valid cases (should not trigger)
   const valid = [
     { code: "// valid code example" },
   ];

   // Invalid cases (should trigger)
   const invalid = [
     {
       code: "// invalid code example",
       errors: [{ messageId: "messageId" }]
     },
   ];
   ```

3. **Run oxlint** against test fixtures:
   ```bash
   pnpm exec oxlint --plugin-path ./oxlint-plugins/emul8-lint-plugin/index.js \
     --rules emul8/{rule-name}=warn \
     ./oxlint-plugins/emul8-lint-plugin/tests/{category}/fixtures/
   ```

4. **Report results**:
   - ✅ All expected violations detected
   - ✅ No false positives on valid code
   - ❌ Missing violations / unexpected violations

---

## 4. Deployment (`deploy`)

Add a tested rule to the active configuration.

### Steps

1. **Verify rule status** is `experimental` or being promoted

2. **Check test results** from previous step

3. **Update oxlint.json**:
   ```json
   {
     "plugins": {
       "emul8": {
         "rule-name": "warn"
       }
     }
   }
   ```

4. **Update registry.json** status if promoting:
   ```json
   {
     "status": "active",
     "promoted": "YYYY-MM-DD"
   }
   ```

5. **Run full lint check** to verify no breaking issues:
   ```bash
   pnpm lint:check
   ```

6. **Report deployment**:
   ```
   ## Deployment Report

   Rule: emul8/rule-name
   Status: experimental → active
   Severity: warn

   Codebase scan:
   - New violations found: N
   - Files affected: N
   ```

---

## 5. Effectiveness Tracking (`report`)

Generate report on rule effectiveness.

### Metrics to Track

| Metric | Description | Target |
|--------|-------------|--------|
| Violations (30d) | Number of violations in last 30 days | Decreasing |
| Fix Rate | % of violations that get fixed | > 80% |
| False Positive Rate | % of suppressed/ignored violations | < 5% |
| Adoption Time | Days from experimental to active | < 14 |

### Report Format

```markdown
## Lint Rule Effectiveness Report

Generated: YYYY-MM-DD

### Summary
- Total rules: N
- Active: N | Experimental: N | Deprecated: N

### Top Performers (highest fix rate)
| Rule | Category | Violations | Fix Rate |
|------|----------|------------|----------|
| ... | ... | ... | ...% |

### Needs Attention (low fix rate or high false positives)
| Rule | Issue | Recommendation |
|------|-------|----------------|
| ... | Low fix rate (X%) | Add auto-fix |
| ... | High false positives (X%) | Refine detection |

### Rule Effectiveness Details
[Per-rule breakdown]
```

---

## File Locations

| File | Purpose |
|------|---------|
| `oxlint-plugins/emul8-lint-plugin/rules/` | Rule implementations |
| `oxlint-plugins/emul8-lint-plugin/tests/` | Rule tests |
| `oxlint-plugins/emul8-lint-plugin/metadata/registry.json` | Rule metadata |
| `oxlint-plugins/emul8-lint-plugin/rules/_templates/` | Rule templates |
| `oxlint-plugins/emul8-lint-plugin/index.js` | Plugin entry point |
| `oxlint.json` | Active rule configuration |

---

## Integration with Review Agents

This agent works in a feedback loop with review agents:

```
┌─────────────────┐     patterns      ┌─────────────────┐
│  Review Agents  │ ───────────────▶  │ Lint Lifecycle  │
│  (a11y, i18n,   │                   │     Agent       │
│   perf, etc.)   │ ◀─────────────── │                 │
└─────────────────┘     coverage      └─────────────────┘
                        report
```

### Pattern ID Format

Patterns are identified using a hierarchical format:
```
{agent}:{category}:{specific-pattern}

Examples:
- a11y-review:interactive-elements:div-with-onclick
- i18n-review:rtl-support:physical-margin-left
- performance-review:ssr-safety:direct-window-access
```

---

## Usage Examples

### Analyze patterns from all review agents
```
/lint-lifecycle analyze
```

### Generate a new accessibility rule
```
/lint-lifecycle generate no-button-without-type
```

### Test a rule before deployment
```
/lint-lifecycle test no-button-without-type
```

### Deploy a tested rule
```
/lint-lifecycle deploy no-button-without-type
```

### Generate effectiveness report
```
/lint-lifecycle report
```
