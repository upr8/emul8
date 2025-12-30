import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { sectionVariants } from './Section.variants';

/**
 * Props for the Section component.
 *
 * Section renders as `<section>` which is a landmark element.
 * For proper accessibility, provide `aria-labelledby` pointing to a heading.
 *
 * @example
 * ```tsx
 * <Section aria-labelledby="features-heading">
 *   <h2 id="features-heading">Features</h2>
 *   <p>Content here...</p>
 * </Section>
 * ```
 */
export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /**
   * Render as a different element using the Slot pattern.
   * When using asChild, you are responsible for semantic HTML and ARIA.
   */
  asChild?: boolean;
}
