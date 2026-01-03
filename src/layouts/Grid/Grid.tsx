import { type CSSProperties, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import {
  isResponsiveObject,
  responsiveGap,
  responsiveGapX,
  responsiveGapY,
} from '../../utils/responsive';
import { Slot } from '../../utils/slot';
import type { GridProps } from './Grid.types';
import { gridVariants } from './Grid.variants';

/**
 * Grid creates a responsive grid layout.
 *
 * By default, items automatically fill available space and wrap when they
 * can't maintain their minimum width. Use `columns` for fixed column count.
 *
 * Supports responsive gap using object syntax:
 * @example
 * <Grid gap={{ base: 'sm', md: 'md', lg: 'lg' }} />
 * <Grid gapX="md" gapY="lg" />
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    { className, gap, gapX, gapY, columns, min = '250px', asChild = false, style, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'div';
    const isResponsiveGap = isResponsiveObject(gap);

    const gridStyle: CSSProperties = {
      ...style,
      gridTemplateColumns: columns
        ? `repeat(${columns}, 1fr)`
        : `repeat(auto-fill, minmax(min(${min}, 100%), 1fr))`,
    };

    // Determine if we should use separate axis gaps
    const hasSeparateGaps = gapX !== undefined || gapY !== undefined;

    return (
      <Comp
        ref={ref}
        className={cn(
          gridVariants({ gap: isResponsiveGap || hasSeparateGaps ? undefined : gap }),
          isResponsiveGap && responsiveGap(gap),
          gapX && responsiveGapX(gapX),
          gapY && responsiveGapY(gapY),
          className
        )}
        style={gridStyle}
        {...props}
      />
    );
  }
);

Grid.displayName = 'Grid';
