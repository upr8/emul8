import { Children, type CSSProperties, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { SwitcherProps } from './Switcher.types';
import { switcherVariants } from './Switcher.variants';

/**
 * Switcher switches between horizontal and vertical layouts based on container width.
 *
 * When the container is wider than the threshold, items are horizontal.
 * When narrower, they stack vertically.
 */
export const Switcher = forwardRef<HTMLDivElement, SwitcherProps>(
  ({ className, gap, threshold = '30rem', limit, children, style, ...props }, ref) => {
    const childCount = Children.count(children);
    const shouldForceVertical = limit !== undefined && childCount > limit;

    // The switcher uses a clever CSS calculation:
    // flex-basis: calc((threshold - 100%) * 999)
    // - When container > threshold: negative value = invalid = 0 = items share space
    // - When container < threshold: large positive value = items take full width
    const itemStyle: CSSProperties = shouldForceVertical
      ? { flexBasis: '100%', flexGrow: 1 }
      : { flexBasis: `calc((${threshold} - 100%) * 999)`, flexGrow: 1 };

    return (
      <div ref={ref} className={cn(switcherVariants({ gap }), className)} style={style} {...props}>
        {Children.map(children, (child) => (
          <div style={itemStyle}>{child}</div>
        ))}
      </div>
    );
  }
);

Switcher.displayName = 'Switcher';
