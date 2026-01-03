import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { GapSize, ResponsiveValue } from '../../utils/responsive';
import type { flexVariants } from './Flex.variants';

export interface FlexProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof flexVariants>, 'gap'> {
  /**
   * Gap between flex items.
   * Supports responsive values using object syntax.
   *
   * @example
   * // Static gap
   * <Flex gap="md" />
   *
   * @example
   * // Responsive gap
   * <Flex gap={{ base: 'sm', md: 'md', lg: 'lg' }} />
   */
  gap?: VariantProps<typeof flexVariants>['gap'] | ResponsiveValue<GapSize>;
  /**
   * Column gap (horizontal spacing between items).
   * Overrides `gap` for the horizontal axis.
   *
   * @example
   * <Flex gapX="lg" gapY="sm" />
   * <Flex gapX={{ base: 'sm', md: 'lg' }} />
   */
  gapX?: ResponsiveValue<GapSize>;
  /**
   * Row gap (vertical spacing between items).
   * Overrides `gap` for the vertical axis.
   *
   * @example
   * <Flex gapX="lg" gapY="sm" />
   * <Flex gapY={{ base: 'xs', md: 'md' }} />
   */
  gapY?: ResponsiveValue<GapSize>;
  /**
   * Render as a different element using the Slot pattern.
   */
  asChild?: boolean;
}
