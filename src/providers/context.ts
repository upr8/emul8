import { createContext } from 'react';

export type Platform = 'android' | 'ios' | 'web';
export type Theme = 'light' | 'dark' | 'system';
export type Direction = 'ltr' | 'rtl';

export interface ConfigContextValue {
  /** Target platform for platform-specific styling */
  platform: Platform;
  /** Current theme setting (light, dark, or system) */
  theme: Theme;
  /** Resolved theme after applying system preference */
  resolvedTheme: 'light' | 'dark';
  /** Text direction for RTL language support */
  direction: Direction;
  /** Current locale code (e.g., "en", "ar", "fa") */
  locale: string;
  /** Update theme setting */
  setTheme: (theme: Theme) => void;
  /** Update text direction */
  setDirection: (dir: Direction) => void;
  /** Update locale */
  setLocale: (locale: string) => void;
}

export const ConfigContext = createContext<ConfigContextValue | null>(null);
