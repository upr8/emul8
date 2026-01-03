import type { HTMLAttributes } from 'react';
import type { GapSize, ResponsiveValue } from '../../utils/responsive';

export interface SimpleGridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns. Supports responsive values.
   * Values must be strings from '1' to '12'.
   *
   * @example
   * <SimpleGrid columns="3" />
   * <SimpleGrid columns={{ base: '1', sm: '2', md: '3', lg: '4' }} />
   */
  columns?: ResponsiveValue<
    '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
  >;
  /**
   * Minimum width for each grid item. When set, columns are calculated
   * automatically using CSS grid auto-fill. Takes precedence over `columns`.
   *
   * @example
   * <SimpleGrid minChildWidth="200px" />
   * <SimpleGrid minChildWidth="15rem" />
   */
  minChildWidth?: string;
  /**
   * Gap between grid items.
   * Supports responsive values using string or object syntax.
   *
   * @example
   * <SimpleGrid gap="md" />
   * <SimpleGrid gap={{ base: 'sm', md: 'md', lg: 'lg' }} />
   */
  gap?: ResponsiveValue<GapSize>;
  /**
   * Column gap (horizontal spacing between items).
   * Overrides `gap` for the horizontal axis.
   *
   * @example
   * <SimpleGrid gapX="lg" gapY="sm" />
   */
  gapX?: ResponsiveValue<GapSize>;
  /**
   * Row gap (vertical spacing between items).
   * Overrides `gap` for the vertical axis.
   *
   * @example
   * <SimpleGrid gapX="lg" gapY="sm" />
   */
  gapY?: ResponsiveValue<GapSize>;
  /**
   * Render as a different element using the Slot pattern.
   */
  asChild?: boolean;
}
