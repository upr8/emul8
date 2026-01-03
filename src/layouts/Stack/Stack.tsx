import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import { cn } from '../../utils/cn';
import { responsiveGap } from '../../utils/responsive';
import type { StackProps } from './Stack.types';
import { stackVariants } from './Stack.variants';

/**
 * Stack component for vertical or horizontal layouts with consistent spacing.
 *
 * Supports responsive gap using Cedar-style @breakpoint notation:
 * @example
 * <Stack gap="sm md@md lg@lg" />
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = 'vertical',
      gap,
      align,
      justify,
      wrap,
      splitAfter,
      children,
      ...props
    },
    ref
  ) => {
    const isResponsiveGap = typeof gap === 'string' && gap.includes('@');
    let processedChildren = children;

    if (splitAfter !== undefined && splitAfter >= 0) {
      const childArray = Children.toArray(children);
      processedChildren = childArray.map((child, index) => {
        if (index === splitAfter + 1 && isValidElement<{ className?: string }>(child)) {
          const marginClass = direction === 'horizontal' ? 'ml-auto' : 'mt-auto';
          return cloneElement(child, {
            className: cn(marginClass, child.props.className),
          });
        }
        return child;
      });
    }

    return (
      <div
        ref={ref}
        className={cn(
          stackVariants({
            direction,
            gap: isResponsiveGap ? undefined : gap,
            align,
            justify,
            wrap,
          }),
          isResponsiveGap && responsiveGap(gap),
          className
        )}
        {...props}
      >
        {processedChildren}
      </div>
    );
  }
);

Stack.displayName = 'Stack';
