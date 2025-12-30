import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, ReactNode } from 'react';
import type { coverVariants } from './Cover.variants';

export interface CoverProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof coverVariants> {
  /**
   * Minimum height of the cover.
   * @default "100vh"
   */
  minHeight?: string;
  /**
   * Content to display at the top of the cover.
   */
  top?: ReactNode;
  /**
   * Content to display at the bottom of the cover.
   */
  bottom?: ReactNode;
}
