import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ConfigContext, type Direction, type Platform, type Theme } from './context';

export interface ConfigProviderProps {
  children: ReactNode;
  /** Target platform for platform-specific styling */
  platform?: Platform;
  /** Initial theme setting */
  defaultTheme?: Theme;
  /** Initial text direction */
  defaultDirection?: Direction;
  /** Initial locale code */
  defaultLocale?: string;
  /** Storage key for persisting theme preference */
  storageKey?: string;
}

function resolveTheme(theme: Theme, prefersDark: boolean): 'light' | 'dark' {
  if (theme === 'system') {
    return prefersDark ? 'dark' : 'light';
  }
  return theme;
}

/**
 * ConfigProvider provides global configuration context for the design system.
 *
 * It handles:
 * - Platform detection (android/ios/web)
 * - Theme management (light/dark/system with system preference detection)
 * - RTL/LTR text direction
 * - Locale/i18n settings
 */
export function ConfigProvider({
  children,
  platform = 'web',
  defaultTheme = 'system',
  defaultDirection = 'ltr',
  defaultLocale = 'en',
  storageKey = 'emul8-theme',
}: ConfigProviderProps) {
  // Use defaultTheme for initial render to avoid hydration mismatch
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [direction, setDirection] = useState<Direction>(defaultDirection);
  const [locale, setLocale] = useState(defaultLocale);
  // Default to 'light' for SSR, will be corrected after mount
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(
    defaultTheme === 'dark' ? 'dark' : 'light'
  );
  const mountedRef = useRef(false);

  // Initialize on mount: restore from storage and resolve theme in one pass
  useEffect(() => {
    mountedRef.current = true;

    let initialTheme = defaultTheme;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        initialTheme = stored;
        setThemeState(stored);
      }
    } catch {
      // Storage not available
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setResolvedTheme(resolveTheme(initialTheme, mediaQuery.matches));
  }, [storageKey, defaultTheme]);

  // Handle theme changes and system preference updates
  useEffect(() => {
    /* c8 ignore next */
    if (!mountedRef.current) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      setResolvedTheme(resolveTheme(theme, mediaQuery.matches));
    };

    // Update resolved theme when theme prop changes
    setResolvedTheme(resolveTheme(theme, mediaQuery.matches));

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    /* c8 ignore next - SSR check */
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    root.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  // Apply direction to document
  useEffect(() => {
    /* c8 ignore next - SSR check */
    if (typeof document === 'undefined') return;

    document.documentElement.dir = direction;
    document.documentElement.setAttribute('data-direction', direction);
  }, [direction]);

  // Apply platform to document
  useEffect(() => {
    /* c8 ignore next - SSR check */
    if (typeof document === 'undefined') return;

    document.documentElement.setAttribute('data-platform', platform);
  }, [platform]);

  // Persist theme preference
  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      /* c8 ignore next - SSR check */
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(storageKey, newTheme);
        } catch {
          // Storage not available
        }
      }
    },
    [storageKey]
  );

  const value = useMemo(
    () => ({
      platform,
      theme,
      resolvedTheme,
      direction,
      locale,
      setTheme,
      setDirection,
      setLocale,
    }),
    [platform, theme, resolvedTheme, direction, locale, setTheme]
  );

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}
