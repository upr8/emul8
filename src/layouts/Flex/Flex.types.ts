import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { flexVariants } from './Flex.variants';

export interface FlexProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  /**
   * Render as a different element using the Slot pattern.
   */
  asChild?: boolean;
}
