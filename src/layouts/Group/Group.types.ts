import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { groupVariants } from './Group.variants';

/**
 * Props for the Group component.
 *
 * **IMPORTANT (WCAG 1.3.1):** Group uses `role="group"` which requires an accessible name.
 * You MUST provide either `aria-label` or `aria-labelledby` for screen readers.
 * A development warning will be logged if neither is provided.
 *
 * @example
 * ```tsx
 * // With aria-label (recommended for simple labels)
 * <Group aria-label="Text formatting options">
 *   <Button>Bold</Button>
 *   <Button>Italic</Button>
 * </Group>
 *
 * // With aria-labelledby (for visible labels)
 * <label id="format-label">Formatting:</label>
 * <Group aria-labelledby="format-label">
 *   <Button>Bold</Button>
 *   <Button>Italic</Button>
 * </Group>
 * ```
 */
export interface GroupProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof groupVariants> {
  /**
   * Render as a different element using the Slot pattern.
   * When using asChild, you are responsible for semantic HTML and ARIA.
   */
  asChild?: boolean;
}
