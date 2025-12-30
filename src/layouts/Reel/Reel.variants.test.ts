import { describe, expect, it } from 'vitest';
import { reelVariants } from './Reel.variants';

describe('reelVariants', () => {
  it('includes base classes', () => {
    const result = reelVariants();
    expect(result).toContain('flex');
    expect(result).toContain('overflow-x-auto');
    expect(result).toContain('overflow-y-hidden');
  });

  describe('gap variant', () => {
    it('applies none gap', () => {
      expect(reelVariants({ gap: 'none' })).toContain('gap-0');
    });

    it('applies xs gap', () => {
      expect(reelVariants({ gap: 'xs' })).toContain('gap-1');
    });

    it('applies sm gap', () => {
      expect(reelVariants({ gap: 'sm' })).toContain('gap-2');
    });

    it('applies md gap (default)', () => {
      expect(reelVariants()).toContain('gap-4');
    });

    it('applies lg gap', () => {
      expect(reelVariants({ gap: 'lg' })).toContain('gap-6');
    });

    it('applies xl gap', () => {
      expect(reelVariants({ gap: 'xl' })).toContain('gap-8');
    });
  });

  describe('noBar variant', () => {
    it('shows scrollbar by default (pb-2)', () => {
      expect(reelVariants()).toContain('pb-2');
    });

    it('shows scrollbar when noBar is false', () => {
      expect(reelVariants({ noBar: false })).toContain('pb-2');
    });

    it('hides scrollbar when noBar is true', () => {
      const result = reelVariants({ noBar: true });
      expect(result).toContain('scrollbar-none');
      expect(result).not.toContain('pb-2');
    });
  });
});
