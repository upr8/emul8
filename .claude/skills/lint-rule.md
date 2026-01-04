# Lint Rule Skill

Interactive skill for creating new oxlint lint rules with guided wizard.

## Usage

```
/lint-rule              # Start interactive wizard
/lint-rule create       # Start interactive wizard
/lint-rule create <name> # Create rule with specified name
/lint-rule from-pattern  # Create from detected pattern
```

---

## Interactive Wizard Flow

### Step 1: Rule Name

Prompt for rule name if not provided:

```
What is the name of the rule?

Enter a kebab-case name (e.g., no-div-onclick, require-aria-label):
> _
```

**Validation:**
- Must be kebab-case
- Must not already exist in registry
- Should follow naming convention: `no-*`, `require-*`, `prefer-*`

---

### Step 2: Category Selection

```
Which category does this rule belong to?

1. a11y     - Accessibility rules
2. i18n     - Internationalization (RTL support, etc.)
3. perf     - Performance and SSR safety
4. imports  - Import hierarchy and module boundaries

Select [1-4]: _
```

---

### Step 3: Template Selection

```
What pattern does this rule detect?

1. jsx-attribute     - JSX elements with specific attributes
                       Example: <div onClick> without role

2. string-pattern    - Patterns in string literals (Tailwind classes)
                       Example: ml-4 instead of ms-4

3. import-analysis   - Import statement validation
                       Example: atoms importing from molecules

4. call-expression   - Function or hook calls
                       Example: useLayoutEffect, Math.random()

Select [1-4]: _
```

---

### Step 4: Template-Specific Questions

#### For `jsx-attribute`:

```
Target element (e.g., div, button, img): _
Target attribute to check (e.g., onClick, aria-label): _
Condition type:
  1. Report when attribute IS present
  2. Report when attribute is MISSING
Select [1-2]: _
```

#### For `string-pattern`:

```
What pattern should be detected? (regex)
Example: \\bml-(\\d+)\\b for "ml-4"
Pattern: _

What should it be replaced with?
Example: ms-$1 (use $1, $2 for capture groups)
Replacement: _

Should this rule provide auto-fix? [y/n]: _
```

#### For `import-analysis`:

```
What import pattern should be flagged?
  1. Cross-layer imports (atomic design violations)
  2. Specific module/package imports
  3. Relative imports from specific paths
Select [1-3]: _
```

#### For `call-expression`:

```
What type of call?
  1. Direct function call (e.g., someFunction())
  2. Method call (e.g., object.method())
  3. Constructor (e.g., new Something())
Select [1-3]: _

Function/method name to detect: _
```

---

### Step 5: Error Message

```
What error message should be shown?

Use {{placeholders}} for dynamic values.
Example: "Use 'ms-{{size}}' instead of 'ml-{{size}}' for RTL support"

Message: _
```

---

### Step 6: Source Pattern (Optional)

```
Link to a review agent pattern? (optional)

Format: agent-name:category:pattern-name
Example: a11y-review:interactive-elements:div-onclick

Pattern ID (or press Enter to skip): _
```

---

### Step 7: Confirmation

```
## Rule Summary

Name:        no-div-onclick
Category:    a11y
Template:    jsx-attribute
Severity:    warn (default)
Status:      experimental

Detection:   <div> elements with onClick attribute
Message:     "Use <button> instead of <div onClick> for accessibility"
Source:      a11y-review:interactive-elements:div-onclick

Files to create:
  - oxlint-plugins/emul8-lint-plugin/rules/a11y/no-div-onclick.js
  - oxlint-plugins/emul8-lint-plugin/tests/a11y/no-div-onclick.test.js

Proceed? [y/n]: _
```

---

## File Generation

### Rule File

Generated at: `oxlint-plugins/emul8-lint-plugin/rules/{category}/{name}.js`

Template variables filled:
- `{{DESCRIPTION}}` → From message or generated
- `{{SOURCE_AGENT}}` → From pattern ID
- `{{PATTERN_ID}}` → User input
- `{{CREATED_DATE}}` → Today
- `{{CATEGORY}}` → Selected category
- `{{MESSAGE_ID}}` → camelCase version of name
- `{{MESSAGE}}` → User input
- Template-specific variables

### Test File

Generated at: `oxlint-plugins/emul8-lint-plugin/tests/{category}/{name}.test.js`

```javascript
/**
 * Tests for {rule-name}
 */

// Valid cases - should NOT trigger the rule
const validCases = [
  // TODO: Add valid code examples
  `// valid code here`,
];

// Invalid cases - SHOULD trigger the rule
const invalidCases = [
  {
    code: `// invalid code here`,
    expectedMessage: "error message",
  },
];

// Export for test runner
export { validCases, invalidCases };
```

### Registry Update

Add to `metadata/registry.json`:

```json
{
  "rule-name": {
    "name": "rule-name",
    "category": "category",
    "source": {
      "type": "manual",
      "createdBy": "lint-rule skill"
    },
    "status": "experimental",
    "severity": "warn",
    "fixable": false,
    "created": "YYYY-MM-DD",
    "linkedPatterns": []
  }
}
```

### Index.js Update

Add import and export to plugin:

```javascript
// Add import
import newRule from "./rules/category/rule-name.js";

// Add to rules object
"rule-name": newRule,
```

---

## From Pattern Mode

When using `/lint-rule from-pattern`:

1. **List unautomated patterns** from review agents
2. **User selects** pattern to automate
3. **Pre-fill wizard** with pattern information
4. **Continue** with normal wizard flow

```
## Unautomated Patterns

| # | Pattern | Agent | Description |
|---|---------|-------|-------------|
| 1 | a11y-review:forms:label-association | a11y-review | Form inputs without labels |
| 2 | i18n-review:rtl:inline-styles | i18n-review | Inline styles with physical directions |
| 3 | perf-review:ssr:document-access | performance-review | Direct document access |

Select pattern to automate [1-3]: _
```

---

## Post-Creation Steps

After rule creation, the skill outputs:

```
## Rule Created Successfully

✅ Rule file created
✅ Test file created
✅ Registry updated
✅ Index.js updated

## Next Steps

1. Implement rule logic in:
   oxlint-plugins/emul8-lint-plugin/rules/{category}/{name}.js

2. Add test cases in:
   oxlint-plugins/emul8-lint-plugin/tests/{category}/{name}.test.js

3. Test the rule:
   /lint-lifecycle test {name}

4. Deploy when ready:
   /lint-lifecycle deploy {name}
```

---

## Examples

### Create accessibility rule
```
/lint-rule create no-img-without-alt
```

### Create i18n rule
```
/lint-rule create no-physical-float
```

### Create from existing pattern
```
/lint-rule from-pattern
# Select from list of unautomated patterns
```

---

## Template Quick Reference

### jsx-attribute
- **Best for:** Element + attribute checks
- **Examples:** no-div-onclick, no-positive-tabindex, require-alt

### string-pattern
- **Best for:** Tailwind class patterns
- **Supports:** Auto-fix
- **Examples:** no-physical-margin, no-physical-padding

### import-analysis
- **Best for:** Import rules
- **Examples:** atomic-hierarchy, no-internal-imports

### call-expression
- **Best for:** Function/hook detection
- **Examples:** no-layout-effect, no-render-random
