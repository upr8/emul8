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
   * Accepts any valid CSS length value.
   * @default "20rem"
   * @example "20rem", "300px", "25%"
   */
  sideWidth?: string;
  /**
   * Minimum width of the content before wrapping occurs.
   * Accepts any valid CSS length or percentage value.
   * @default "50%"
   * @example "50%", "400px", "30rem"
   */
  contentMin?: string;
  /**
   * The sidebar content (first or second child depending on `side`).
   */
  sidebar: ReactNode;
}
