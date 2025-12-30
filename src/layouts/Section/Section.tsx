import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Slot } from '../../utils/slot';
import type { SectionProps } from './Section.types';
import { sectionVariants } from './Section.variants';

/**
 * Section creates a semantic content section with consistent spacing.
 *
 * Use Section to create distinct content areas on a page, typically
 * combined with Container for centering.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, size, padding, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'section';

    return (
      <Comp ref={ref} className={cn(sectionVariants({ size, padding }), className)} {...props} />
    );
  }
);

Section.displayName = 'Section';
