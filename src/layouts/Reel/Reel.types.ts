import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { reelVariants } from './Reel.variants';

export interface ReelProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof reelVariants> {
  /**
   * The width of each item in the reel.
   * Accepts any valid CSS length value.
   * @default "auto"
   * @example "200px", "15rem", "25vw"
   */
  itemWidth?: string;
  /**
   * The height of the reel container.
   * Accepts any valid CSS length value.
   * @default "auto"
   * @example "300px", "20rem", "50vh"
   */
  height?: string;
}
