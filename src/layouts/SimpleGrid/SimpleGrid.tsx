import { type CSSProperties, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import {
  responsiveGap,
  responsiveGapX,
  responsiveGapY,
  responsiveGridColumns,
} from '../../utils/responsive';
import { Slot } from '../../utils/slot';
import type { SimpleGridProps } from './SimpleGrid.types';

/**
 * SimpleGrid creates a responsive grid with equal-width columns.
 *
 * Use `columns` for fixed column layouts with responsive control,
 * or `minChildWidth` for auto-responsive layouts.
 *
 * @example
 * // Fixed responsive columns
 * <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="md">
 *   <Card />
 *   <Card />
 * </SimpleGrid>
 *
 * // Auto-responsive based on min width
 * <SimpleGrid minChildWidth="200px" gap="md">
 *   <Card />
 *   <Card />
 * </SimpleGrid>
 */
export const SimpleGrid = forwardRef<HTMLDivElement, SimpleGridProps>(
  (
    { className, columns, minChildWidth, gap, gapX, gapY, asChild = false, style, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'div';
    const hasSeparateGaps = gapX !== undefined || gapY !== undefined;

    // Build style object for minChildWidth
    const gridStyle: CSSProperties = minChildWidth
      ? {
          ...style,
          gridTemplateColumns: `repeat(auto-fill, minmax(min(${minChildWidth}, 100%), 1fr))`,
        }
      : style;

    return (
      <Comp
        ref={ref}
        className={cn(
          'grid',
          // Gap handling - responsiveGap handles both string and object values
          !hasSeparateGaps && responsiveGap(gap),
          gapX && responsiveGapX(gapX),
          gapY && responsiveGapY(gapY),
          // Columns handling - responsiveGridColumns handles both simple and responsive values
          !minChildWidth && responsiveGridColumns(columns),
          className
        )}
        style={gridStyle}
        {...props}
      />
    );
  }
);

SimpleGrid.displayName = 'SimpleGrid';
