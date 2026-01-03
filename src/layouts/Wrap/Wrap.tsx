import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import {
  isResponsiveObject,
  responsiveGap,
  responsiveGapX,
  responsiveGapY,
} from '../../utils/responsive';
import { Slot } from '../../utils/slot';
import type { WrapProps } from './Wrap.types';
import { wrapVariants } from './Wrap.variants';

/**
 * Wrap creates a flex container that wraps its children naturally.
 *
 * Perfect for tag clouds, button groups, chips, or any collection
 * of variable-width items that should wrap to the next line.
 *
 * Supports responsive gap using object syntax:
 * @example
 * <Wrap gap={{ base: 'sm', md: 'md', lg: 'lg' }} />
 * <Wrap gapX="md" gapY="lg" />
 */
export const Wrap = forwardRef<HTMLDivElement, WrapProps>(
  ({ className, gap, gapX, gapY, align, justify, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    const isResponsiveGap = isResponsiveObject(gap);
    const hasSeparateGaps = gapX !== undefined || gapY !== undefined;

    return (
      <Comp
        ref={ref}
        className={cn(
          wrapVariants({
            gap: isResponsiveGap || hasSeparateGaps ? undefined : gap,
            align,
            justify,
          }),
          isResponsiveGap && responsiveGap(gap),
          gapX && responsiveGapX(gapX),
          gapY && responsiveGapY(gapY),
          className
        )}
        {...props}
      />
    );
  }
);

Wrap.displayName = 'Wrap';
