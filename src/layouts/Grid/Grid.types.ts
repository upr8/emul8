import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { gridVariants } from './Grid.variants';

export interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
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
