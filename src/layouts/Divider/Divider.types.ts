import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { dividerVariants } from './Divider.variants';

export interface DividerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  /**
   * Accessible label for the divider.
   */
  label?: string;
}
