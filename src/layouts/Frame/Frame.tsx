import { type CSSProperties, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Slot } from '../../utils/slot';
import type { FrameProps } from './Frame.types';
import { ASPECT_RATIOS, frameVariants } from './Frame.variants';

/**
 * Frame constrains media to a specific aspect ratio.
 *
 * Perfect for images, videos, or any content that should
 * maintain a consistent aspect ratio.
 */
export const Frame = forwardRef<HTMLDivElement, FrameProps>(
  ({ className, ratio = 'video', fit, asChild = false, style, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    // Resolve preset to ratio string, or use custom ratio directly
    const resolvedRatio =
      ratio in ASPECT_RATIOS ? ASPECT_RATIOS[ratio as keyof typeof ASPECT_RATIOS] : ratio;
    const [width, height] = resolvedRatio.split(':').map(Number);

    const frameStyle: CSSProperties = {
      ...style,
      aspectRatio: `${width} / ${height}`,
    };

    return (
      <Comp
        ref={ref}
        className={cn(frameVariants({ fit }), className)}
        style={frameStyle}
        {...props}
      >
        <div className="absolute inset-0 flex items-center justify-center [&>*]:w-full [&>*]:h-full">
          {children}
        </div>
      </Comp>
    );
  }
);

Frame.displayName = 'Frame';
