import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { ResponsiveValue } from '../../utils/responsive';
import type { containerVariants } from './Container.variants';

/**
 * Valid padding sizes for Container.
 */
export type ContainerPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof containerVariants>, 'padding'> {
  /**
   * Padding applied to the container.
   * Supports responsive values using object syntax.
   *
   * @example
   * // Static padding
   * <Container padding="md" />
   *
   * @example
   * // Responsive padding
   * <Container padding={{ base: 'sm', md: 'md', lg: 'lg' }} />
   */
  padding?: ContainerPadding | ResponsiveValue<ContainerPadding> | null;
}
