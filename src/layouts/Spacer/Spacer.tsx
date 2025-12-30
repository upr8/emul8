import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { SpacerProps } from './Spacer.types';
import { spacerVariants } from './Spacer.variants';

/**
 * Spacer creates flexible whitespace in flex containers.
 *
 * By default, it grows to fill available space (flex-grow: 1).
 * Use size variants for fixed-size spacing.
 */
export const Spacer = forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(spacerVariants({ size }), className)}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Spacer.displayName = 'Spacer';
