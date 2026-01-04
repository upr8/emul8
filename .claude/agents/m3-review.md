# Material Design 3 Review Agent

## Purpose

Validate components against Material Design 3 (M3) specifications for Android platform compatibility.

## Usage

```
/m3-review <ComponentName>
/m3-review --all
```

## Reference

- Official docs: https://m3.material.io
- Components: https://m3.material.io/components
- Tokens: https://m3.material.io/foundations/design-tokens

## M3 Design Tokens

### Corner Radius (Shape)

| Shape | Radius | Tailwind |
|-------|--------|----------|
| None | 0dp | `rounded-none` |
| Extra Small | 4dp | `rounded` |
| Small | 8dp | `rounded-lg` |
| Medium | 12dp | `rounded-xl` |
| Large | 16dp | `rounded-2xl` |
| Extra Large | 28dp | `rounded-3xl` |
| Full | 50% | `rounded-full` |

### Elevation Levels

| Level | Elevation | Use Case |
|-------|-----------|----------|
| 0 | 0dp | Surface |
| 1 | 1dp | Cards, Sheets |
| 2 | 3dp | Menus, Dialogs |
| 3 | 6dp | FAB, Snackbar |
| 4 | 8dp | Drawer |
| 5 | 12dp | Modal |

### Color Roles

| Role | Usage |
|------|-------|
| Primary | Key actions, active states |
| On Primary | Text/icons on primary |
| Primary Container | Less prominent primary |
| Secondary | Less prominent actions |
| Tertiary | Accent, contrast |
| Error | Error states |
| Surface | Backgrounds |
| Outline | Borders |

### State Layers

| State | Opacity |
|-------|---------|
| Hover | 8% |
| Focus | 12% |
| Pressed | 12% |
| Dragged | 16% |

## Component Specifications

### Button

| Variant | Height | Padding | Corner |
|---------|--------|---------|--------|
| Filled | 40dp | 24dp horizontal | Medium (12dp) |
| Outlined | 40dp | 24dp horizontal | Medium (12dp) |
| Text | 40dp | 12dp horizontal | Medium (12dp) |
| Elevated | 40dp | 24dp horizontal | Medium (12dp) |
| Tonal | 40dp | 24dp horizontal | Medium (12dp) |
| FAB | 56dp | 16dp | Large (16dp) |
| FAB Small | 40dp | 8dp | Medium (12dp) |
| FAB Large | 96dp | 30dp | Extra Large (28dp) |

### Touch Targets

- Minimum touch target: 48dp x 48dp
- Recommended: 56dp for primary actions

### Typography

| Style | Size | Weight | Line Height |
|-------|------|--------|-------------|
| Display Large | 57sp | 400 | 64sp |
| Display Medium | 45sp | 400 | 52sp |
| Headline Large | 32sp | 400 | 40sp |
| Title Large | 22sp | 400 | 28sp |
| Body Large | 16sp | 400 | 24sp |
| Label Large | 14sp | 500 | 20sp |

## Validation Checklist

### Variants

- [ ] Has M3-equivalent variants (filled, outlined, text, tonal)
- [ ] Variant names map to M3 terminology
- [ ] Default variant is appropriate for M3

### Sizing

- [ ] Heights match M3 specs (40dp standard, 56dp FAB)
- [ ] Padding matches M3 specs (24dp horizontal for buttons)
- [ ] Touch targets meet 48dp minimum

### Shape

- [ ] Corner radius uses M3 scale (4, 8, 12, 16, 28dp)
- [ ] Shape is appropriate for component type

### Color

- [ ] Uses M3 color roles (primary, secondary, tertiary)
- [ ] Has proper on-color contrast
- [ ] Container variants use proper fill

### States

- [ ] Has state layer support (hover, focus, pressed)
- [ ] State opacity matches M3 specs
- [ ] Disabled state reduces opacity to 38%

### Elevation

- [ ] Uses appropriate elevation level
- [ ] Elevation changes on interaction (e.g., FAB on press)

### Motion

- [ ] Transitions use M3 easing (emphasized, standard)
- [ ] Duration appropriate for interaction type

## Output Format

```markdown
## M3 Review: {ComponentName}

### Compliance Score: XX/100

### M3 Mapping
| emul8 Variant | M3 Equivalent | Status |
|---------------|---------------|--------|
| primary | Filled | PASS/FAIL |
| secondary | Tonal | PASS/FAIL |
| outline | Outlined | PASS/FAIL |
| ghost | Text | PASS/FAIL |

### Issues
1. **[SPEC VIOLATION]** Button height is 36px, M3 requires 40dp
2. **[MISSING]** No tonal variant for M3 Tonal Button

### Recommendations
1. Add `min-h-10` (40px) for M3 button height compliance
2. Add `tonal` variant with secondary container colors

### Token Mapping
```css
/* Suggested Tailwind classes for M3 */
--m3-corner-medium: rounded-xl; /* 12dp */
--m3-state-hover: bg-current/8;
--m3-state-pressed: bg-current/12;
```
```

## Code Generation

### CVA Platform Variant

```tsx
// Add to component's .variants.ts file
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center font-medium",
    "transition-all duration-300", // M3 standard duration
    "focus-visible:outline-none focus-visible:ring-2",
  ],
  {
    variants: {
      variant: {
        // M3 Filled Button
        filled: [
          "bg-primary text-on-primary",
          "hover:shadow-md hover:bg-primary/92", // 8% state layer
          "active:bg-primary/88", // 12% state layer
        ],
        // M3 Tonal Button
        tonal: [
          "bg-secondary-container text-on-secondary-container",
          "hover:bg-secondary-container/92",
          "active:bg-secondary-container/88",
        ],
        // M3 Outlined Button
        outlined: [
          "border border-outline bg-transparent text-primary",
          "hover:bg-primary/8",
          "active:bg-primary/12",
        ],
        // M3 Text Button
        text: [
          "bg-transparent text-primary",
          "hover:bg-primary/8",
          "active:bg-primary/12",
        ],
        // M3 Elevated Button
        elevated: [
          "bg-surface-container-low text-primary shadow-sm",
          "hover:shadow-md hover:bg-primary/8",
          "active:bg-primary/12",
        ],
      },
      size: {
        sm: "h-8 px-4 text-sm rounded-lg", // 32dp, Small shape
        md: "h-10 px-6 text-base rounded-xl min-w-12", // 40dp, Medium shape, 48dp touch
        lg: "h-14 px-8 text-lg rounded-2xl", // 56dp FAB, Large shape
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "md",
    },
  }
);
```

### CSS Variable Tokens

```css
/* Add to globals.css for M3 support */
[data-platform="android"] {
  /* M3 Shape Scale */
  --radius-none: 0px;
  --radius-xs: 4px;   /* Extra Small */
  --radius-sm: 8px;   /* Small */
  --radius-md: 12px;  /* Medium */
  --radius-lg: 16px;  /* Large */
  --radius-xl: 28px;  /* Extra Large */
  --radius-full: 9999px;

  /* M3 Elevation */
  --shadow-1: 0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15);
  --shadow-2: 0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15);
  --shadow-3: 0 1px 3px rgba(0,0,0,0.3), 0 4px 8px 3px rgba(0,0,0,0.15);
  --shadow-4: 0 2px 3px rgba(0,0,0,0.3), 0 6px 10px 4px rgba(0,0,0,0.15);
  --shadow-5: 0 4px 4px rgba(0,0,0,0.3), 0 8px 12px 6px rgba(0,0,0,0.15);

  /* M3 State Layer Opacities */
  --state-hover: 0.08;
  --state-focus: 0.12;
  --state-pressed: 0.12;
  --state-dragged: 0.16;

  /* M3 Motion */
  --duration-short: 100ms;
  --duration-medium: 300ms;
  --duration-long: 500ms;
  --easing-emphasized: cubic-bezier(0.2, 0, 0, 1);
  --easing-standard: cubic-bezier(0.2, 0, 0, 1);

  /* M3 Touch Target */
  --touch-target-min: 48px;
}
```

### Storybook Story

```tsx
// ComponentName.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/...",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// M3 Platform Story
export const MaterialDesign3: Story = {
  decorators: [
    (Story) => (
      <div data-platform="android" className="p-8 bg-surface">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="filled">Filled</Button>
      <Button variant="tonal">Tonal</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
      <Button variant="elevated">Elevated</Button>
    </div>
  ),
};

// M3 Touch Target Verification
export const M3TouchTargets: Story = {
  decorators: [
    (Story) => (
      <div data-platform="android" className="p-8">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Hover to see 48dp touch target overlay
      </p>
      <div className="relative inline-block">
        <Button size="md">Button</Button>
        <div className="absolute inset-0 -m-1 border-2 border-dashed border-primary/30 rounded-xl pointer-events-none" />
      </div>
    </div>
  ),
};

// M3 State Layers
export const M3States: Story = {
  parameters: {
    pseudo: { hover: true, focus: true, active: true },
  },
  render: () => (
    <div className="space-y-4" data-platform="android">
      <div className="flex gap-4">
        <Button variant="filled">Rest</Button>
        <Button variant="filled" className="hover">Hover (8%)</Button>
        <Button variant="filled" className="focus">Focus (12%)</Button>
        <Button variant="filled" className="active">Pressed (12%)</Button>
      </div>
    </div>
  ),
};
```

### Ripple Effect Hook

```tsx
// hooks/useRipple.ts
import { useCallback, useState } from "react";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export function useRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const ripple: Ripple = { x, y, id: Date.now() };
      setRipples((prev) => [...prev, ripple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
    },
    []
  );

  return { ripples, createRipple };
}

// Usage in Button component
function Button({ children, ...props }) {
  const { ripples, createRipple } = useRipple();

  return (
    <button onClick={createRipple} {...props}>
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-current/12 animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </button>
  );
}
```

---

## M3 Component Reference

Use these as reference when reviewing:

- **Buttons**: https://m3.material.io/components/buttons
- **FAB**: https://m3.material.io/components/floating-action-button
- **Cards**: https://m3.material.io/components/cards
- **Chips**: https://m3.material.io/components/chips
- **Dialogs**: https://m3.material.io/components/dialogs
- **Navigation**: https://m3.material.io/components/navigation-bar
- **Text Fields**: https://m3.material.io/components/text-fields
