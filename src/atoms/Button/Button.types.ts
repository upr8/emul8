import type { VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { buttonVariants } from './Button.variants';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Button content */
  children: ReactNode;
  /** Render as a different element using Radix Slot */
  asChild?: boolean;
  /** Loading state - shows spinner and disables button */
  loading?: boolean;
}
