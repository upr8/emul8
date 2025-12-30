import { useContext } from 'react';
import { ConfigContext } from './context';

/**
 * Hook to access the full config context.
 * Must be used within a ConfigProvider.
 */
export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}

/**
 * Hook to access and update theme settings.
 */
export function useTheme() {
  const { theme, resolvedTheme, setTheme } = useConfig();
  return { theme, resolvedTheme, setTheme };
}

/**
 * Hook to access the current platform.
 */
export function usePlatform() {
  const { platform } = useConfig();
  return platform;
}

/**
 * Hook to access and update text direction.
 */
export function useDirection() {
  const { direction, setDirection } = useConfig();
  return { direction, setDirection };
}

/**
 * Hook to access and update locale settings.
 */
export function useLocale() {
  const { locale, setLocale } = useConfig();
  return { locale, setLocale };
}
