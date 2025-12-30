import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { gridVariants } from './Grid.variants';

export interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /**
   * Minimum width for each grid item before wrapping.
   * Uses CSS grid auto-fill with minmax.
   * @default "250px"
   */
  min?: string;
  /**
   * Render as a different element using the Slot pattern.
   */
  asChild?: boolean;
}
