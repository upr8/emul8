import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { reelVariants } from './Reel.variants';

export interface ReelProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof reelVariants> {
  /**
   * The width of each item in the reel.
   * @default "auto"
   */
  itemWidth?: string;
  /**
   * The height of the reel container.
   * @default "auto"
   */
  height?: string;
}
