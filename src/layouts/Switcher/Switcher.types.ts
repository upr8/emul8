import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { switcherVariants } from './Switcher.variants';

export interface SwitcherProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof switcherVariants> {
  /**
   * The container width at which the layout switches from horizontal to vertical.
   * Accepts any valid CSS length value.
   * @default "30rem"
   * @example "30rem", "600px", "40ch"
   */
  threshold?: string;
  /**
   * Maximum number of items before forcing vertical layout.
   */
  limit?: number;
}
