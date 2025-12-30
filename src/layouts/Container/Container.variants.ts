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
      sm: 'px-4',
      md: 'px-6',
      lg: 'px-8',
    },
    /**
     * Center child elements using flexbox.
     */
    center: {
      true: 'flex flex-col items-center',
    },
    /**
     * Intrinsic centering: center based on content width rather than container width.
     */
    intrinsic: {
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
