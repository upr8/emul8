import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { ResponsiveValue } from '../../utils/responsive';
import type { flexVariants } from './Flex.variants';

export interface FlexProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof flexVariants>, 'gap'> {
  /**
   * Gap between flex items.
   * Supports responsive values using Cedar-style @breakpoint notation.
   *
   * @example
   * // Static gap
   * <Flex gap="md" />
   *
   * @example
   * // Responsive gap
   * <Flex gap="sm md@md lg@lg" />
   */
  gap?: VariantProps<typeof flexVariants>['gap'] | ResponsiveValue;
  /**
   * Render as a different element using the Slot pattern.
   */
  asChild?: boolean;
}
