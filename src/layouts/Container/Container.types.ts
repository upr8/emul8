import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { ResponsiveValue } from '../../utils/responsive';
import type { containerVariants } from './Container.variants';

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof containerVariants>, 'padding'> {
  /**
   * Padding applied to the container.
   * Supports responsive values using Cedar-style @breakpoint notation.
   *
   * @example
   * // Static padding
   * <Container padding="md" />
   *
   * @example
   * // Responsive padding
   * <Container padding="sm md@md lg@lg" />
   */
  padding?: VariantProps<typeof containerVariants>['padding'] | ResponsiveValue;
}
