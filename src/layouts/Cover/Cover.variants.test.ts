import { describe, expect, it } from 'vitest';
import { coverVariants } from './Cover.variants';

describe('coverVariants', () => {
  it('includes base classes', () => {
    const result = coverVariants();
    expect(result).toContain('flex');
    expect(result).toContain('flex-col');
  });

  describe('gap variant', () => {
    it('applies none gap', () => {
      expect(coverVariants({ gap: 'none' })).toContain('gap-0');
    });

    it('applies xs gap', () => {
      expect(coverVariants({ gap: 'xs' })).toContain('gap-1');
    });

    it('applies sm gap', () => {
      expect(coverVariants({ gap: 'sm' })).toContain('gap-2');
    });

    it('applies md gap (default)', () => {
      expect(coverVariants()).toContain('gap-4');
    });

    it('applies lg gap', () => {
      expect(coverVariants({ gap: 'lg' })).toContain('gap-6');
    });

    it('applies xl gap', () => {
      expect(coverVariants({ gap: 'xl' })).toContain('gap-8');
    });
  });

  describe('noPad variant', () => {
    it('applies p-4 by default (noPad: false)', () => {
      expect(coverVariants()).toContain('p-4');
    });

    it('applies p-0 when noPad is true', () => {
      expect(coverVariants({ noPad: true })).toContain('p-0');
    });

    it('applies p-4 when noPad is false', () => {
      expect(coverVariants({ noPad: false })).toContain('p-4');
    });
  });
});
