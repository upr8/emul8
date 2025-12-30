import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Slot } from '../../utils/slot';
import type { GroupProps } from './Group.types';
import { groupVariants } from './Group.variants';

/**
 * Group creates a semantic inline grouping of elements.
 *
 * Perfect for button groups, icon + text pairs, or any inline
 * collection of related controls.
 */
export const Group = forwardRef<HTMLDivElement, GroupProps>(
  ({ className, gap, align, grow, preventGrow, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        role="group"
        className={cn(groupVariants({ gap, align, grow, preventGrow }), className)}
        {...props}
      />
    );
  }
);

Group.displayName = 'Group';
