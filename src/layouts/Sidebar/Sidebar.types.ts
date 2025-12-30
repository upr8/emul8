import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, ReactNode } from 'react';
import type { sidebarVariants } from './Sidebar.variants';

export interface SidebarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  /**
   * Which side the sidebar is on.
   * @default "left"
   */
  side?: 'left' | 'right';
  /**
   * The width of the sidebar.
   * @default "20rem"
   */
  sideWidth?: string;
  /**
   * Minimum width of the content before wrapping occurs.
   * @default "50%"
   */
  contentMin?: string;
  /**
   * The sidebar content (first or second child depending on `side`).
   */
  sidebar: ReactNode;
}
