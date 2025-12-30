import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { boxVariants } from './Box.variants';

export interface BoxProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof boxVariants> {
  /** Render as a different element using the Slot pattern. */
  asChild?: boolean;
}
