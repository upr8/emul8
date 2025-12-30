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
    const reelRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        const element = reelRef.current;
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
      [scrollAmount, onKeyDown, reelRef]
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
        ref={reelRef}
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
