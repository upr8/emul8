import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { ContainerProps } from './Container.types';
import { containerVariants } from './Container.variants';

/**
 * Container component for centering and constraining content width.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, center, andText, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size, padding, center, andText }), className)}
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
