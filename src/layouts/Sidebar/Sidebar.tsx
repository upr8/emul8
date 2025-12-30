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

    const sidebarElement = <div style={sidebarStyle}>{sidebar}</div>;

    const contentElement = <div style={contentStyle}>{children}</div>;

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
