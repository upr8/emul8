import { cva } from 'class-variance-authority';
import { GAP_VARIANTS_CVA } from '../../utils/responsive';

export const wrapVariants = cva('flex flex-wrap', {
  variants: {
    gap: GAP_VARIANTS_CVA,
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    },
  },
  defaultVariants: {
    gap: 'sm',
    align: 'center',
    justify: 'start',
  },
});
