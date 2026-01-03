import { cva } from 'class-variance-authority';
import { GAP_VARIANTS_CVA } from '../../utils/responsive';

export const coverVariants = cva('flex flex-col', {
  variants: {
    gap: GAP_VARIANTS_CVA,
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
