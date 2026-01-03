import { type CSSProperties, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { responsiveGap } from '../../utils/responsive';
import { Slot } from '../../utils/slot';
import type { GridProps } from './Grid.types';
import { gridVariants } from './Grid.variants';

/**
 * Grid creates a responsive grid layout.
 *
 * By default, items automatically fill available space and wrap when they
 * can't maintain their minimum width. Use `columns` for fixed column count.
 *
 * Supports responsive gap using Cedar-style @breakpoint notation:
 * @example
 * <Grid gap="sm md@md lg@lg" />
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, gap, columns, min = '250px', asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    const isResponsiveGap = typeof gap === 'string' && gap.includes('@');

    const gridStyle: CSSProperties = {
      ...style,
      gridTemplateColumns: columns
        ? `repeat(${columns}, 1fr)`
        : `repeat(auto-fill, minmax(min(${min}, 100%), 1fr))`,
    };

    return (
      <Comp
        ref={ref}
        className={cn(
          gridVariants({ gap: isResponsiveGap ? undefined : gap }),
          isResponsiveGap && responsiveGap(gap),
          className
        )}
        style={gridStyle}
        {...props}
      />
    );
  }
);

Grid.displayName = 'Grid';
