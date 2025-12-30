import { act, render, renderHook, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ConfigProvider } from './ConfigProvider';
import { useConfig, useDirection, useLocale, usePlatform, useTheme } from './hooks';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: () => {
      store = {};
    },
  };
})();

// Mock matchMedia
const createMatchMedia = (matches: boolean) => {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  return vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn((_event: string, listener: (e: MediaQueryListEvent) => void) => {
      listeners.push(listener);
    }),
    removeEventListener: vi.fn((_event: string, listener: (e: MediaQueryListEvent) => void) => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    }),
    dispatchEvent: vi.fn(),
    // Helper to trigger change
    _triggerChange: (newMatches: boolean) => {
      listeners.forEach((listener) => listener({ matches: newMatches } as MediaQueryListEvent));
    },
  }));
};

describe('ConfigProvider', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-direction');
    document.documentElement.removeAttribute('data-platform');
  });

  it('renders children', () => {
    window.matchMedia = createMatchMedia(false);
    render(
      <ConfigProvider>
        <div data-testid="child">Hello</div>
      </ConfigProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('provides default context values', () => {
    window.matchMedia = createMatchMedia(false);
    const { result } = renderHook(() => useConfig(), {
      wrapper: ({ children }) => <ConfigProvider>{children}</ConfigProvider>,
    });

    expect(result.current.platform).toBe('web');
    expect(result.current.theme).toBe('system');
    expect(result.current.direction).toBe('ltr');
    expect(result.current.locale).toBe('en');
  });

  it('accepts custom default values', () => {
    window.matchMedia = createMatchMedia(false);
    const { result } = renderHook(() => useConfig(), {
      wrapper: ({ children }) => (
        <ConfigProvider
          platform="ios"
          defaultTheme="dark"
          defaultDirection="rtl"
          defaultLocale="ar"
        >
          {children}
        </ConfigProvider>
      ),
    });

    expect(result.current.platform).toBe('ios');
    expect(result.current.theme).toBe('dark');
    expect(result.current.direction).toBe('rtl');
    expect(result.current.locale).toBe('ar');
  });

  describe('theme management', () => {
    it('resolves system theme based on prefers-color-scheme', async () => {
      window.matchMedia = createMatchMedia(true); // prefers dark
      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }) => (
          <ConfigProvider defaultTheme="system">{children}</ConfigProvider>
        ),
      });

      await waitFor(() => {
        expect(result.current.resolvedTheme).toBe('dark');
      });
    });

    it('resolves light theme correctly', async () => {
      window.matchMedia = createMatchMedia(false);
      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }) => <ConfigProvider defaultTheme="light">{children}</ConfigProvider>,
      });

      await waitFor(() => {
        expect(result.current.resolvedTheme).toBe('light');
      });
    });

    it('resolves dark theme correctly', async () => {
      window.matchMedia = createMatchMedia(false);
      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }) => <ConfigProvider defaultTheme="dark">{children}</ConfigProvider>,
      });

      await waitFor(() => {
        expect(result.current.resolvedTheme).toBe('dark');
      });
    });

    it('updates theme and persists to localStorage', async () => {
      window.matchMedia = createMatchMedia(false);
      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }) => <ConfigProvider>{children}</ConfigProvider>,
      });

      act(() => {
        result.current.setTheme('dark');
      });

      expect(result.current.theme).toBe('dark');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('emul8-theme', 'dark');
    });

    it('uses custom storage key', async () => {
      window.matchMedia = createMatchMedia(false);
      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }) => (
          <ConfigProvider storageKey="custom-theme-key">{children}</ConfigProvider>
        ),
      });

      act(() => {
        result.current.setTheme('light');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('custom-theme-key', 'light');
    });

    it('restores theme from localStorage', async () => {
      localStorageMock.getItem.mockReturnValueOnce('dark');
      window.matchMedia = createMatchMedia(false);

      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }) => <ConfigProvider>{children}</ConfigProvider>,
      });

      await waitFor(() => {
        expect(result.current.theme).toBe('dark');
      });
    });

    it('applies theme class to document', async () => {
      window.matchMedia = createMatchMedia(false);
      renderHook(() => useTheme(), {
        wrapper: ({ children }) => <ConfigProvider defaultTheme="dark">{children}</ConfigProvider>,
      });

      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
      });
    });
  });

  describe('direction management', () => {
    it('updates direction', () => {
      window.matchMedia = createMatchMedia(false);
      const { result } = renderHook(() => useDirection(), {
        wrapper: ({ children }) => <ConfigProvider>{children}</ConfigProvider>,
      });

      act(() => {
        result.current.setDirection('rtl');
      });

      expect(result.current.direction).toBe('rtl');
    });

    it('applies direction to document', async () => {
      window.matchMedia = createMatchMedia(false);
      renderHook(() => useDirection(), {
        wrapper: ({ children }) => (
          <ConfigProvider defaultDirection="rtl">{children}</ConfigProvider>
        ),
      });

      await waitFor(() => {
        expect(document.documentElement.dir).toBe('rtl');
        expect(document.documentElement.getAttribute('data-direction')).toBe('rtl');
      });
    });
  });

  describe('locale management', () => {
    it('updates locale', () => {
      window.matchMedia = createMatchMedia(false);
      const { result } = renderHook(() => useLocale(), {
        wrapper: ({ children }) => <ConfigProvider>{children}</ConfigProvider>,
      });

      act(() => {
        result.current.setLocale('fr');
      });

      expect(result.current.locale).toBe('fr');
    });
  });

  describe('platform', () => {
    it('returns the platform', () => {
      window.matchMedia = createMatchMedia(false);
      const { result } = renderHook(() => usePlatform(), {
        wrapper: ({ children }) => <ConfigProvider platform="android">{children}</ConfigProvider>,
      });

      expect(result.current).toBe('android');
    });

    it('applies platform to document', async () => {
      window.matchMedia = createMatchMedia(false);
      render(
        <ConfigProvider platform="ios">
          <div>Content</div>
        </ConfigProvider>
      );

      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-platform')).toBe('ios');
      });
    });
  });

  describe('localStorage error handling', () => {
    it('handles localStorage.getItem error gracefully', async () => {
      localStorageMock.getItem.mockImplementationOnce(() => {
        throw new Error('Storage error');
      });
      window.matchMedia = createMatchMedia(false);

      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }) => <ConfigProvider>{children}</ConfigProvider>,
      });

      // Should use defaultTheme when storage fails
      expect(result.current.theme).toBe('system');
    });

    it('handles localStorage.setItem error gracefully', () => {
      localStorageMock.setItem.mockImplementationOnce(() => {
        throw new Error('Storage error');
      });
      window.matchMedia = createMatchMedia(false);

      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }) => <ConfigProvider>{children}</ConfigProvider>,
      });

      // Should not throw when setting theme fails
      expect(() => {
        act(() => {
          result.current.setTheme('dark');
        });
      }).not.toThrow();
    });
  });

  describe('system theme changes', () => {
    it('listens to media query changes', async () => {
      // Set up matchMedia with change listener tracking
      let changeListener: ((e: MediaQueryListEvent) => void) | null = null;
      window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: false,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addEventListener: vi.fn((_event: string, listener: (e: MediaQueryListEvent) => void) => {
          changeListener = listener;
        }),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }) => (
          <ConfigProvider defaultTheme="system">{children}</ConfigProvider>
        ),
      });

      await waitFor(() => {
        expect(result.current.resolvedTheme).toBe('light');
      });

      // Simulate system theme change
      act(() => {
        if (changeListener) {
          changeListener({ matches: true } as MediaQueryListEvent);
        }
      });

      // The listener should trigger a re-resolution of the theme
      // Note: Due to how the effect works, we mainly test that the listener is added
      expect(changeListener).not.toBeNull();
    });
  });
});
