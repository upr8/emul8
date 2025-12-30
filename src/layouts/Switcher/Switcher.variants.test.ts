import { describe, expect, it } from 'vitest';
import { switcherVariants } from './Switcher.variants';

describe('switcherVariants', () => {
  it('includes base classes', () => {
    const result = switcherVariants();
    expect(result).toContain('flex');
    expect(result).toContain('flex-wrap');
  });

  describe('gap variant', () => {
    it('applies none gap', () => {
      expect(switcherVariants({ gap: 'none' })).toContain('gap-0');
    });

    it('applies xs gap', () => {
      expect(switcherVariants({ gap: 'xs' })).toContain('gap-1');
    });

    it('applies sm gap', () => {
      expect(switcherVariants({ gap: 'sm' })).toContain('gap-2');
    });

    it('applies md gap (default)', () => {
      expect(switcherVariants()).toContain('gap-4');
    });

    it('applies lg gap', () => {
      expect(switcherVariants({ gap: 'lg' })).toContain('gap-6');
    });

    it('applies xl gap', () => {
      expect(switcherVariants({ gap: 'xl' })).toContain('gap-8');
    });
  });
});
