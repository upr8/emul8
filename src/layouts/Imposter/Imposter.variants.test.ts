import { describe, expect, it } from 'vitest';
import { imposterVariants } from './Imposter.variants';

describe('imposterVariants', () => {
  it('includes base classes', () => {
    const result = imposterVariants();
    expect(result).toContain('inset-0');
    expect(result).toContain('flex');
    expect(result).toContain('items-center');
    expect(result).toContain('justify-center');
    expect(result).toContain('overflow-auto');
  });

  describe('fixed variant', () => {
    it('applies absolute positioning by default', () => {
      expect(imposterVariants()).toContain('absolute');
    });

    it('applies absolute positioning when false', () => {
      expect(imposterVariants({ fixed: false })).toContain('absolute');
    });

    it('applies fixed positioning when true', () => {
      expect(imposterVariants({ fixed: true })).toContain('fixed');
    });
  });
});
