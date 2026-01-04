import { type CSSProperties, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { SidebarProps } from './Sidebar.types';
import { sidebarVariants } from './Sidebar.variants';

/**
 * Sidebar creates a two-column layout with a sidebar and main content.
 *
 * The sidebar has a fixed width while the content fills remaining space.
 * When the content would be narrower than `contentMin`, the layout wraps
 * to a vertical stack.
 *
 * For semantic HTML, use the `sidebarAs` and `contentAs` props to render
 * as appropriate elements (e.g., `<aside>` for navigation sidebars).
 */
export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      gap,
      noStretch,
      side = 'left',
      sideWidth = '20rem',
      contentMin = '50%',
      sidebar,
      sidebarAs: SidebarElement = 'aside',
      contentAs: ContentElement = 'div',
      children,
      ...props
    },
    ref
  ) => {
    const sidebarStyle: CSSProperties = {
      flexBasis: sideWidth,
      flexGrow: 1,
    };

    const contentStyle: CSSProperties = {
      flexBasis: 0,
      flexGrow: 999,
      minInlineSize: contentMin,
    };

    const sidebarElement = <SidebarElement style={sidebarStyle}>{sidebar}</SidebarElement>;

    const contentElement = <ContentElement style={contentStyle}>{children}</ContentElement>;

    return (
      <div ref={ref} className={cn(sidebarVariants({ gap, noStretch }), className)} {...props}>
        {side === 'left' ? (
          <>
            {sidebarElement}
            {contentElement}
          </>
        ) : (
          <>
            {contentElement}
            {sidebarElement}
          </>
        )}
      </div>
    );
  }
);

Sidebar.displayName = 'Sidebar';
