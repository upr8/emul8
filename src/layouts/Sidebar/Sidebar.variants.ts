import { cva } from 'class-variance-authority';

export const sidebarVariants = cva('flex flex-wrap', {
  variants: {
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
    noStretch: {
      true: 'items-start',
      false: 'items-stretch',
    },
  },
  defaultVariants: {
    gap: 'md',
    noStretch: false,
  },
});
