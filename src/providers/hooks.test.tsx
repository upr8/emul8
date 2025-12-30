import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ConfigProvider } from './ConfigProvider';
import { useConfig, useDirection, useLocale, usePlatform, useTheme } from './hooks';

// Mock matchMedia
const createMatchMedia = (matches: boolean) =>
  vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

describe('hooks', () => {
  beforeEach(() => {
    window.matchMedia = createMatchMedia(false);
  });

  describe('useConfig', () => {
    it('throws error when used outside ConfigProvider', () => {
      expect(() => {
        renderHook(() => useConfig());
      }).toThrow('useConfig must be used within a ConfigProvider');
    });

    it('returns config context when used within ConfigProvider', () => {
      const { result } = renderHook(() => useConfig(), {
        wrapper: ({ children }) => <ConfigProvider>{children}</ConfigProvider>,
      });

      expect(result.current).toEqual(
        expect.objectContaining({
          platform: 'web',
          theme: 'system',
          direction: 'ltr',
          locale: 'en',
        })
      );
    });
  });

  describe('useTheme', () => {
    it('returns theme values and setTheme', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }) => <ConfigProvider>{children}</ConfigProvider>,
      });

      expect(result.current.theme).toBe('system');
      expect(result.current.resolvedTheme).toBeDefined();
      expect(typeof result.current.setTheme).toBe('function');
    });
  });

  describe('usePlatform', () => {
    it('returns platform value', () => {
      const { result } = renderHook(() => usePlatform(), {
        wrapper: ({ children }) => <ConfigProvider platform="ios">{children}</ConfigProvider>,
      });

      expect(result.current).toBe('ios');
    });
  });

  describe('useDirection', () => {
    it('returns direction and setDirection', () => {
      const { result } = renderHook(() => useDirection(), {
        wrapper: ({ children }) => <ConfigProvider>{children}</ConfigProvider>,
      });

      expect(result.current.direction).toBe('ltr');
      expect(typeof result.current.setDirection).toBe('function');
    });
  });

  describe('useLocale', () => {
    it('returns locale and setLocale', () => {
      const { result } = renderHook(() => useLocale(), {
        wrapper: ({ children }) => <ConfigProvider>{children}</ConfigProvider>,
      });

      expect(result.current.locale).toBe('en');
      expect(typeof result.current.setLocale).toBe('function');
    });
  });
});
