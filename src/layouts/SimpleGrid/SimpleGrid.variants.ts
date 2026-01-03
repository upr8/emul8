import { cva } from 'class-variance-authority';

/**
 * SimpleGrid variants - minimal since most styling is dynamic.
 */
export const simpleGridVariants = cva('grid', {
  variants: {
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-10',
      '3xl': 'gap-12',
    },
  },
  defaultVariants: {
    gap: 'md',
  },
});
