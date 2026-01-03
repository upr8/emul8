import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { ResponsiveValue } from '../../utils/responsive';
import type { stackVariants } from './Stack.variants';

export interface StackProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof stackVariants>, 'gap'> {
  /**
   * Gap between stack items.
   * Supports responsive values using Cedar-style @breakpoint notation.
   *
   * @example
   * // Static gap
   * <Stack gap="md" />
   *
   * @example
   * // Responsive gap
   * <Stack gap="sm md@md lg@lg" />
   */
  gap?: VariantProps<typeof stackVariants>['gap'] | ResponsiveValue;
  /**
   * Split the stack after this child index (0-based).
   * Children after this index will be pushed to the opposite end using auto margin.
   */
  splitAfter?: number;
}
