import { type CSSProperties, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { CoverProps } from './Cover.types';
import { coverVariants } from './Cover.variants';

/**
 * Cover vertically centers content with optional header and footer.
 *
 * Perfect for hero sections, splash screens, or any full-height layout
 * where the main content should be vertically centered.
 */
export const Cover = forwardRef<HTMLDivElement, CoverProps>(
  ({ className, gap, noPad, minHeight = '100vh', top, bottom, children, style, ...props }, ref) => {
    const coverStyle: CSSProperties = {
      ...style,
      minHeight,
    };

    return (
      <div
        ref={ref}
        className={cn(coverVariants({ gap, noPad }), className)}
        style={coverStyle}
        {...props}
      >
        {/* oxlint-disable emul8/no-deep-nesting -- structural wrapper divs for cover layout */}
        {top && <div>{top}</div>}
        <div className="my-auto">{children}</div>
        {bottom && <div>{bottom}</div>}
        {/* oxlint-enable emul8/no-deep-nesting */}
      </div>
    );
  }
);

Cover.displayName = 'Cover';
