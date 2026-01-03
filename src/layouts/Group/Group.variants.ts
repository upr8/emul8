import { cva } from 'class-variance-authority';
import { GAP_VARIANTS_CVA } from '../../utils/responsive';

export const groupVariants = cva('inline-flex items-center', {
  variants: {
    gap: GAP_VARIANTS_CVA,
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
