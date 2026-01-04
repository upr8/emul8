import type { VariantProps } from 'class-variance-authority';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import type { sidebarVariants } from './Sidebar.variants';

/**
 * Props for the Sidebar component.
 *
 * For semantic HTML and accessibility, use `sidebarAs` and `contentAs` props
 * to render the sidebar and content as appropriate elements.
 *
 * @example
 * ```tsx
 * // Navigation sidebar with semantic HTML
 * <Sidebar
 *   sidebarAs="nav"
 *   contentAs="main"
 *   sidebar={<NavMenu aria-label="Main navigation" />}
 * >
 *   <MainContent />
 * </Sidebar>
 *
 * // Secondary content sidebar
 * <Sidebar
 *   side="right"
 *   sidebarAs="aside"
 *   sidebar={<RelatedLinks />}
 * >
 *   <ArticleContent />
 * </Sidebar>
 * ```
 */
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
  /**
   * The HTML element to render the sidebar as.
   * Use semantic elements for accessibility:
   * - `aside` for supplementary content
   * - `nav` for navigation sidebars
   * @default "aside"
   */
  sidebarAs?: ElementType;
  /**
   * The HTML element to render the content area as.
   * Use semantic elements for accessibility:
   * - `main` for primary page content
   * - `article` for self-contained content
   * - `section` for distinct content sections
   * @default "div"
   */
  contentAs?: ElementType;
}
