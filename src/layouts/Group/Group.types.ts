import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { groupVariants } from './Group.variants';

export interface GroupProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof groupVariants> {
  /**
   * Render as a different element using the Slot pattern.
   */
  asChild?: boolean;
}
