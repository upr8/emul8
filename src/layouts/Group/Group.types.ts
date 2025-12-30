import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { groupVariants } from './Group.variants';

/**
 * Props for the Group component.
 *
 * Group uses `role="group"` which requires an accessible name.
 * Always provide `aria-label` or `aria-labelledby` for screen readers.
 *
 * @example
 * ```tsx
 * <Group aria-label="Text formatting options">
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
