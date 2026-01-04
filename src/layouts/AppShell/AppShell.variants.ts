import { cva } from 'class-variance-authority';

export const appShellVariants = cva('min-h-screen flex flex-col', {
  variants: {
    layout: {
      default: '',
      centered: '[&>main]:mx-auto [&>main]:w-full',
    },
  },
  defaultVariants: {
    layout: 'default',
  },
});

export const headerVariants = cva('shrink-0 border-b', {
  variants: {
    height: {
      sm: 'h-12',
      md: 'h-14',
      lg: 'h-16',
    },
    sticky: {
      true: 'sticky top-0 z-40',
      false: '',
    },
  },
  defaultVariants: {
    height: 'md',
    sticky: true,
  },
});

export const appShellSidebarVariants = cva('shrink-0 overflow-y-auto', {
  variants: {
    width: {
      sm: 'w-48',
      md: 'w-64',
      lg: 'w-80',
    },
    /**
     * Position of the sidebar with RTL-safe border handling.
     * Uses logical border properties (border-e/border-s) for RTL support.
     */
    position: {
      left: 'order-first border-e',
      right: 'order-last border-s',
    },
  },
  defaultVariants: {
    width: 'md',
    position: 'left',
  },
});

export const mainVariants = cva('flex-1 overflow-auto', {
  variants: {
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
    maxWidth: {
      none: '',
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
    },
  },
  defaultVariants: {
    padding: 'md',
    maxWidth: 'none',
  },
});

export const footerVariants = cva('shrink-0 border-t', {
  variants: {
    /**
     * Padding with RTL-safe inline padding.
     * Uses logical properties (ps/pe) instead of physical (pl/pr).
     */
    padding: {
      sm: 'py-4 ps-4 pe-4',
      md: 'py-6 ps-6 pe-6',
      lg: 'py-8 ps-8 pe-8',
    },
  },
  defaultVariants: {
    padding: 'md',
  },
});
