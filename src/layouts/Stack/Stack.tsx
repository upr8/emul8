import { Children, cloneElement, forwardRef, isValidElement, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { isResponsiveObject, responsiveGap } from '../../utils/responsive';
import type { StackProps } from './Stack.types';
import { stackVariants } from './Stack.variants';

/**
 * Inserts a divider element between each child.
 */
function insertDividers(children: ReactNode, divider: ReactNode): ReactNode[] {
  const childArray = Children.toArray(children).filter(Boolean);
  if (childArray.length <= 1) return childArray;

  const result: ReactNode[] = [];
  childArray.forEach((child, index) => {
    result.push(child);
    if (index < childArray.length - 1) {
      result.push(
        <span key={`divider-${index}`} aria-hidden="true">
          {divider}
        </span>
      );
    }
  });
  return result;
}

/**
 * Stack component for vertical or horizontal layouts with consistent spacing.
 *
 * Supports responsive gap using object syntax:
 * @example
 * <Stack gap={{ base: 'sm', md: 'md', lg: 'lg' }} />
 * <Stack divider={<hr />}>...</Stack>
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
      divider,
      children,
      ...props
    },
    ref
  ) => {
    const isResponsiveGap = isResponsiveObject(gap);
    let processedChildren: ReactNode = children;

    // Insert dividers between children if specified
    if (divider) {
      processedChildren = insertDividers(children, divider);
    }

    // Handle splitAfter logic
    if (splitAfter !== undefined && splitAfter >= 0) {
      const childArray = Children.toArray(processedChildren);
      // If divider is present, content child at position n is at array index n * 2
      // So child after splitAfter (at position splitAfter + 1) is at index (splitAfter + 1) * 2
      const adjustedIndex = divider ? (splitAfter + 1) * 2 : splitAfter + 1;
      processedChildren = childArray.map((child, index) => {
        if (index === adjustedIndex && isValidElement<{ className?: string }>(child)) {
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
