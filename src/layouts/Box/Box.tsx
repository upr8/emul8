import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Slot } from '../../utils/slot';
import type { BoxProps } from './Box.types';
import { boxVariants } from './Box.variants';

/**
 * Box is a simple container with padding and optional border.
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ className, padding, borderWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp ref={ref} className={cn(boxVariants({ padding, borderWidth }), className)} {...props} />
    );
  }
);

Box.displayName = 'Box';
