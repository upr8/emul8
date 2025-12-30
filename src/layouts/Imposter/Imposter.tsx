import { type CSSProperties, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { ImposterProps } from './Imposter.types';
import { imposterVariants } from './Imposter.variants';

/**
 * Imposter positions content as an overlay.
 *
 * Perfect for modals, dialogs, tooltips, or any content
 * that should overlay the page.
 */
export const Imposter = forwardRef<HTMLDivElement, ImposterProps>(
  ({ className, fixed, breakout = false, margin = '0px', style, children, ...props }, ref) => {
    const imposterStyle: CSSProperties = breakout
      ? { ...style }
      : {
          ...style,
          maxInlineSize: `calc(100% - (${margin} * 2))`,
          maxBlockSize: `calc(100% - (${margin} * 2))`,
        };

    return (
      <div
        ref={ref}
        className={cn(imposterVariants({ fixed }), className)}
        style={imposterStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Imposter.displayName = 'Imposter';
