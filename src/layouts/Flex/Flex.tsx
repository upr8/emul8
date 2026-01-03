import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import {
  isResponsiveObject,
  responsiveGap,
  responsiveGapX,
  responsiveGapY,
} from '../../utils/responsive';
import { Slot } from '../../utils/slot';
import type { FlexProps } from './Flex.types';
import { flexVariants } from './Flex.variants';

/**
 * Flex is an explicit flexbox container with comprehensive flex props.
 *
 * Use Flex when you want to signal "this is a flex layout" and need
 * fine-grained control over flex behavior.
 *
 * Supports responsive gap using object syntax:
 * @example
 * <Flex gap={{ base: 'sm', md: 'md', lg: 'lg' }} />
 * <Flex gapX="md" gapY="lg" />
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      direction,
      align,
      justify,
      wrap,
      gap,
      gapX,
      gapY,
      inline,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'div';
    const isResponsiveGap = isResponsiveObject(gap);
    const hasSeparateGaps = gapX !== undefined || gapY !== undefined;

    return (
      <Comp
        ref={ref}
        className={cn(
          flexVariants({
            direction,
            align,
            justify,
            wrap,
            gap: isResponsiveGap || hasSeparateGaps ? undefined : gap,
            inline,
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

Flex.displayName = 'Flex';
