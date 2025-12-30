import { type CSSProperties, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Slot } from '../../utils/slot';
import type { FrameProps } from './Frame.types';

/**
 * Frame constrains media to a specific aspect ratio.
 *
 * Perfect for images, videos, or any content that should
 * maintain a consistent aspect ratio.
 */
export const Frame = forwardRef<HTMLDivElement, FrameProps>(
  ({ className, ratio = '16:9', asChild = false, style, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    const [width, height] = ratio.split(':').map(Number);

    const frameStyle: CSSProperties = {
      ...style,
      aspectRatio: `${width} / ${height}`,
    };

    return (
      <Comp
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        style={frameStyle}
        {...props}
      >
        <div className="absolute inset-0 flex items-center justify-center [&>*]:w-full [&>*]:h-full [&>*]:object-cover">
          {children}
        </div>
      </Comp>
    );
  }
);

Frame.displayName = 'Frame';
