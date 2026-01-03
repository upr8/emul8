import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { ResponsiveValue } from '../../utils/responsive';
import type { gridVariants } from './Grid.variants';

export interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof gridVariants>, 'gap'> {
  /**
   * Gap between grid items.
   * Supports responsive values using Cedar-style @breakpoint notation.
   *
   * @example
   * // Static gap
   * <Grid gap="md" />
   *
   * @example
   * // Responsive gap
   * <Grid gap="sm md@md lg@lg" />
   */
  gap?: VariantProps<typeof gridVariants>['gap'] | ResponsiveValue;
  /**
   * Fixed number of columns. When set, overrides auto-fill behavior.
   * Use this for predictable column layouts.
   */
  columns?: number;
  /**
   * Minimum width for each grid item before wrapping.
   * Uses CSS grid auto-fill with minmax. Ignored when `columns` is set.
   * Accepts any valid CSS length value.
   * @default "250px"
   * @example "250px", "15rem", "200px"
   */
  min?: string;
  /**
   * Render as a different element using the Slot pattern.
   */
  asChild?: boolean;
}
