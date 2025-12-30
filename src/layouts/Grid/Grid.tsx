import { type CSSProperties, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Slot } from '../../utils/slot';
import type { GridProps } from './Grid.types';
import { gridVariants } from './Grid.variants';

/**
 * Grid creates an auto-filling responsive grid.
 *
 * Items automatically fill available space and wrap when they
 * can't maintain their minimum width.
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, gap, min = '250px', asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    const gridStyle: CSSProperties = {
      ...style,
      gridTemplateColumns: `repeat(auto-fill, minmax(min(${min}, 100%), 1fr))`,
    };

    return (
      <Comp
        ref={ref}
        className={cn(gridVariants({ gap }), className)}
        style={gridStyle}
        {...props}
      />
    );
  }
);

Grid.displayName = 'Grid';
