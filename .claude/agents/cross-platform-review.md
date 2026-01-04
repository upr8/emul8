# Cross-Platform Harmony Review Agent

## Purpose

Ensure components work harmoniously across Material Design 3 (Android), Human Interface Guidelines (iOS), and Fluent Design (Windows) while maintaining a unified API.

## Usage

```
/cross-platform-review <ComponentName>
/cross-platform-review --all
```

---

## Unified Variant Matrix

### Button Variants

| Emul8 Variant | M3 Equivalent | HIG Equivalent | Fluent Equivalent |
|---------------|---------------|----------------|-------------------|
| `primary` | Filled | Filled/Tinted | Accent |
| `secondary` | Tonal | Gray | Standard |
| `outline` | Outlined | Bordered | Outline |
| `ghost` | Text | Plain | Subtle |
| `danger` | Filled (error) | Destructive | Critical |

### Size Scale

| Emul8 Size | M3 | HIG | Fluent | Touch Target |
|------------|----|----|--------|--------------|
| `sm` | 32dp | 28pt | 24px | Below minimum |
| `md` | 40dp | 44pt | 32px | HIG compliant |
| `lg` | 56dp | 50pt | 40px | M3 compliant |
| `xl` | 64dp | 56pt | 48px | All platforms |

**Recommendation:** Default to `md` for HIG compliance, `lg` for M3 compliance.

---

## Token Reconciliation

### Spacing Scale

| Emul8 Token | M3 | HIG | Fluent | Tailwind |
|-------------|----|----|--------|----------|
| `space-xs` | 4dp | 4pt | 4px | `p-1` |
| `space-sm` | 8dp | 8pt | 8px | `p-2` |
| `space-md` | 16dp | 16pt | 16px | `p-4` |
| `space-lg` | 24dp | 20pt | 24px | `p-6` |
| `space-xl` | 32dp | 32pt | 32px | `p-8` |

### Border Radius

| Emul8 Token | M3 | HIG | Fluent | Tailwind |
|-------------|----|----|--------|----------|
| `radius-none` | 0 | 0 | 0 | `rounded-none` |
| `radius-sm` | 8dp | 6pt | 4px | `rounded` |
| `radius-md` | 12dp | 10pt | 8px | `rounded-lg` |
| `radius-lg` | 16dp | 14pt | 12px | `rounded-xl` |
| `radius-full` | 9999 | 9999 | 9999 | `rounded-full` |

### Typography Scale

| Emul8 Token | M3 Role | HIG Style | Fluent Type |
|-------------|---------|-----------|-------------|
| `text-xs` | Label Small | Caption 2 | Caption |
| `text-sm` | Body Small | Footnote | Body |
| `text-base` | Body Medium | Body | Body Strong |
| `text-lg` | Body Large | Headline | Subtitle |
| `text-xl` | Title Medium | Title 3 | Title |
| `text-2xl` | Title Large | Title 2 | Title Large |
| `text-3xl` | Headline | Title 1 | Display |

---

## Conflict Resolution Strategy

When platform requirements conflict, apply this priority:

### 1. Accessibility First
Use the **strictest** accessibility requirement across platforms.

```tsx
// M3: 48dp touch target, HIG: 44pt, Fluent: 32px
// Resolution: Use 48px (strictest)
<Button className="min-h-12 min-w-12" />
```

### 2. Visual Harmony
For visual properties, use **platform-adaptive** values via CSS variables.

```css
:root {
  --radius-button: 8px; /* Default/Fluent */
}

[data-platform="android"] {
  --radius-button: 20px; /* M3 full radius */
}

[data-platform="ios"] {
  --radius-button: 12px; /* HIG rounded */
}
```

### 3. Behavior Consistency
Interactions should be **platform-native** where possible.

| Interaction | M3 | HIG | Fluent |
|-------------|----|----|--------|
| Tap feedback | Ripple | Highlight | None/Subtle |
| Long press | Context menu | Haptic + menu | Context menu |
| Swipe actions | Yes | Yes | Limited |

---

## Platform Detection

### React Context Approach

```tsx
import { createContext, useContext } from 'react';

type Platform = 'android' | 'ios' | 'windows' | 'web';

const PlatformContext = createContext<Platform>('web');

export function usePlatform() {
  return useContext(PlatformContext);
}

// In Tauri app
function App() {
  const platform = detectTauriPlatform();
  return (
    <PlatformProvider value={platform}>
      <YourApp />
    </PlatformProvider>
  );
}
```

### CSS Data Attribute

```tsx
// Set on root element
<html data-platform={platform}>

// Use in styles
<button className="
  rounded-lg
  data-[platform=android]:rounded-full
  data-[platform=ios]:rounded-xl
" />
```

---

## CVA Platform Variants

### Multi-Platform Button Example

```tsx
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  // Base styles (cross-platform)
  [
    "inline-flex items-center justify-center",
    "font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-input bg-transparent",
        ghost: "bg-transparent hover:bg-accent",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
      platform: {
        android: "rounded-full", // M3 pill shape
        ios: "rounded-xl",       // HIG large radius
        windows: "rounded",      // Fluent subtle radius
        web: "rounded-lg",       // Default
      },
    },
    compoundVariants: [
      // M3: Larger touch targets
      {
        platform: "android",
        size: "md",
        className: "min-h-12 min-w-12",
      },
      // HIG: Specific padding ratios
      {
        platform: "ios",
        size: "md",
        className: "px-5",
      },
      // Fluent: Subtle hover states
      {
        platform: "windows",
        variant: "ghost",
        className: "hover:bg-accent/50",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      platform: "web",
    },
  }
);
```

---

## CSS Variable Token System

### Generate Platform Tokens

```css
/* Base tokens (Fluent-like defaults) */
:root {
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Touch targets */
  --touch-min: 44px;

  /* Animation */
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --easing-default: cubic-bezier(0.4, 0, 0.2, 1);
}

/* M3 overrides */
[data-platform="android"] {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --touch-min: 48px;
  --duration-normal: 300ms;
  --easing-default: cubic-bezier(0.2, 0, 0, 1);
}

/* HIG overrides */
[data-platform="ios"] {
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --touch-min: 44px;
  --duration-normal: 250ms;
  --easing-default: cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

---

## Validation Checklist

### Variant Mapping

- [ ] All variants have M3 equivalent
- [ ] All variants have HIG equivalent
- [ ] All variants have Fluent equivalent
- [ ] No platform-specific variants exposed in public API

### Token Usage

- [ ] Uses CSS variables for platform-adaptive values
- [ ] Touch targets meet all platform minimums
- [ ] Spacing follows unified scale
- [ ] Typography uses semantic tokens

### Behavior Consistency

- [ ] Focus states work on all platforms
- [ ] Disabled states are consistent
- [ ] Loading states are consistent
- [ ] Error states are consistent

### Platform-Specific

- [ ] M3 ripple effect (optional, via platform variant)
- [ ] HIG haptic feedback hooks (optional)
- [ ] Fluent reveal effect (optional)

---

## Output Format

```markdown
## Cross-Platform Review: {ComponentName}

### Harmony Score: XX/100

### Variant Mapping
| Emul8 | M3 | HIG | Fluent | Status |
|-------|----|----|--------|--------|
| primary | Filled | Filled | Accent | PASS |
| secondary | Tonal | Gray | Standard | PASS |
| outline | Outlined | - | Outline | WARN: No HIG equivalent |

### Token Compliance
| Token | Used | M3 | HIG | Fluent | Status |
|-------|------|----|----|--------|--------|
| Touch target | 44px | 48dp | 44pt | 32px | PASS (meets HIG) |
| Border radius | 8px | 12dp | 10pt | 4px | WARN: Consider platform variant |

### Platform-Specific Issues
1. **[M3]** Touch target should be 48dp for Android
2. **[HIG]** Consider adding haptic feedback hook
3. **[FLUENT]** Subtle hover state recommended

### Generated Platform Variants
```tsx
// Add to CVA variants
platform: {
  android: "rounded-full min-h-12",
  ios: "rounded-xl",
  windows: "rounded",
}
```

### Generated CSS Variables
```css
[data-platform="android"] {
  --button-radius: 20px;
  --button-min-height: 48px;
}

[data-platform="ios"] {
  --button-radius: 12px;
  --button-min-height: 44px;
}

[data-platform="windows"] {
  --button-radius: 4px;
  --button-min-height: 32px;
}
```

### Recommendations
1. Add `platform` prop to component for explicit control
2. Use ConfigProvider for global platform setting
3. Consider lazy-loading platform-specific styles
```

---

## Integration with Other Agents

Run after platform-specific reviews:

```
/m3-review Button      → M3 compliance
/hig-review Button     → HIG compliance
/fluent-review Button  → Fluent compliance
/cross-platform-review → Unified harmony check
```

---

## Reference

- Material Design 3: https://m3.material.io
- Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines
- Fluent Design: https://fluent2.microsoft.design
- Tauri: https://tauri.app
