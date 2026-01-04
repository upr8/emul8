import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-lg border border-transparent',
    'font-medium',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'cursor-pointer',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-gray-950 text-white',
          'hover:bg-gray-800',
          'active:bg-gray-700',
          'dark:bg-gray-100 dark:text-gray-950',
          'dark:hover:bg-gray-200',
        ],
        secondary: ['bg-gray-500 text-white', 'hover:bg-gray-600', 'active:bg-gray-700'],
        danger: ['bg-red-600 text-white', 'hover:bg-red-700', 'active:bg-red-800'],
        success: ['bg-green-700 text-white', 'hover:bg-green-800', 'active:bg-green-900'],
        ghost: [
          'bg-transparent',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'active:bg-gray-200 dark:active:bg-gray-700',
        ],
        outline: [
          'border-gray-300 bg-transparent',
          'hover:bg-gray-50 dark:hover:bg-gray-800',
          'active:bg-gray-100 dark:active:bg-gray-700',
          'dark:border-gray-600',
        ],
      },
      size: {
        sm: 'px-3 py-1.5 text-sm min-h-[32px]',
        md: 'px-5 py-2.5 text-base min-h-[40px]',
        lg: 'px-6 py-3 text-lg min-h-[48px]',
        icon: 'p-2.5 min-w-[40px] min-h-[40px]',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
