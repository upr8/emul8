# Lint Governance Agent

Rule auditing, severity management, and deprecation workflows for oxlint lint rules.

## Commands

| Command | Description |
|---------|-------------|
| `audit` | Full audit of all rules |
| `audit <rule>` | Audit specific rule |
| `promote <rule>` | Promote experimental → active |
| `deprecate <rule>` | Start deprecation workflow |
| `remove <rule>` | Remove deprecated rule |
| `severity <rule> <level>` | Change rule severity |
| `report` | Generate governance report |

---

## 1. Rule Audit (`audit`)

Comprehensive audit of lint rules for quality and effectiveness.

### Full Audit Steps

1. **Load registry** from `oxlint-plugins/emul8-lint-plugin/metadata/registry.json`

2. **For each rule, check**:
   - [ ] Rule file exists in `rules/{category}/{rule-name}.js`
   - [ ] Rule is exported in `index.js`
   - [ ] Rule is configured in `oxlint.json`
   - [ ] Metadata is complete and valid
   - [ ] Source pattern still exists in review agent
   - [ ] Test file exists (if required)

3. **Analyze effectiveness metrics**:
   - Violations count (run lint and count)
   - Estimate false positive rate (check for eslint-disable comments)

4. **Generate audit report**:
   ```markdown
   ## Lint Rule Audit Report

   Generated: YYYY-MM-DD

   ### Health Summary
   | Status | Count | % |
   |--------|-------|---|
   | ✅ Healthy | N | X% |
   | ⚠️ Needs attention | N | X% |
   | ❌ Issues found | N | X% |

   ### Rule Details

   #### ✅ Healthy Rules
   | Rule | Category | Status | Last Updated |
   |------|----------|--------|--------------|
   | ... | ... | ... | ... |

   #### ⚠️ Needs Attention
   | Rule | Issue | Recommendation |
   |------|-------|----------------|
   | ... | No test file | Create tests |
   | ... | Experimental > 14 days | Promote or deprecate |

   #### ❌ Issues Found
   | Rule | Issue | Action Required |
   |------|-------|-----------------|
   | ... | Missing from index.js | Add export |
   | ... | Source pattern removed | Consider deprecation |
   ```

### Single Rule Audit

When auditing a specific rule, provide detailed analysis:

```markdown
## Rule Audit: no-div-onclick

### Metadata
- Category: a11y
- Status: active
- Severity: warn
- Created: 2025-01-04
- Source: a11y-review:interactive-elements:div-with-onclick

### File Check
- [x] Rule file: `rules/a11y/no-div-onclick.js`
- [x] Exported in index.js
- [x] Configured in oxlint.json
- [ ] Test file exists

### Effectiveness
- Current violations in codebase: 0
- Files with eslint-disable for this rule: 0
- False positive rate: 0%

### Source Pattern
- Linked to: a11y-review.md
- Pattern still documented: Yes

### Recommendations
- ✅ Rule is healthy
- Consider: Add test file for regression protection
```

---

## 2. Promotion (`promote`)

Promote a rule from experimental to active status.

### Promotion Criteria

| Criterion | Requirement |
|-----------|-------------|
| Age | At least 7 days as experimental |
| Violations | Been run against codebase |
| False Positives | < 5% suppression rate |
| Stability | No bug reports or changes needed |

### Steps

1. **Verify rule exists** and is `status: experimental`

2. **Check promotion criteria**:
   ```
   Rule: rule-name
   Age: X days (minimum 7) ✅/❌
   Tested: Yes/No ✅/❌
   False positive rate: X% (max 5%) ✅/❌
   ```

3. **If criteria met**, update registry.json:
   ```json
   {
     "status": "active",
     "promoted": "YYYY-MM-DD"
   }
   ```

4. **Optionally update severity** if warranted:
   - `warn` → `error` for critical rules
   - Keep `warn` for style/suggestion rules

5. **Report promotion**:
   ```
   ## Promotion Complete

   Rule: emul8/rule-name
   Previous status: experimental
   New status: active
   Promoted: YYYY-MM-DD
   ```

---

## 3. Deprecation (`deprecate`)

Start the deprecation workflow for a rule.

### Deprecation Reasons

- Rule is no longer relevant (pattern changed)
- High false positive rate
- Replaced by better rule
- Source pattern removed from review agent
- Framework/library no longer used

### Steps

1. **Document reason** for deprecation

2. **Update registry.json**:
   ```json
   {
     "status": "deprecated",
     "deprecated": "YYYY-MM-DD",
     "deprecationReason": "Reason for deprecation",
     "replacedBy": "new-rule-name" // if applicable
   }
   ```

3. **Update oxlint.json** - change severity to `off`:
   ```json
   {
     "plugins": {
       "emul8": {
         "rule-name": "off"
       }
     }
   }
   ```

4. **Add deprecation notice** to rule file:
   ```javascript
   /**
    * @deprecated Since YYYY-MM-DD. Reason: ...
    * @see new-rule-name for replacement
    */
   ```

5. **Create deprecation notice**:
   ```
   ## Deprecation Notice

   Rule: emul8/rule-name
   Status: active → deprecated
   Date: YYYY-MM-DD
   Reason: [reason]
   Replaced by: [new-rule] or N/A

   The rule will remain in the codebase for 30 days before removal.
   ```

---

## 4. Removal (`remove`)

Remove a deprecated rule from the codebase.

### Removal Criteria

| Criterion | Requirement |
|-----------|-------------|
| Status | Must be `deprecated` |
| Age | At least 30 days since deprecation |
| Violations | 0 remaining violations |

### Steps

1. **Verify rule is deprecated** and meets removal criteria

2. **Remove files**:
   - `rules/{category}/{rule-name}.js`
   - `tests/{category}/{rule-name}.test.js` (if exists)

3. **Update index.js** - remove import and export

4. **Update oxlint.json** - remove rule entry

5. **Update registry.json** - change status to `removed`:
   ```json
   {
     "status": "removed",
     "removed": "YYYY-MM-DD"
   }
   ```

6. **Report removal**:
   ```
   ## Rule Removed

   Rule: emul8/rule-name
   Deprecated: YYYY-MM-DD
   Removed: YYYY-MM-DD
   Reason: [original deprecation reason]

   Files removed:
   - rules/{category}/{rule-name}.js
   - tests/{category}/{rule-name}.test.js
   ```

---

## 5. Severity Change (`severity`)

Change the severity level of a rule.

### Severity Levels

| Level | Description | Use When |
|-------|-------------|----------|
| `off` | Disabled | Deprecated or temporarily disabled |
| `warn` | Warning | Style issues, suggestions, experimental |
| `error` | Error | Critical issues, breaks build |

### Steps

1. **Verify rule exists** and current severity

2. **Update oxlint.json**:
   ```json
   {
     "plugins": {
       "emul8": {
         "rule-name": "new-severity"
       }
     }
   }
   ```

3. **Update registry.json**:
   ```json
   {
     "severity": "new-severity",
     "severityHistory": [
       { "severity": "old", "until": "YYYY-MM-DD" },
       { "severity": "new", "from": "YYYY-MM-DD" }
     ]
   }
   ```

4. **Report change**:
   ```
   ## Severity Changed

   Rule: emul8/rule-name
   Previous: warn
   New: error

   Reason: [if provided]
   ```

---

## 6. Governance Report (`report`)

Generate comprehensive governance report.

### Report Sections

```markdown
## Lint Governance Report

Generated: YYYY-MM-DD

### Overview
| Metric | Value |
|--------|-------|
| Total rules | N |
| Active | N |
| Experimental | N |
| Deprecated | N |
| Coverage (patterns → rules) | X% |

### Status Distribution
```
Active:       ████████████████ 15
Experimental: ████ 3
Deprecated:   █ 1
```

### Category Distribution
| Category | Rules | Active | Experimental |
|----------|-------|--------|--------------|
| a11y | N | N | N |
| i18n | N | N | N |
| perf | N | N | N |
| imports | N | N | N |

### Recent Activity (Last 30 Days)
| Date | Action | Rule | Details |
|------|--------|------|---------|
| YYYY-MM-DD | Created | rule-name | experimental |
| YYYY-MM-DD | Promoted | rule-name | → active |
| YYYY-MM-DD | Deprecated | rule-name | Reason |

### Attention Required

#### Experimental Rules > 14 Days
| Rule | Created | Days | Action |
|------|---------|------|--------|
| ... | ... | N | Promote or deprecate |

#### Rules Without Tests
| Rule | Category | Recommendation |
|------|----------|----------------|
| ... | ... | Add test file |

#### High Violation Rules
| Rule | Violations | Fix Rate | Action |
|------|------------|----------|--------|
| ... | N | X% | Investigate root cause |

### Source Pattern Coverage
| Agent | Patterns | Covered | Uncovered |
|-------|----------|---------|-----------|
| a11y-review | N | N | N |
| i18n-review | N | N | N |
| performance-review | N | N | N |

### Recommendations
1. [Specific actionable recommendations]
2. ...
```

---

## Governance Policies

### Rule Lifecycle

```
Created (experimental) ──▶ Promoted (active) ──▶ Deprecated ──▶ Removed
       │                          │                   │
       │                          │                   ▼
       │                          │              (30 days)
       │                          │                   │
       ▼                          ▼                   ▼
   (7+ days)              (indefinite)           Removed
```

### Review Frequency

| Review Type | Frequency | Agent Command |
|-------------|-----------|---------------|
| Health check | Weekly | `audit` |
| Effectiveness | Monthly | `report` |
| Pattern coverage | Quarterly | `/lint-lifecycle analyze` |

### Decision Matrix

| Situation | Action |
|-----------|--------|
| Experimental > 14 days, no issues | Promote |
| Experimental > 14 days, issues | Fix or deprecate |
| Active, > 20% false positives | Refine or deprecate |
| Active, 0 violations for 90 days | Consider if still needed |
| Source pattern removed | Deprecate |

---

## Usage Examples

### Full audit of all rules
```
/lint-governance audit
```

### Audit specific rule
```
/lint-governance audit no-div-onclick
```

### Promote a rule
```
/lint-governance promote no-new-rule
```

### Deprecate a rule with reason
```
/lint-governance deprecate old-rule
# Will prompt for reason
```

### Change severity
```
/lint-governance severity no-div-onclick error
```

### Generate governance report
```
/lint-governance report
```
