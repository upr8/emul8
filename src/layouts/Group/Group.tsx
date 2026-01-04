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
 *
 * **IMPORTANT (WCAG 1.3.1):** Components with `role="group"` require an accessible name.
 * You MUST provide either `aria-label` or `aria-labelledby` for screen readers.
 */
export const Group = forwardRef<HTMLDivElement, GroupProps>(
  (
    {
      className,
      gap,
      align,
      grow,
      preventGrow,
      asChild = false,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'div';

    // Warn in development if aria-label is missing (required for role="group")
    if (process.env.NODE_ENV === 'development' && !ariaLabel && !props['aria-labelledby']) {
      // oxlint-disable-next-line no-console -- intentional development warning
      console.warn(
        'Group: Missing aria-label or aria-labelledby. ' +
          'Components with role="group" require an accessible name for screen readers.'
      );
    }

    return (
      <Comp
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        className={cn(groupVariants({ gap, align, grow, preventGrow }), className)}
        {...props}
      />
    );
  }
);

Group.displayName = 'Group';
