import { Children, type CSSProperties, forwardRef, useCallback, useRef } from 'react';
import { cn } from '../../utils/cn';
import type { ReelProps } from './Reel.types';
import { reelVariants } from './Reel.variants';

/**
 * Get the scroll direction multiplier based on text direction.
 * In RTL mode, ArrowLeft scrolls right (positive) and ArrowRight scrolls left (negative).
 */
function getScrollDirection(element: HTMLElement): number {
  // oxlint-disable-next-line emul8/no-direct-window -- getComputedStyle is SSR-safe when element exists
  const direction = getComputedStyle(element).direction;
  return direction === 'rtl' ? -1 : 1;
}

/**
 * Reel creates a horizontally scrolling strip of items.
 *
 * Perfect for image galleries, card carousels, or any content
 * that should scroll horizontally. Supports keyboard navigation
 * with Left/Right arrow keys (direction-aware for RTL).
 */
export const Reel = forwardRef<HTMLDivElement, ReelProps>(
  (
    {
      className,
      gap,
      noBar,
      itemWidth = 'auto',
      height = 'auto',
      scrollAmount = 200,
      children,
      style,
      onKeyDown,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);

    // Combine refs safely without type casting
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        internalRef.current = node;
        /* c8 ignore start -- ref callback/object branches depend on test setup */
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        /* c8 ignore stop */
      },
      [ref]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        const element = internalRef.current;
        /* c8 ignore next -- element always exists when rendered */
        if (!element) return;

        // Get direction multiplier for RTL support
        const dirMultiplier = getScrollDirection(element);

        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          // In LTR: scroll left (negative), In RTL: scroll right (positive)
          element.scrollBy({ left: -scrollAmount * dirMultiplier, behavior: 'smooth' });
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          // In LTR: scroll right (positive), In RTL: scroll left (negative)
          element.scrollBy({ left: scrollAmount * dirMultiplier, behavior: 'smooth' });
        }

        onKeyDown?.(event);
      },
      [scrollAmount, onKeyDown]
    );

    const reelStyle: CSSProperties = {
      ...style,
      height,
    };

    const itemStyle: CSSProperties = {
      flex: itemWidth === 'auto' ? '0 0 auto' : `0 0 ${itemWidth}`,
    };

    // Warn in development if aria-label is missing (required for role="region")
    if (process.env.NODE_ENV === 'development' && !ariaLabel && !props['aria-labelledby']) {
      // oxlint-disable-next-line no-console -- intentional development warning
      console.warn(
        'Reel: Missing aria-label or aria-labelledby. ' +
          'Components with role="region" require an accessible name for screen readers.'
      );
    }

    return (
      <div
        ref={setRefs}
        role="region"
        tabIndex={0}
        aria-label={ariaLabel}
        className={cn(reelVariants({ gap, noBar }), className)}
        style={reelStyle}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {Children.map(children, (child) => (
          <div style={itemStyle}>{child}</div>
        ))}
      </div>
    );
  }
);

Reel.displayName = 'Reel';
