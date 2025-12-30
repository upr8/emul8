import { cva } from 'class-variance-authority';

export const boxVariants = cva('', {
  variants: {
    padding: {
      none: 'p-0',
      xs: 'p-1',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    },
    borderWidth: {
      none: 'border-0',
      thin: 'border',
      medium: 'border-2',
      thick: 'border-4',
    },
  },
  defaultVariants: {
    padding: 'md',
    borderWidth: 'none',
  },
});
