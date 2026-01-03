import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { isResponsiveObject, responsivePadding } from '../../utils/responsive';
import type { ContainerPadding, ContainerProps } from './Container.types';
import { containerVariants } from './Container.variants';

/**
 * Container component for centering and constraining content width.
 *
 * Supports responsive padding using object syntax:
 * @example
 * <Container padding={{ base: 'sm', md: 'md', lg: 'lg' }} />
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, fluid, center, andText, ...props }, ref) => {
    const isResponsivePadding = isResponsiveObject(padding);
    // When not responsive, padding is a simple string literal or null/undefined
    const staticPadding = isResponsivePadding
      ? undefined
      : (padding as ContainerPadding | null | undefined);

    return (
      <div
        ref={ref}
        className={cn(
          containerVariants({
            size: fluid ? undefined : size,
            padding: staticPadding,
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
