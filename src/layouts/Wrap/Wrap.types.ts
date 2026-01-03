import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { GapSize, ResponsiveValue } from '../../utils/responsive';
import type { wrapVariants } from './Wrap.variants';

export interface WrapProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof wrapVariants>, 'gap'> {
  /**
   * Gap between wrapped items.
   * Supports responsive values using object syntax.
   *
   * @example
   * // Static gap
   * <Wrap gap="md" />
   *
   * @example
   * // Responsive gap
   * <Wrap gap={{ base: 'sm', md: 'md', lg: 'lg' }} />
   */
  gap?: VariantProps<typeof wrapVariants>['gap'] | ResponsiveValue<GapSize>;
  /**
   * Column gap (horizontal spacing between items).
   * Overrides `gap` for the horizontal axis.
   *
   * @example
   * <Wrap gapX="lg" gapY="sm" />
   * <Wrap gapX={{ base: 'sm', md: 'lg' }} />
   */
  gapX?: ResponsiveValue<GapSize>;
  /**
   * Row gap (vertical spacing between items).
   * Overrides `gap` for the vertical axis.
   *
   * @example
   * <Wrap gapX="lg" gapY="sm" />
   * <Wrap gapY={{ base: 'xs', md: 'md' }} />
   */
  gapY?: ResponsiveValue<GapSize>;
  /**
   * Render as a different element using the Slot pattern.
   */
  asChild?: boolean;
}
