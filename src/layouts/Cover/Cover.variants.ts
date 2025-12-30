import { cva } from 'class-variance-authority';

export const coverVariants = cva('flex flex-col', {
  variants: {
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
    noPad: {
      true: 'p-0',
      false: 'p-4',
    },
  },
  defaultVariants: {
    gap: 'md',
    noPad: false,
  },
});
