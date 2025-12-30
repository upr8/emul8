import { cva } from 'class-variance-authority';

export const backdropVariants = cva(
  'fixed inset-0 z-50 bg-black/50 flex items-center justify-center',
  {
    variants: {
      /**
       * Animation state for the backdrop.
       */
      animation: {
        none: '',
        fade: 'animate-in fade-in duration-200',
      },
    },
    defaultVariants: {
      animation: 'fade',
    },
  }
);

export const modalContentVariants = cva(
  'relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-h-[90vh] overflow-hidden flex flex-col',
  {
    variants: {
      /**
       * Size of the modal.
       */
      size: {
        sm: 'w-full max-w-sm',
        md: 'w-full max-w-md',
        lg: 'w-full max-w-lg',
        xl: 'w-full max-w-xl',
        '2xl': 'w-full max-w-2xl',
        full: 'w-full max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]',
      },
      /**
       * Animation for the modal content.
       */
      animation: {
        none: '',
        scale: 'animate-in zoom-in-95 duration-200',
      },
    },
    defaultVariants: {
      size: 'md',
      animation: 'scale',
    },
  }
);

export const modalHeaderVariants = cva('shrink-0 border-b border-gray-200 dark:border-gray-700', {
  variants: {
    /**
     * Padding size for the header.
     */
    padding: {
      sm: 'px-4 py-3',
      md: 'px-6 py-4',
      lg: 'px-8 py-5',
    },
  },
  defaultVariants: {
    padding: 'md',
  },
});

export const modalBodyVariants = cva('flex-1 overflow-y-auto', {
  variants: {
    /**
     * Padding size for the body.
     */
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    padding: 'md',
  },
});

export const modalFooterVariants = cva(
  'shrink-0 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end gap-3',
  {
    variants: {
      /**
       * Padding size for the footer.
       */
      padding: {
        sm: 'px-4 py-3',
        md: 'px-6 py-4',
        lg: 'px-8 py-5',
      },
    },
    defaultVariants: {
      padding: 'md',
    },
  }
);
