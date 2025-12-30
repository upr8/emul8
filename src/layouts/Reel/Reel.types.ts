import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { reelVariants } from './Reel.variants';

/**
 * Props for the Reel component.
 *
 * Reel is a horizontally scrolling container that supports keyboard navigation.
 * Use Left/Right arrow keys to scroll when focused.
 * Always provide `aria-label` to describe the content for screen readers.
 *
 * @example
 * ```tsx
 * <Reel aria-label="Product gallery">
 *   <img src="..." alt="Product 1" />
 *   <img src="..." alt="Product 2" />
 * </Reel>
 * ```
 */
export interface ReelProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof reelVariants> {
  /**
   * The width of each item in the reel.
   * Accepts any valid CSS length value.
   * @default "auto"
   * @example "200px", "15rem", "25vw"
   */
  itemWidth?: string;
  /**
   * The height of the reel container.
   * Accepts any valid CSS length value.
   * @default "auto"
   * @example "300px", "20rem", "50vh"
   */
  height?: string;
  /**
   * Amount to scroll when using keyboard navigation (in pixels).
   * @default 200
   */
  scrollAmount?: number;
}
