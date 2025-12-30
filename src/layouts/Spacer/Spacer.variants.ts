import { cva } from 'class-variance-authority';

export const spacerVariants = cva('', {
  variants: {
    /**
     * Size variant for fixed-size spacers.
     * When not set, spacer will grow to fill available space.
     */
    size: {
      xs: 'flex-none w-1 h-1',
      sm: 'flex-none w-2 h-2',
      md: 'flex-none w-4 h-4',
      lg: 'flex-none w-6 h-6',
      xl: 'flex-none w-8 h-8',
      auto: 'flex-grow',
    },
  },
  defaultVariants: {
    size: 'auto',
  },
});
