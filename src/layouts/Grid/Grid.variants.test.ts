import { describe, expect, it } from 'vitest';
import { gridVariants } from './Grid.variants';

describe('gridVariants', () => {
  it('includes base grid class', () => {
    expect(gridVariants()).toContain('grid');
  });

  describe('gap variant', () => {
    it('applies none gap', () => {
      expect(gridVariants({ gap: 'none' })).toContain('gap-0');
    });

    it('applies xs gap', () => {
      expect(gridVariants({ gap: 'xs' })).toContain('gap-1');
    });

    it('applies sm gap', () => {
      expect(gridVariants({ gap: 'sm' })).toContain('gap-2');
    });

    it('applies md gap (default)', () => {
      expect(gridVariants()).toContain('gap-4');
    });

    it('applies lg gap', () => {
      expect(gridVariants({ gap: 'lg' })).toContain('gap-6');
    });

    it('applies xl gap', () => {
      expect(gridVariants({ gap: 'xl' })).toContain('gap-8');
    });
  });
});
