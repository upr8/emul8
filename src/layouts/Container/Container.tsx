import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { responsivePadding } from '../../utils/responsive';
import type { ContainerProps } from './Container.types';
import { containerVariants } from './Container.variants';

/**
 * Container component for centering and constraining content width.
 *
 * Supports responsive padding using Cedar-style @breakpoint notation:
 * @example
 * <Container padding="sm md@md lg@lg" />
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, fluid, center, andText, ...props }, ref) => {
    // Check if padding is a responsive value (contains @)
    const isResponsivePadding = typeof padding === 'string' && padding.includes('@');

    return (
      <div
        ref={ref}
        className={cn(
          containerVariants({
            size: fluid ? undefined : size,
            padding: isResponsivePadding ? undefined : padding,
            fluid,
            center,
            andText,
          }),
          isResponsivePadding && responsivePadding(padding),
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';

/**
 * Center is an alias for Container, emphasizing its centering capabilities.
 */
export const Center = Container;
Center.displayName = 'Center';
