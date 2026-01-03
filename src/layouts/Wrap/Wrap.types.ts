import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { ResponsiveValue } from '../../utils/responsive';
import type { wrapVariants } from './Wrap.variants';

export interface WrapProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof wrapVariants>, 'gap'> {
  /**
   * Gap between wrapped items.
   * Supports responsive values using Cedar-style @breakpoint notation.
   *
   * @example
   * // Static gap
   * <Wrap gap="md" />
   *
   * @example
   * // Responsive gap
   * <Wrap gap="sm md@md lg@lg" />
   */
  gap?: VariantProps<typeof wrapVariants>['gap'] | ResponsiveValue;
  /**
   * Render as a different element using the Slot pattern.
   */
  asChild?: boolean;
}
