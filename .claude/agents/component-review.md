# Component Review Agent

## Purpose

Review components for quality, consistency, and adherence to emul8 patterns.

## Usage

```
/component-review <ComponentName>
/component-review --all
```

## Checklist

When reviewing a component, check the following:

### 1. File Structure

- [ ] `{Name}.tsx` - Component implementation
- [ ] `{Name}.types.ts` - TypeScript interfaces
- [ ] `{Name}.variants.ts` - CVA variant definitions
- [ ] `{Name}.stories.tsx` - Storybook stories
- [ ] `{Name}.mdx` - Documentation
- [ ] `index.ts` - Exports

### 2. Component Implementation (`{Name}.tsx`)

- [ ] Uses `forwardRef` for ref forwarding
- [ ] Implements `asChild` pattern with `Slot` from utils
- [ ] Uses `cn()` utility for className merging
- [ ] Sets `displayName` for React DevTools
- [ ] Properly types the component with generics if needed
- [ ] No inline styles - all styling through Tailwind/CVA

### 3. TypeScript Types (`{Name}.types.ts`)

- [ ] Props interface extends appropriate HTML element attributes
- [ ] Uses `VariantProps<typeof componentVariants>` from CVA
- [ ] All props have JSDoc documentation
- [ ] No `any` types
- [ ] Required props are marked, optional have `?`
- [ ] Exported with `type` keyword

### 4. CVA Variants (`{Name}.variants.ts`)

- [ ] Base classes use array format for readability
- [ ] All visual states have variants (not just className props)
- [ ] Default variants specified
- [ ] Variant names are semantic (e.g., `primary` not `blue`)
- [ ] Compound variants for combined states if needed
- [ ] Exported for consumer use

### 5. Storybook Stories (`{Name}.stories.tsx`)

- [ ] Meta with proper `title` matching atomic level (e.g., `Atoms/Button`)
- [ ] Uses `satisfies Meta<typeof Component>` for type safety
- [ ] Default story demonstrates basic usage
- [ ] Stories for each variant
- [ ] Stories for each size
- [ ] Stories for interactive states (hover, focus, disabled)
- [ ] Stories for edge cases (loading, error, empty)
- [ ] `argTypes` configured for interactive controls

### 6. Documentation (`{Name}.mdx`)

- [ ] Features section with bullet points
- [ ] Usage example with code block
- [ ] Props table with types and defaults
- [ ] Accessibility notes
- [ ] All stories embedded

### 7. Exports (`index.ts`)

- [ ] Component exported (named export)
- [ ] Types exported with `export type`
- [ ] Variants exported for consumer customization

### 8. Atomic Design Compliance

- [ ] Component is in correct layer (layouts/atoms/molecules/organisms/templates)
- [ ] Only imports from allowed lower layers
- [ ] Does not import from same-level sibling components

### 9. Accessibility

- [ ] Proper ARIA attributes where needed
- [ ] Keyboard navigation support
- [ ] Focus management
- [ ] Color contrast compliance
- [ ] Screen reader friendly

### 10. LLM API Design (Quick Check)

For detailed review, run `/llm-api-review <ComponentName>`

- [ ] Props count ≤ 10
- [ ] All variants use literal union types (not `string`)
- [ ] Boolean props use positive names without `is`/`has` prefix
- [ ] JSDoc on all props
- [ ] Defaults specified in CVA `defaultVariants`
- [ ] No overloaded props (each prop has one clear purpose)

### 11. i18n Readiness (Quick Check)

For detailed review, run `/i18n-review <ComponentName>`

- [ ] No hardcoded user-facing strings
- [ ] Uses logical CSS properties (`ms-*`, `me-*`, `ps-*`, `pe-*`)
- [ ] Uses `text-start`/`text-end` instead of `text-left`/`text-right`
- [ ] ARIA labels are configurable via props
- [ ] Flexible widths for text expansion

### 12. Cross-Platform (Quick Check)

For detailed review, run `/cross-platform-review <ComponentName>`

- [ ] Variants map to M3/HIG/Fluent equivalents
- [ ] Touch targets meet platform minimums (48dp M3, 44pt HIG)
- [ ] Uses CSS variables for platform-adaptive values
- [ ] Border radius follows platform conventions

### 13. Performance (Quick Check)

For detailed review, run `/perf-review <ComponentName>`

- [ ] No unnecessary wrapper elements
- [ ] SSR-safe (no direct window/document access)
- [ ] Uses `useId()` for generated IDs
- [ ] Hydration-safe initial state
- [ ] No inline object/array creation in render

---

## Related Agents

Run these specialized agents for deeper analysis:

| Agent | Command | Focus |
|-------|---------|-------|
| LLM API Review | `/llm-api-review ComponentName` | Token efficiency, prop naming |
| Accessibility | `/a11y-review ComponentName` | WCAG 2.2 compliance |
| i18n Review | `/i18n-review ComponentName` | RTL, string externalization |
| Performance | `/perf-review ComponentName` | DOM size, SSR safety |
| Cross-Platform | `/cross-platform-review ComponentName` | M3/HIG/Fluent harmony |
| M3 Review | `/m3-review ComponentName` | Material Design 3 |
| HIG Review | `/hig-review ComponentName` | Apple HIG |
| Fluent Review | `/fluent-review ComponentName` | Microsoft Fluent |

## Output Format

Provide structured feedback:

```markdown
## Component Review: {ComponentName}

### Summary
- Status: PASS / FAIL / NEEDS WORK
- Layer: atoms | molecules | organisms | etc.
- Files: X/6 present

### Issues Found
1. **[CRITICAL]** Issue description
2. **[WARNING]** Issue description
3. **[SUGGESTION]** Improvement idea

### Recommendations
- Specific actionable improvements

### Code Suggestions
```typescript
// Before
...
// After
...
```
```
