# LLM API Design Review Agent

## Purpose

Ensure component APIs are optimized for LLM code generation, reducing token usage and minimizing hallucinations.

## Usage

```
/llm-api-review <ComponentName>
/llm-api-review --all
```

## Design Principles

### Balanced Props Approach

Core variants should be controlled via typed props. The `className` prop is available for rare edge cases only.

```typescript
// Good: Core behavior via props
<Button variant="primary" size="md" loading disabled />

// Acceptable: Edge case customization via className
<Button variant="primary" className="shadow-lg" />
```

---

## Token Efficiency Metrics

| Metric | Target | Why |
|--------|--------|-----|
| Props count | ≤ 10 | Fewer props = less for LLM to remember |
| Variant options | ≤ 6 per prop | Limited choices reduce hallucination |
| Type definition | ≤ 20 lines | Concise types are easier to parse |
| JSDoc coverage | 100% | LLMs read JSDoc for context |

---

## Prop Naming Conventions

### Boolean Props

Use single positive words without `is`/`has` prefix:

| Good | Bad |
|------|-----|
| `disabled` | `isDisabled` |
| `loading` | `isLoading` |
| `fullWidth` | `isFullWidth` |
| `open` | `isOpen` |

### Variant Names

Use semantic names that map to design systems:

| Good | Bad |
|------|-----|
| `primary` | `blue` |
| `secondary` | `gray` |
| `danger` | `red` |
| `outline` | `bordered` |
| `ghost` | `transparent` |

### Size Scale

Use consistent abbreviations:

| Good | Bad |
|------|-----|
| `sm`, `md`, `lg` | `small`, `medium`, `large` |
| `xs`, `xl`, `2xl` | `extraSmall`, `extraLarge` |

---

## Type Strictness Rules

### Use Literal Unions

```typescript
// Good: LLM knows exact options
variant?: 'primary' | 'secondary' | 'outline' | 'ghost'

// Bad: LLM may hallucinate values
variant?: string
```

### Default to False for Booleans

```typescript
// Good: Opt-in behavior
loading?: boolean  // defaults to false

// Bad: Unclear default
loading: boolean  // required, no default
```

### Minimal Required Props

```typescript
// Good: Only semantic requirements
interface ButtonProps {
  children: ReactNode;       // Required: content
  variant?: 'primary' | ...  // Optional with default
}

// Bad: Excessive required props
interface ButtonProps {
  children: ReactNode;
  variant: string;           // Why required?
  size: string;              // Why required?
}
```

---

## Anti-Hallucination Patterns

### 1. Explicit CVA Defaults

LLMs read `defaultVariants` to understand component behavior:

```typescript
// Good: Clear defaults
export const buttonVariants = cva([...], {
  variants: { ... },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
```

### 2. No Overloaded Props

Each prop should have one clear purpose:

```typescript
// Bad: Overloaded prop
type?: 'button' | 'submit' | 'reset' | 'link' // Mixes HTML type with appearance

// Good: Separate concerns
type?: 'button' | 'submit' | 'reset'  // HTML attribute
asChild?: boolean                      // Polymorphism
```

### 3. Mutually Exclusive Variants

Variants should not require combinations:

```typescript
// Bad: Requires knowledge of combinations
<Button variant="primary" elevated />  // Does elevated work with outline?

// Good: All states are self-contained
<Button variant="elevated" />  // Elevated is its own variant
```

### 4. Document className Usage

Explicitly state `className` is for edge cases:

```typescript
/**
 * Additional CSS classes for rare edge cases.
 * Prefer using variant props for standard customization.
 */
className?: string
```

---

## Validation Checklist

### Prop Count

- [ ] Total public props ≤ 10
- [ ] Each variant prop has ≤ 6 options
- [ ] No redundant props (props that do the same thing)

### Naming

- [ ] Boolean props use positive names without `is`/`has` prefix
- [ ] Variant names are semantic (not color-based)
- [ ] Size scale is consistent (`sm`/`md`/`lg`)
- [ ] No abbreviations except universally understood ones

### Types

- [ ] All variants use literal union types (not `string`)
- [ ] Boolean props default to `false`
- [ ] Required props are minimal
- [ ] No `any` types
- [ ] Exported with `export type`

### Defaults

- [ ] CVA has `defaultVariants` specified
- [ ] Default values documented in JSDoc
- [ ] Defaults are sensible (most common use case)

### Documentation

- [ ] All props have JSDoc comments
- [ ] Usage examples in JSDoc where helpful
- [ ] `className` documented as edge case escape hatch
- [ ] Complex props have inline examples

---

## Output Format

```markdown
## LLM API Review: {ComponentName}

### Token Efficiency Score: XX/100

### API Surface Analysis
| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Props count | X | ≤ 10 | PASS/FAIL |
| Max variant options | X | ≤ 6 | PASS/FAIL |
| Type definition lines | X | ≤ 20 | PASS/FAIL |
| JSDoc coverage | X% | 100% | PASS/FAIL |

### Naming Compliance
- [x] Boolean props use positive names
- [ ] Variant names are semantic
- [x] Size scale is consistent

### Anti-Hallucination Risks
1. **[HIGH]** Prop `type` is overloaded - can mean HTML type or appearance
2. **[MEDIUM]** Missing defaultVariants in CVA
3. **[LOW]** Consider adding JSDoc example for `asChild`

### Recommendations
1. Split `type` prop into `type` (HTML) and `variant` (appearance)
2. Add `defaultVariants: { variant: 'primary', size: 'md' }`
3. Add inline example: `/** @example <Button asChild><a href="...">Link</a></Button> */`

### Generated Types (Optimized)
```typescript
// Suggested optimized interface
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Button content */
  children: ReactNode;
  /** Render as child element for composition */
  asChild?: boolean;
  /** Show loading spinner and disable interactions */
  loading?: boolean;
}
```
```

---

## Integration

- Run before `/component-review` to catch API issues early
- Results feed into documentation generation
- Can generate LLM-friendly component cheatsheets

## Reference

- Emul8 patterns: `.claude/agents/component-review.md`
- CVA documentation: https://cva.style/docs
