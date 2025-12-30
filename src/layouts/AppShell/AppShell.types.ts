import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type {
  appShellSidebarVariants,
  appShellVariants,
  footerVariants,
  headerVariants,
  mainVariants,
} from './AppShell.variants';

export interface AppShellProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof appShellVariants> {}

export interface AppShellHeaderProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {}

export interface AppShellSidebarProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof appShellSidebarVariants> {}

export interface AppShellMainProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof mainVariants> {}

export interface AppShellFooterProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariants> {}

export interface AppShellBodyProps extends HTMLAttributes<HTMLDivElement> {}
