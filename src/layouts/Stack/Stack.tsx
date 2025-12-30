import { Children, cloneElement, forwardRef, isValidElement, type ReactElement } from 'react';
import { cn } from '../../utils/cn';
import type { StackProps } from './Stack.types';
import { stackVariants } from './Stack.variants';

/**
 * Stack component for vertical or horizontal layouts with consistent spacing.
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
    let processedChildren = children;

    if (splitAfter !== undefined && splitAfter >= 0) {
      const childArray = Children.toArray(children);
      processedChildren = childArray.map((child, index) => {
        if (index === splitAfter + 1 && isValidElement(child)) {
          const marginClass = direction === 'horizontal' ? 'ml-auto' : 'mt-auto';
          return cloneElement(child as ReactElement<{ className?: string }>, {
            className: cn(
              marginClass,
              (child as ReactElement<{ className?: string }>).props.className
            ),
          });
        }
        return child;
      });
    }

    return (
      <div
        ref={ref}
        className={cn(stackVariants({ direction, gap, align, justify, wrap }), className)}
        {...props}
      >
        {processedChildren}
      </div>
    );
  }
);

Stack.displayName = 'Stack';
