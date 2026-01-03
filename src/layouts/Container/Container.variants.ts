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
    padding: {
      none: 'px-0',
      xs: 'px-2',
      sm: 'px-4',
      md: 'px-6',
      lg: 'px-8',
      xl: 'px-12',
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
