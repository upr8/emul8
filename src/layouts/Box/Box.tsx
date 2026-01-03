import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import {
  responsiveH,
  responsiveM,
  responsiveMb,
  responsiveMl,
  responsiveMr,
  responsiveMt,
  responsiveMx,
  responsiveMy,
  responsiveP,
  responsivePb,
  responsivePl,
  responsivePr,
  responsivePt,
  responsivePx,
  responsivePy,
  responsiveW,
} from '../../utils/responsive';
import { Slot } from '../../utils/slot';
import type { BoxProps } from './Box.types';
import { boxVariants } from './Box.variants';

/**
 * Box is a polymorphic container with layout props.
 *
 * Supports Radix-style shorthand props for padding, margin, and dimensions.
 *
 * @example
 * <Box p="4" mx="auto" />
 * <Box p={{ base: '2', md: '4' }} />
 * <Box as="section" p="4" />
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      padding,
      borderWidth,
      asChild = false,
      as,
      p,
      px: pxProp,
      py: pyProp,
      pt,
      pr,
      pb,
      pl,
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      w,
      h,
      ...props
    },
    ref
  ) => {
    // Determine the component to render
    // Priority: asChild > as > 'div'
    let Comp: React.ElementType = 'div';
    if (asChild) {
      Comp = Slot;
    } else if (as) {
      Comp = as;
    }

    // Only apply boxVariants padding if no shorthand props are used
    const hasShorthandPadding =
      p !== undefined ||
      pxProp !== undefined ||
      pyProp !== undefined ||
      pt !== undefined ||
      pr !== undefined ||
      pb !== undefined ||
      pl !== undefined;

    return (
      <Comp
        ref={ref}
        className={cn(
          boxVariants({
            padding: hasShorthandPadding ? 'none' : padding,
            borderWidth,
          }),
          // Padding props
          responsiveP(p),
          responsivePx(pxProp),
          responsivePy(pyProp),
          responsivePt(pt),
          responsivePr(pr),
          responsivePb(pb),
          responsivePl(pl),
          // Margin props
          responsiveM(m),
          responsiveMx(mx),
          responsiveMy(my),
          responsiveMt(mt),
          responsiveMr(mr),
          responsiveMb(mb),
          responsiveMl(ml),
          // Dimension props
          responsiveW(w),
          responsiveH(h),
          className
        )}
        {...props}
      />
    );
  }
);

Box.displayName = 'Box';
