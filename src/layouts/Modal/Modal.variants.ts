import { cva } from 'class-variance-authority';

export const backdropVariants = cva(
  'fixed inset-0 z-50 bg-black/50 flex items-center justify-center',
  {
    variants: {
      /**
       * Animation state for the backdrop.
       * Respects prefers-reduced-motion via motion-safe prefix.
       */
      animation: {
        none: '',
        fade: 'motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200',
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
       * Sizes are expanded 20% from Tailwind defaults to accommodate text expansion in translations.
       */
      size: {
        sm: 'w-full max-w-[460px]',
        md: 'w-full max-w-[540px]',
        lg: 'w-full max-w-[620px]',
        xl: 'w-full max-w-[700px]',
        '2xl': 'w-full max-w-[860px]',
        full: 'w-full max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]',
      },
      /**
       * Animation for the modal content.
       * Respects prefers-reduced-motion via motion-safe prefix.
       */
      animation: {
        none: '',
        scale: 'motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:duration-200',
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
     * Uses logical properties (ps/pe) for RTL support.
     */
    padding: {
      sm: 'ps-4 pe-4 py-3',
      md: 'ps-6 pe-6 py-4',
      lg: 'ps-8 pe-8 py-5',
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
       * Uses logical properties (ps/pe) for RTL support.
       */
      padding: {
        sm: 'ps-4 pe-4 py-3',
        md: 'ps-6 pe-6 py-4',
        lg: 'ps-8 pe-8 py-5',
      },
    },
    defaultVariants: {
      padding: 'md',
    },
  }
);
