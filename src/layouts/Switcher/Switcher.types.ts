import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { switcherVariants } from './Switcher.variants';

export interface SwitcherProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof switcherVariants> {
  /**
   * The container width at which the layout switches from horizontal to vertical.
   * @default "30rem"
   */
  threshold?: string;
  /**
   * Maximum number of items before forcing vertical layout.
   */
  limit?: number;
}
