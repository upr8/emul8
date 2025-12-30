import { describe, expect, it } from 'vitest';
import { sidebarVariants } from './Sidebar.variants';

describe('sidebarVariants', () => {
  it('includes base classes', () => {
    const result = sidebarVariants();
    expect(result).toContain('flex');
    expect(result).toContain('flex-wrap');
  });

  describe('gap variant', () => {
    it('applies none gap', () => {
      expect(sidebarVariants({ gap: 'none' })).toContain('gap-0');
    });

    it('applies xs gap', () => {
      expect(sidebarVariants({ gap: 'xs' })).toContain('gap-1');
    });

    it('applies sm gap', () => {
      expect(sidebarVariants({ gap: 'sm' })).toContain('gap-2');
    });

    it('applies md gap (default)', () => {
      expect(sidebarVariants()).toContain('gap-4');
    });

    it('applies lg gap', () => {
      expect(sidebarVariants({ gap: 'lg' })).toContain('gap-6');
    });

    it('applies xl gap', () => {
      expect(sidebarVariants({ gap: 'xl' })).toContain('gap-8');
    });
  });

  describe('noStretch variant', () => {
    it('applies items-stretch by default', () => {
      expect(sidebarVariants()).toContain('items-stretch');
    });

    it('applies items-stretch when noStretch is false', () => {
      expect(sidebarVariants({ noStretch: false })).toContain('items-stretch');
    });

    it('applies items-start when noStretch is true', () => {
      expect(sidebarVariants({ noStretch: true })).toContain('items-start');
    });
  });
});
