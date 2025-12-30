import { cva } from 'class-variance-authority';

export const dividerVariants = cva('shrink-0 bg-current opacity-20', {
  variants: {
    orientation: {
      horizontal: 'w-full h-px',
      vertical: 'h-full w-px',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', size: 'sm', className: 'h-px' },
    { orientation: 'horizontal', size: 'md', className: 'h-0.5' },
    { orientation: 'horizontal', size: 'lg', className: 'h-1' },
    { orientation: 'vertical', size: 'sm', className: 'w-px' },
    { orientation: 'vertical', size: 'md', className: 'w-0.5' },
    { orientation: 'vertical', size: 'lg', className: 'w-1' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    size: 'sm',
  },
});
