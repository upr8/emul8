import type { HTMLAttributes } from 'react';

export interface FrameProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The aspect ratio in "width:height" format.
   * @default "16:9"
   * @example "16:9", "4:3", "1:1", "21:9"
   */
  ratio?: string;
  /**
   * Render as a different element using the Slot pattern.
   */
  asChild?: boolean;
}
