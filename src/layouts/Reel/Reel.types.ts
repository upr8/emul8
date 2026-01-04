import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { reelVariants } from './Reel.variants';

/**
 * Props for the Reel component.
 *
 * Reel is a horizontally scrolling container that supports keyboard navigation.
 * Use Left/Right arrow keys to scroll when focused (direction-aware for RTL).
 *
 * **IMPORTANT (WCAG 1.3.1):** Components with `role="region"` require an accessible name.
 * You MUST provide either `aria-label` or `aria-labelledby` for screen readers.
 * A development warning will be logged if neither is provided.
 *
 * @example
 * ```tsx
 * // With aria-label (recommended for simple labels)
 * <Reel aria-label="Product gallery">
 *   <img src="..." alt="Product 1" />
 *   <img src="..." alt="Product 2" />
 * </Reel>
 *
 * // With aria-labelledby (for visible headings)
 * <h2 id="gallery-heading">Featured Products</h2>
 * <Reel aria-labelledby="gallery-heading">
 *   <img src="..." alt="Product 1" />
 * </Reel>
 *
 * // RTL support is automatic - arrow keys reverse direction
 * <div dir="rtl">
 *   <Reel aria-label="معرض المنتجات">...</Reel>
 * </div>
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
