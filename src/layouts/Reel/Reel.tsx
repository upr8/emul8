import { Children, type CSSProperties, forwardRef, useCallback, useRef } from 'react';
import { cn } from '../../utils/cn';
import type { ReelProps } from './Reel.types';
import { reelVariants } from './Reel.variants';

/**
 * Reel creates a horizontally scrolling strip of items.
 *
 * Perfect for image galleries, card carousels, or any content
 * that should scroll horizontally. Supports keyboard navigation
 * with Left/Right arrow keys.
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

        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          element.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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

    return (
      <div
        ref={setRefs}
        role="region"
        tabIndex={0}
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
