import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { wrapVariants } from './Wrap.variants';

export interface WrapProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wrapVariants> {
  /**
   * Render as a different element using the Slot pattern.
   */
  asChild?: boolean;
}
