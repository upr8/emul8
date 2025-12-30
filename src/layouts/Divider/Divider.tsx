import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { DividerProps } from './Divider.types';
import { dividerVariants } from './Divider.variants';

/**
 * Divider creates a visual separator between content.
 *
 * Supports horizontal and vertical orientations with size variants.
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation, size, label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation ?? 'horizontal'}
        aria-label={label}
        className={cn(dividerVariants({ orientation, size }), className)}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
