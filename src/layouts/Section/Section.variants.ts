import { cva } from 'class-variance-authority';

export const sectionVariants = cva('', {
  variants: {
    size: {
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16',
      xl: 'py-24',
    },
    padding: {
      none: 'px-0',
      sm: 'px-4',
      md: 'px-6',
      lg: 'px-8',
    },
  },
  defaultVariants: {
    size: 'md',
    padding: 'md',
  },
});
