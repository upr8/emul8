import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { GapSize, ResponsiveValue } from '../../utils/responsive';
import type { gridVariants } from './Grid.variants';

export interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof gridVariants>, 'gap'> {
  /**
   * Gap between grid items.
   * Supports responsive values using object syntax.
   *
   * @example
   * // Static gap
   * <Grid gap="md" />
   *
   * @example
   * // Responsive gap
   * <Grid gap={{ base: 'sm', md: 'md', lg: 'lg' }} />
   */
  gap?: VariantProps<typeof gridVariants>['gap'] | ResponsiveValue<GapSize>;
  /**
   * Column gap (horizontal spacing between items).
   * Overrides `gap` for the horizontal axis.
   *
   * @example
   * <Grid gapX="lg" gapY="sm" />
   * <Grid gapX={{ base: 'sm', md: 'lg' }} />
   */
  gapX?: ResponsiveValue<GapSize>;
  /**
   * Row gap (vertical spacing between items).
   * Overrides `gap` for the vertical axis.
   *
   * @example
   * <Grid gapX="lg" gapY="sm" />
   * <Grid gapY={{ base: 'xs', md: 'md' }} />
   */
  gapY?: ResponsiveValue<GapSize>;
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
