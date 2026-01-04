import type { VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { buttonVariants } from './Button.variants';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Button content */
  children: ReactNode;
  /** Render as a different element using Radix Slot
   * @example
   * <Button asChild>
   *   <a href="/path">Link styled as button</a>
   * </Button>
   */
  asChild?: boolean;
  /** Loading state - shows spinner and disables button */
  loading?: boolean;
  /** Visual style variant
   * @default "primary"
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'outline';
  /** Button size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg' | 'icon';
  /** Whether button takes full width of container */
  fullWidth?: boolean;
}
