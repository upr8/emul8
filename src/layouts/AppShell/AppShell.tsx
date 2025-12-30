import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type {
  AppShellBodyProps,
  AppShellFooterProps,
  AppShellHeaderProps,
  AppShellMainProps,
  AppShellProps,
  AppShellSidebarProps,
} from './AppShell.types';
import {
  appShellSidebarVariants,
  appShellVariants,
  footerVariants,
  headerVariants,
  mainVariants,
} from './AppShell.variants';

/**
 * AppShell provides the main application layout structure.
 *
 * Compose with AppShell.Header, AppShell.Sidebar, AppShell.Main,
 * and AppShell.Footer for a complete application layout.
 */
const AppShellRoot = forwardRef<HTMLDivElement, AppShellProps>(
  ({ className, layout, ...props }, ref) => {
    return <div ref={ref} className={cn(appShellVariants({ layout }), className)} {...props} />;
  }
);
AppShellRoot.displayName = 'AppShell';

/**
 * AppShell.Header - The top navigation/header area.
 */
const Header = forwardRef<HTMLElement, AppShellHeaderProps>(
  ({ className, height, sticky, ...props }, ref) => {
    return (
      <header ref={ref} className={cn(headerVariants({ height, sticky }), className)} {...props} />
    );
  }
);
Header.displayName = 'AppShell.Header';

/**
 * AppShell.Sidebar - Side navigation area.
 */
const Sidebar = forwardRef<HTMLElement, AppShellSidebarProps>(
  ({ className, width, position, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(appShellSidebarVariants({ width, position }), className)}
        {...props}
      />
    );
  }
);
Sidebar.displayName = 'AppShell.Sidebar';

/**
 * AppShell.Main - Main content area.
 */
const Main = forwardRef<HTMLElement, AppShellMainProps>(
  ({ className, padding, maxWidth, ...props }, ref) => {
    return (
      <main ref={ref} className={cn(mainVariants({ padding, maxWidth }), className)} {...props} />
    );
  }
);
Main.displayName = 'AppShell.Main';

/**
 * AppShell.Footer - Bottom footer area.
 */
const Footer = forwardRef<HTMLElement, AppShellFooterProps>(
  ({ className, padding, ...props }, ref) => {
    return <footer ref={ref} className={cn(footerVariants({ padding }), className)} {...props} />;
  }
);
Footer.displayName = 'AppShell.Footer';

/**
 * AppShell.Body - Wrapper for sidebar + main content area (flex row).
 */
const Body = forwardRef<HTMLDivElement, AppShellBodyProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('flex flex-1 overflow-hidden', className)} {...props} />;
});
Body.displayName = 'AppShell.Body';

export const AppShell = Object.assign(AppShellRoot, {
  Header,
  Sidebar,
  Main,
  Footer,
  Body,
});
