# Fluent Design Review Agent

## Purpose

Validate components against Microsoft Fluent Design System for Windows/Web platform compatibility.

## Usage

```
/fluent-review <ComponentName>
/fluent-review --all
```

## Reference

- Official docs: https://fluent2.microsoft.design
- Web Components: https://fluent2.microsoft.design/components/web
- Design Tokens: https://fluent2.microsoft.design/design-tokens

## Fluent Design Tokens

### Corner Radius

| Token | Value | Tailwind |
|-------|-------|----------|
| borderRadiusNone | 0px | `rounded-none` |
| borderRadiusSmall | 2px | `rounded-sm` |
| borderRadiusMedium | 4px | `rounded` |
| borderRadiusLarge | 6px | `rounded-md` |
| borderRadiusXLarge | 8px | `rounded-lg` |
| borderRadiusCircular | 9999px | `rounded-full` |

### Spacing

| Token | Value | Tailwind |
|-------|-------|----------|
| spacingHorizontalNone | 0px | `px-0` |
| spacingHorizontalXXS | 2px | `px-0.5` |
| spacingHorizontalXS | 4px | `px-1` |
| spacingHorizontalSNudge | 6px | `px-1.5` |
| spacingHorizontalS | 8px | `px-2` |
| spacingHorizontalMNudge | 10px | `px-2.5` |
| spacingHorizontalM | 12px | `px-3` |
| spacingHorizontalL | 16px | `px-4` |
| spacingHorizontalXL | 20px | `px-5` |
| spacingHorizontalXXL | 24px | `px-6` |

### Color Tokens

| Role | Light Mode | Dark Mode |
|------|------------|-----------|
| colorBrandBackground | #0078D4 | #0078D4 |
| colorNeutralBackground1 | #FFFFFF | #292929 |
| colorNeutralBackground2 | #FAFAFA | #1F1F1F |
| colorNeutralForeground1 | #242424 | #FFFFFF |
| colorNeutralForeground2 | #616161 | #D6D6D6 |
| colorNeutralStroke1 | #D1D1D1 | #666666 |
| colorSubtleBackground | transparent | transparent |
| colorSubtleBackgroundHover | #F5F5F5 | #383838 |

### Compound Colors

For interactive elements, Fluent uses compound color tokens:

| State | Background | Border |
|-------|------------|--------|
| Rest | colorCompoundBrandBackground | colorCompoundBrandStroke |
| Hover | colorCompoundBrandBackgroundHover | colorCompoundBrandStrokeHover |
| Pressed | colorCompoundBrandBackgroundPressed | colorCompoundBrandStrokePressed |

### Typography

| Style | Size | Weight | Line Height |
|-------|------|--------|-------------|
| caption2 | 10px | 400 | 14px |
| caption1 | 12px | 400 | 16px |
| body1 | 14px | 400 | 20px |
| body2 | 16px | 400 | 22px |
| subtitle2 | 12px | 600 | 16px |
| subtitle1 | 14px | 600 | 20px |
| title3 | 20px | 600 | 28px |
| title2 | 24px | 600 | 32px |
| title1 | 28px | 600 | 36px |

## Component Specifications

### Button

| Variant | Height | Padding | Border Radius |
|---------|--------|---------|---------------|
| Default | 32px | 12px horizontal | Medium (4px) |
| Small | 24px | 8px horizontal | Medium (4px) |
| Large | 40px | 16px horizontal | Medium (4px) |

### Button Appearances

| Appearance | Background | Border | Text |
|------------|------------|--------|------|
| Primary | Brand | None | White |
| Secondary | Neutral | Stroke | Foreground1 |
| Outline | Transparent | Stroke | Brand |
| Subtle | Transparent | None | Brand |
| Transparent | Transparent | None | Brand |

### Input

| Size | Height | Padding | Border Radius |
|------|--------|---------|---------------|
| Small | 24px | 8px | Medium (4px) |
| Medium | 32px | 12px | Medium (4px) |
| Large | 40px | 16px | Medium (4px) |

### Focus Indicators

- Focus ring: 2px black (light mode) / white (dark mode)
- Offset: 2px from element
- High contrast compliant

## Fluent Design Principles

### Depth

| Level | Shadow | Usage |
|-------|--------|-------|
| 2 | 0 1.6px 3.6px rgba(0,0,0,0.13) | Cards, Dropdowns |
| 4 | 0 3.2px 7.2px rgba(0,0,0,0.13) | Dialogs, Tooltips |
| 8 | 0 6.4px 14.4px rgba(0,0,0,0.13) | Modal, Flyouts |
| 16 | 0 12.8px 28.8px rgba(0,0,0,0.13) | High elevation |
| 64 | 0 25.6px 57.6px rgba(0,0,0,0.22) | Extreme depth |

### Motion

| Duration | Usage |
|----------|-------|
| 50ms | Micro interactions |
| 100ms | Small movements |
| 200ms | Medium transitions |
| 300ms | Large transitions |
| 500ms | Page transitions |

Easing: `cubic-bezier(0.33, 0.0, 0.67, 1.0)` (ease-out)

### Acrylic Material

Fluent's signature translucent effect:

```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(30px);
```

## Validation Checklist

### Sizing

- [ ] Heights match Fluent specs (32px default)
- [ ] Padding matches Fluent spacing tokens
- [ ] Uses Fluent spacing scale

### Shape

- [ ] Corner radius uses Fluent scale (4px default)
- [ ] Consistent radius across component variants

### Colors

- [ ] Uses Fluent color roles (brand, neutral)
- [ ] Supports light and dark mode
- [ ] Compound colors for interactive elements

### States

- [ ] Has proper hover state
- [ ] Has proper pressed state
- [ ] Has proper focus ring (2px, black/white)
- [ ] Disabled state with reduced opacity

### Typography

- [ ] Uses Fluent type scale
- [ ] Proper font weights (400, 600)
- [ ] Line heights match specs

### Motion

- [ ] Transition durations match Fluent
- [ ] Uses ease-out easing
- [ ] Micro-interactions feel native

## Output Format

```markdown
## Fluent Review: {ComponentName}

### Compliance Score: XX/100

### Fluent Mapping
| emul8 Variant | Fluent Equivalent | Status |
|---------------|-------------------|--------|
| primary | Primary | PASS/FAIL |
| secondary | Secondary | PASS/FAIL |
| outline | Outline | PASS/FAIL |
| ghost | Subtle | PASS/FAIL |

### Issues
1. **[SPEC VIOLATION]** Default height is 40px, Fluent uses 32px
2. **[MISSING]** No transparent appearance variant

### Recommendations
1. Add `h-8` (32px) for Fluent default button height
2. Add `transparent` variant with no background

### Token Mapping
```css
/* Suggested Tailwind classes for Fluent */
--fluent-corner-medium: rounded; /* 4px */
--fluent-spacing-m: px-3; /* 12px */
--fluent-height-default: h-8; /* 32px */
```
```

## Fluent Component Reference

Use these as reference when reviewing:

- **Button**: https://fluent2.microsoft.design/components/web/react/button
- **Input**: https://fluent2.microsoft.design/components/web/react/input
- **Checkbox**: https://fluent2.microsoft.design/components/web/react/checkbox
- **Dialog**: https://fluent2.microsoft.design/components/web/react/dialog
- **Menu**: https://fluent2.microsoft.design/components/web/react/menu
- **Card**: https://fluent2.microsoft.design/components/web/react/card
- **Avatar**: https://fluent2.microsoft.design/components/web/react/avatar

---

## Code Generation

### CVA Platform Variant

```tsx
// Add to component's .variants.ts file
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center font-semibold",
    "transition-all duration-100", // Fluent fast duration
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "focus-visible:ring-black dark:focus-visible:ring-white",
  ],
  {
    variants: {
      variant: {
        // Fluent Primary/Accent
        primary: [
          "bg-[#0078D4] text-white",
          "hover:bg-[#106EBE]",
          "active:bg-[#005A9E]",
        ],
        // Fluent Secondary/Default
        secondary: [
          "bg-[#F3F2F1] text-[#323130] border border-[#8A8886]",
          "dark:bg-[#292929] dark:text-[#F3F2F1] dark:border-[#979593]",
          "hover:bg-[#EDEBE9] dark:hover:bg-[#3B3A39]",
          "active:bg-[#E1DFDD] dark:active:bg-[#484644]",
        ],
        // Fluent Outline
        outline: [
          "bg-transparent border border-[#0078D4] text-[#0078D4]",
          "hover:bg-[#0078D4]/10",
          "active:bg-[#0078D4]/20",
        ],
        // Fluent Subtle
        subtle: [
          "bg-transparent text-[#0078D4]",
          "hover:bg-[#F3F2F1] dark:hover:bg-[#383838]",
          "active:bg-[#EDEBE9] dark:active:bg-[#484644]",
        ],
        // Fluent Transparent
        transparent: [
          "bg-transparent text-[#0078D4]",
          "hover:text-[#106EBE]",
        ],
      },
      size: {
        sm: "h-6 px-2 text-xs rounded", // 24px Small
        md: "h-8 px-3 text-sm rounded", // 32px Medium (default)
        lg: "h-10 px-4 text-base rounded", // 40px Large
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  }
);
```

### CSS Variable Tokens

```css
/* Add to globals.css for Fluent support */
[data-platform="windows"] {
  /* Fluent Brand Colors */
  --color-brand-background: #0078D4;
  --color-brand-background-hover: #106EBE;
  --color-brand-background-pressed: #005A9E;
  --color-brand-foreground: #0078D4;

  /* Fluent Neutral Colors - Light */
  --color-neutral-background-1: #FFFFFF;
  --color-neutral-background-2: #FAFAFA;
  --color-neutral-background-3: #F5F5F5;
  --color-neutral-foreground-1: #242424;
  --color-neutral-foreground-2: #616161;
  --color-neutral-foreground-3: #707070;
  --color-neutral-stroke-1: #D1D1D1;
  --color-neutral-stroke-2: #E0E0E0;

  /* Fluent Subtle Colors */
  --color-subtle-background: transparent;
  --color-subtle-background-hover: #F5F5F5;
  --color-subtle-background-pressed: #E0E0E0;

  /* Fluent Border Radius */
  --radius-none: 0px;
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 6px;
  --radius-xl: 8px;
  --radius-circular: 9999px;

  /* Fluent Spacing */
  --spacing-xxs: 2px;
  --spacing-xs: 4px;
  --spacing-s-nudge: 6px;
  --spacing-s: 8px;
  --spacing-m-nudge: 10px;
  --spacing-m: 12px;
  --spacing-l: 16px;
  --spacing-xl: 20px;
  --spacing-xxl: 24px;

  /* Fluent Shadow/Depth */
  --shadow-2: 0 1.6px 3.6px rgba(0,0,0,0.13), 0 0.3px 0.9px rgba(0,0,0,0.1);
  --shadow-4: 0 3.2px 7.2px rgba(0,0,0,0.13), 0 0.6px 1.8px rgba(0,0,0,0.1);
  --shadow-8: 0 6.4px 14.4px rgba(0,0,0,0.13), 0 1.2px 3.6px rgba(0,0,0,0.1);
  --shadow-16: 0 12.8px 28.8px rgba(0,0,0,0.13), 0 2.4px 7.2px rgba(0,0,0,0.1);
  --shadow-64: 0 25.6px 57.6px rgba(0,0,0,0.22), 0 4.8px 14.4px rgba(0,0,0,0.18);

  /* Fluent Motion */
  --duration-ultra-fast: 50ms;
  --duration-faster: 100ms;
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  --easing-ease-out: cubic-bezier(0.33, 0.0, 0.67, 1.0);
}

/* Dark mode */
[data-platform="windows"].dark,
[data-platform="windows"] .dark {
  --color-neutral-background-1: #292929;
  --color-neutral-background-2: #1F1F1F;
  --color-neutral-background-3: #141414;
  --color-neutral-foreground-1: #FFFFFF;
  --color-neutral-foreground-2: #D6D6D6;
  --color-neutral-stroke-1: #666666;
  --color-subtle-background-hover: #383838;
  --color-subtle-background-pressed: #484644;
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
};

export default meta;
type Story = StoryObj<typeof Button>;

// Fluent Platform Story
export const FluentDesign: Story = {
  decorators: [
    (Story) => (
      <div
        data-platform="windows"
        className="p-8 bg-white dark:bg-[#292929] font-['Segoe_UI',sans-serif]"
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="transparent">Transparent</Button>
    </div>
  ),
};

// Fluent Size Scale
export const FluentSizes: Story = {
  decorators: [
    (Story) => (
      <div data-platform="windows" className="p-8">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small (24px)</Button>
      <Button size="md">Medium (32px)</Button>
      <Button size="lg">Large (40px)</Button>
    </div>
  ),
};

// Fluent Focus States
export const FluentFocus: Story = {
  parameters: {
    pseudo: { focusVisible: true },
  },
  render: () => (
    <div className="space-y-4" data-platform="windows">
      <p className="text-sm text-gray-500">
        Fluent uses 2px black/white focus ring with 2px offset
      </p>
      <Button variant="primary" className="focus-visible">
        Focused Button
      </Button>
    </div>
  ),
};

// Fluent Depth/Elevation
export const FluentDepth: Story = {
  render: () => (
    <div className="space-y-4 p-8" data-platform="windows">
      <div className="p-4 bg-white rounded shadow-[0_1.6px_3.6px_rgba(0,0,0,0.13)]">
        Depth 2 - Cards
      </div>
      <div className="p-4 bg-white rounded shadow-[0_3.2px_7.2px_rgba(0,0,0,0.13)]">
        Depth 4 - Dialogs
      </div>
      <div className="p-4 bg-white rounded shadow-[0_6.4px_14.4px_rgba(0,0,0,0.13)]">
        Depth 8 - Flyouts
      </div>
    </div>
  ),
};
```

### Acrylic Material Effect

```tsx
// components/Acrylic.tsx
import { cn } from "@/utils/cn";

interface AcrylicProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "thin" | "regular" | "thick";
}

const blurIntensity = {
  thin: "backdrop-blur-sm",
  regular: "backdrop-blur-md",
  thick: "backdrop-blur-lg",
};

const bgOpacity = {
  thin: "bg-white/50 dark:bg-black/50",
  regular: "bg-white/70 dark:bg-black/70",
  thick: "bg-white/85 dark:bg-black/85",
};

export function Acrylic({
  children,
  className,
  intensity = "regular",
}: AcrylicProps) {
  return (
    <div
      className={cn(
        blurIntensity[intensity],
        bgOpacity[intensity],
        "border border-white/20",
        className
      )}
    >
      {children}
    </div>
  );
}

// Usage
<Acrylic intensity="regular" className="p-4 rounded-lg">
  <h2>Fluent Acrylic Panel</h2>
  <p>Content with translucent background</p>
</Acrylic>
```

### Reveal Effect Hook

```tsx
// hooks/useReveal.ts
import { useCallback, useRef } from "react";

export function useReveal() {
  const elementRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    elementRef.current.style.setProperty("--reveal-x", `${x}px`);
    elementRef.current.style.setProperty("--reveal-y", `${y}px`);
  }, []);

  return { ref: elementRef, onMouseMove: handleMouseMove };
}

// CSS for reveal effect
// .reveal-effect {
//   background: radial-gradient(
//     circle at var(--reveal-x, 50%) var(--reveal-y, 50%),
//     rgba(255, 255, 255, 0.1) 0%,
//     transparent 50%
//   );
// }
```
