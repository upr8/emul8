import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { stackVariants } from './Stack.variants';

export interface StackProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  /**
   * Split the stack after this child index (0-based).
   * Children after this index will be pushed to the opposite end using auto margin.
   */
  splitAfter?: number;
}
