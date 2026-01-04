# Human Interface Guidelines Review Agent

## Purpose

Validate components against Apple Human Interface Guidelines (HIG) for iOS/macOS platform compatibility.

## Usage

```
/hig-review <ComponentName>
/hig-review --all
```

## Reference

- Official docs: https://developer.apple.com/design/human-interface-guidelines
- Components: https://developer.apple.com/design/human-interface-guidelines/components
- iOS Design: https://developer.apple.com/design/human-interface-guidelines/designing-for-ios

## HIG Design Tokens

### Corner Radius

| Element | Radius | Tailwind |
|---------|--------|----------|
| Small controls | 6pt | `rounded-md` |
| Buttons | 10pt | `rounded-lg` |
| Cards | 12pt | `rounded-xl` |
| Sheets | 12pt | `rounded-xl` |
| Large elements | 20pt | `rounded-2xl` |

### System Colors

| Color | Usage | Light | Dark |
|-------|-------|-------|------|
| systemBlue | Links, buttons | #007AFF | #0A84FF |
| systemGreen | Success | #34C759 | #30D158 |
| systemRed | Destructive | #FF3B30 | #FF453A |
| systemOrange | Warning | #FF9500 | #FF9F0A |
| systemGray | Secondary | #8E8E93 | #8E8E93 |

### Semantic Colors

| Role | Usage |
|------|-------|
| label | Primary text |
| secondaryLabel | Secondary text |
| tertiaryLabel | Tertiary text |
| separator | Dividers |
| systemBackground | Primary background |
| secondarySystemBackground | Secondary background |

### Touch Targets

- **Minimum**: 44pt x 44pt
- Applies to all tappable elements
- Include padding in touch target, not just visual element

### Typography (San Francisco)

| Style | Size | Weight |
|-------|------|--------|
| Large Title | 34pt | Bold |
| Title 1 | 28pt | Bold |
| Title 2 | 22pt | Bold |
| Title 3 | 20pt | Semibold |
| Headline | 17pt | Semibold |
| Body | 17pt | Regular |
| Callout | 16pt | Regular |
| Subheadline | 15pt | Regular |
| Footnote | 13pt | Regular |
| Caption 1 | 12pt | Regular |
| Caption 2 | 11pt | Regular |

## Component Specifications

### Buttons

| Type | Height | Style |
|------|--------|-------|
| Standard | 44pt | Filled or bordered |
| Small | 28pt | Text style |
| Navigation Bar | 44pt | Text or icon |
| Tab Bar | 49pt (total bar) | Icon + label |

### Navigation Bar

- Height: 44pt (compact), 96pt (large title)
- Back button: Chevron + label
- Title: Centered, bold

### Tab Bar

- Height: 49pt (home indicator adds 34pt on Face ID devices)
- Icons: SF Symbols, 25pt
- Labels: 10pt Caption 2

### Materials & Vibrancy

| Material | Usage |
|----------|-------|
| Thin | Overlays on content |
| Regular | Sidebars, popovers |
| Thick | Full-screen modals |
| Ultra Thin | Status bar backgrounds |

## Validation Checklist

### Touch Targets

- [ ] All tappable elements are 44pt x 44pt minimum
- [ ] Padding included in touch target calculation
- [ ] Sufficient spacing between touch targets

### Typography

- [ ] Uses system font sizes (17pt body, etc.)
- [ ] Supports Dynamic Type scaling
- [ ] Proper weight for hierarchy

### Colors

- [ ] Uses semantic colors (label, background)
- [ ] Supports light and dark mode
- [ ] Uses system colors for common actions (blue for links)

### Shape

- [ ] Corner radius matches HIG (10pt for buttons)
- [ ] Consistent radius within component family

### Gestures

- [ ] Supports swipe gestures where appropriate
- [ ] Edge swipe for back navigation
- [ ] Pull to refresh where applicable

### Safe Areas

- [ ] Respects safe area insets
- [ ] Home indicator area clear
- [ ] Notch/Dynamic Island aware

### SF Symbols

- [ ] Uses SF Symbols for icons
- [ ] Proper symbol weight matching text
- [ ] Multicolor symbols where appropriate

## Output Format

```markdown
## HIG Review: {ComponentName}

### Compliance Score: XX/100

### HIG Mapping
| emul8 Variant | iOS Equivalent | Status |
|---------------|----------------|--------|
| primary | Filled | PASS/FAIL |
| secondary | Gray/Tinted | PASS/FAIL |
| danger | Destructive (Red) | PASS/FAIL |

### Issues
1. **[HIG VIOLATION]** Touch target is 40px, HIG requires 44pt minimum
2. **[MISSING]** No support for Dynamic Type

### Recommendations
1. Add `min-h-11` (44px) for HIG touch target compliance
2. Use relative font sizes for Dynamic Type support

### Token Mapping
```css
/* Suggested Tailwind classes for HIG */
--hig-corner-button: rounded-lg; /* 10pt */
--hig-touch-target: min-h-11 min-w-11; /* 44pt */
--hig-system-blue: #007AFF;
```
```

## HIG Component Reference

Use these as reference when reviewing:

- **Buttons**: https://developer.apple.com/design/human-interface-guidelines/buttons
- **Navigation Bars**: https://developer.apple.com/design/human-interface-guidelines/navigation-bars
- **Tab Bars**: https://developer.apple.com/design/human-interface-guidelines/tab-bars
- **Lists**: https://developer.apple.com/design/human-interface-guidelines/lists-and-tables
- **Sheets**: https://developer.apple.com/design/human-interface-guidelines/sheets
- **Modals**: https://developer.apple.com/design/human-interface-guidelines/modality
- **Text Fields**: https://developer.apple.com/design/human-interface-guidelines/text-fields

## iOS-Specific Patterns

### Swipe Actions

```
← Swipe Left: Destructive action (Delete)
→ Swipe Right: Primary action (Archive, Flag)
```

### Pull to Refresh

- Standard iOS refresh control
- Haptic feedback on threshold

### Context Menus

- Long press to reveal
- Preview with actions
- SF Symbol icons

---

## Code Generation

### CVA Platform Variant

```tsx
// Add to component's .variants.ts file
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center font-semibold",
    "transition-all duration-250", // HIG standard duration
    "focus-visible:outline-none focus-visible:ring-2",
    "active:opacity-70", // iOS press feedback
  ],
  {
    variants: {
      variant: {
        // HIG Filled/Tinted Button
        filled: [
          "bg-[#007AFF] text-white",
          "dark:bg-[#0A84FF]",
          "hover:brightness-110",
        ],
        // HIG Gray Button
        gray: [
          "bg-[#E5E5EA] text-[#007AFF]",
          "dark:bg-[#3A3A3C] dark:text-[#0A84FF]",
        ],
        // HIG Bordered Button
        bordered: [
          "border border-[#007AFF] bg-transparent text-[#007AFF]",
          "dark:border-[#0A84FF] dark:text-[#0A84FF]",
        ],
        // HIG Plain/Text Button
        plain: [
          "bg-transparent text-[#007AFF]",
          "dark:text-[#0A84FF]",
        ],
        // HIG Destructive Button
        destructive: [
          "bg-[#FF3B30] text-white",
          "dark:bg-[#FF453A]",
        ],
      },
      size: {
        sm: "h-7 px-3 text-sm rounded-md", // 28pt Small
        md: "h-11 px-4 text-base rounded-lg min-w-11", // 44pt Standard + touch target
        lg: "h-[50px] px-6 text-lg rounded-xl", // 50pt Large
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
/* Add to globals.css for HIG support */
[data-platform="ios"] {
  /* HIG System Colors - Light */
  --color-system-blue: #007AFF;
  --color-system-green: #34C759;
  --color-system-red: #FF3B30;
  --color-system-orange: #FF9500;
  --color-system-yellow: #FFCC00;
  --color-system-gray: #8E8E93;

  /* HIG Semantic Colors */
  --color-label: #000000;
  --color-secondary-label: #3C3C4399;
  --color-tertiary-label: #3C3C434D;
  --color-separator: #3C3C4349;
  --color-system-background: #FFFFFF;
  --color-secondary-system-background: #F2F2F7;

  /* HIG Corner Radius */
  --radius-sm: 6px;   /* Small controls */
  --radius-md: 10px;  /* Buttons */
  --radius-lg: 12px;  /* Cards, Sheets */
  --radius-xl: 20px;  /* Large elements */

  /* HIG Touch Target */
  --touch-target-min: 44px;

  /* HIG Motion */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;
  --easing-default: cubic-bezier(0.25, 0.1, 0.25, 1);

  /* HIG Typography */
  --font-weight-regular: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}

/* Dark mode overrides */
[data-platform="ios"].dark,
[data-platform="ios"] .dark {
  --color-system-blue: #0A84FF;
  --color-system-green: #30D158;
  --color-system-red: #FF453A;
  --color-label: #FFFFFF;
  --color-system-background: #000000;
  --color-secondary-system-background: #1C1C1E;
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

// HIG Platform Story
export const HumanInterfaceGuidelines: Story = {
  decorators: [
    (Story) => (
      <div
        data-platform="ios"
        className="p-8 bg-[#F2F2F7] dark:bg-[#1C1C1E] font-[-apple-system,BlinkMacSystemFont]"
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="filled">Filled</Button>
      <Button variant="gray">Gray</Button>
      <Button variant="bordered">Bordered</Button>
      <Button variant="plain">Plain</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  ),
};

// HIG Touch Target Verification
export const HIGTouchTargets: Story = {
  decorators: [
    (Story) => (
      <div data-platform="ios" className="p-8">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        All buttons meet 44pt minimum touch target
      </p>
      <div className="relative inline-block">
        <Button size="md">Button</Button>
        <div className="absolute inset-0 border-2 border-dashed border-blue-500/30 rounded-lg pointer-events-none" />
      </div>
    </div>
  ),
};

// HIG System Colors
export const HIGColors: Story = {
  render: () => (
    <div className="space-y-4" data-platform="ios">
      <div className="flex gap-2">
        <Button variant="filled">systemBlue</Button>
        <Button variant="destructive">systemRed</Button>
      </div>
      <p className="text-xs text-gray-500">
        Colors automatically adapt to dark mode
      </p>
    </div>
  ),
};
```

### Haptic Feedback Hook

```tsx
// hooks/useHaptic.ts
type HapticStyle = "light" | "medium" | "heavy" | "selection" | "success" | "warning" | "error";

export function useHaptic() {
  const trigger = (style: HapticStyle = "light") => {
    // Check if running in Tauri on iOS
    if (typeof window !== "undefined" && "navigator" in window) {
      // Use Tauri haptic plugin or fallback to vibration API
      if ("vibrate" in navigator) {
        const patterns: Record<HapticStyle, number[]> = {
          light: [10],
          medium: [20],
          heavy: [30],
          selection: [5],
          success: [10, 50, 10],
          warning: [30, 50, 30],
          error: [50, 100, 50],
        };
        navigator.vibrate(patterns[style]);
      }
    }
  };

  return { trigger };
}

// Usage
function Button({ onClick, ...props }) {
  const { trigger } = useHaptic();

  const handleClick = (e) => {
    trigger("light");
    onClick?.(e);
  };

  return <button onClick={handleClick} {...props} />;
}
```

### Dynamic Type Support

```tsx
// For iOS Dynamic Type scaling
const dynamicTypeScale = {
  "caption2": "text-[11px] leading-[13px]",
  "caption1": "text-[12px] leading-[16px]",
  "footnote": "text-[13px] leading-[18px]",
  "subheadline": "text-[15px] leading-[20px]",
  "body": "text-[17px] leading-[22px]",
  "headline": "text-[17px] leading-[22px] font-semibold",
  "title3": "text-[20px] leading-[25px] font-semibold",
  "title2": "text-[22px] leading-[28px] font-bold",
  "title1": "text-[28px] leading-[34px] font-bold",
  "largeTitle": "text-[34px] leading-[41px] font-bold",
};

// Usage with CVA
const textVariants = cva("", {
  variants: {
    style: dynamicTypeScale,
  },
  defaultVariants: {
    style: "body",
  },
});
```
