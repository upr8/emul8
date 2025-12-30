import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Slot } from '../../utils/slot';
import type { FlexProps } from './Flex.types';
import { flexVariants } from './Flex.variants';

/**
 * Flex is an explicit flexbox container with comprehensive flex props.
 *
 * Use Flex when you want to signal "this is a flex layout" and need
 * fine-grained control over flex behavior.
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ className, direction, align, justify, wrap, gap, inline, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={cn(flexVariants({ direction, align, justify, wrap, gap, inline }), className)}
        {...props}
      />
    );
  }
);

Flex.displayName = 'Flex';
