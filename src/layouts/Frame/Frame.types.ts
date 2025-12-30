import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { AspectRatioPreset, frameVariants } from './Frame.variants';

export interface FrameProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof frameVariants> {
  /**
   * The aspect ratio. Can be a preset name or custom "width:height" format.
   * Presets: 'square' (1:1), 'video' (16:9), 'classic' (4:3),
   * 'portrait' (9:16), 'ultrawide' (21:9), 'golden' (1.618:1)
   * @default "video"
   * @example "video", "square", "16:9", "4:3"
   */
  ratio?: AspectRatioPreset | (string & {});
  /**
   * Render as a different element using the Slot pattern.
   */
  asChild?: boolean;
}
