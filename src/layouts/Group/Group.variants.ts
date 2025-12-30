import { cva } from 'class-variance-authority';

export const groupVariants = cva('inline-flex items-center', {
  variants: {
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
      xl: 'gap-6',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      baseline: 'items-baseline',
    },
    grow: {
      true: '[&>*]:flex-1',
      false: '',
    },
    preventGrow: {
      true: '[&>*]:flex-none',
      false: '',
    },
  },
  defaultVariants: {
    gap: 'sm',
    align: 'center',
    grow: false,
    preventGrow: false,
  },
});
