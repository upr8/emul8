import { Children, type CSSProperties, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { ReelProps } from './Reel.types';
import { reelVariants } from './Reel.variants';

/**
 * Reel creates a horizontally scrolling strip of items.
 *
 * Perfect for image galleries, card carousels, or any content
 * that should scroll horizontally.
 */
export const Reel = forwardRef<HTMLDivElement, ReelProps>(
  (
    { className, gap, noBar, itemWidth = 'auto', height = 'auto', children, style, ...props },
    ref
  ) => {
    const reelStyle: CSSProperties = {
      ...style,
      height,
    };

    const itemStyle: CSSProperties = {
      flex: itemWidth === 'auto' ? '0 0 auto' : `0 0 ${itemWidth}`,
    };

    return (
      <div
        ref={ref}
        className={cn(reelVariants({ gap, noBar }), className)}
        style={reelStyle}
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
