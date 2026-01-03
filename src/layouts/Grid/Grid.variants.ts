import { cva } from 'class-variance-authority';
import { GAP_VARIANTS_CVA } from '../../utils/responsive';

export const gridVariants = cva('grid', {
  variants: {
    gap: GAP_VARIANTS_CVA,
  },
  defaultVariants: {
    gap: 'md',
  },
});
