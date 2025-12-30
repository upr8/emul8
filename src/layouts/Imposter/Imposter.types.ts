import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { imposterVariants } from './Imposter.variants';

export interface ImposterProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof imposterVariants> {
  /**
   * When true, the imposter ignores size constraints and fills its container.
   */
  breakout?: boolean;
  /**
   * Margin/inset from the edges when not breaking out.
   * @default "0px"
   */
  margin?: string;
}
