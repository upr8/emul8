import { cva } from 'class-variance-authority';

export const imposterVariants = cva('inset-0 flex items-center justify-center overflow-auto', {
  variants: {
    fixed: {
      true: 'fixed',
      false: 'absolute',
    },
  },
  defaultVariants: {
    fixed: false,
  },
});
