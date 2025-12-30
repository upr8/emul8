import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Slot } from '../../utils/slot';
import type { WrapProps } from './Wrap.types';
import { wrapVariants } from './Wrap.variants';

/**
 * Wrap creates a flex container that wraps its children naturally.
 *
 * Perfect for tag clouds, button groups, chips, or any collection
 * of variable-width items that should wrap to the next line.
 */
export const Wrap = forwardRef<HTMLDivElement, WrapProps>(
  ({ className, gap, align, justify, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp ref={ref} className={cn(wrapVariants({ gap, align, justify }), className)} {...props} />
    );
  }
);

Wrap.displayName = 'Wrap';
