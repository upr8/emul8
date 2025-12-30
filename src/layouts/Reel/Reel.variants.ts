import { cva } from 'class-variance-authority';

export const reelVariants = cva('flex overflow-x-auto overflow-y-hidden', {
  variants: {
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
    noBar: {
      true: 'scrollbar-none [&::-webkit-scrollbar]:hidden',
      false: 'pb-2',
    },
  },
  defaultVariants: {
    gap: 'md',
    noBar: false,
  },
});
