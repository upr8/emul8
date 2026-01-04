import { cva } from 'class-variance-authority';

export const containerVariants = cva('mx-auto w-full', {
  variants: {
    size: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
    },
    /**
     * Inline padding (start/end) for RTL support.
     * Uses logical properties (ps/pe) instead of physical (pl/pr).
     */
    padding: {
      none: 'ps-0 pe-0',
      xs: 'ps-2 pe-2',
      sm: 'ps-4 pe-4',
      md: 'ps-6 pe-6',
      lg: 'ps-8 pe-8',
      xl: 'ps-12 pe-12',
    },
    /**
     * Enable fluid mode for full-width layouts without max-width constraints.
     * Useful for hero sections or edge-to-edge designs.
     */
    fluid: {
      true: 'max-w-none',
    },
    /**
     * Center child elements using flexbox.
     */
    center: {
      true: 'flex flex-col items-center',
    },
    /**
     * Also center text content within the container.
     */
    andText: {
      true: 'text-center',
    },
  },
  defaultVariants: {
    size: 'lg',
    padding: 'md',
  },
});

export { containerVariants as centerVariants };
