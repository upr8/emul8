import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type { sectionVariants } from './Section.variants';

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /**
   * Render as a different element using the Slot pattern.
   */
  asChild?: boolean;
}
