import { describe, expect, it } from 'vitest';
import { dividerVariants } from './Divider.variants';

describe('dividerVariants', () => {
  it('includes base classes', () => {
    const classes = dividerVariants();
    expect(classes).toContain('shrink-0');
    expect(classes).toContain('bg-current');
    expect(classes).toContain('opacity-20');
  });

  describe('orientation variants', () => {
    it('applies horizontal orientation', () => {
      const classes = dividerVariants({ orientation: 'horizontal' });
      expect(classes).toContain('w-full');
      expect(classes).toContain('h-px');
    });

    it('applies vertical orientation', () => {
      const classes = dividerVariants({ orientation: 'vertical' });
      expect(classes).toContain('h-full');
      expect(classes).toContain('w-px');
    });
  });

  describe('size variants with horizontal orientation', () => {
    it('applies sm size', () => {
      const classes = dividerVariants({ orientation: 'horizontal', size: 'sm' });
      expect(classes).toContain('h-px');
    });

    it('applies md size', () => {
      const classes = dividerVariants({ orientation: 'horizontal', size: 'md' });
      expect(classes).toContain('h-0.5');
    });

    it('applies lg size', () => {
      const classes = dividerVariants({ orientation: 'horizontal', size: 'lg' });
      expect(classes).toContain('h-1');
    });
  });

  describe('size variants with vertical orientation', () => {
    it('applies sm size', () => {
      const classes = dividerVariants({ orientation: 'vertical', size: 'sm' });
      expect(classes).toContain('w-px');
    });

    it('applies md size', () => {
      const classes = dividerVariants({ orientation: 'vertical', size: 'md' });
      expect(classes).toContain('w-0.5');
    });

    it('applies lg size', () => {
      const classes = dividerVariants({ orientation: 'vertical', size: 'lg' });
      expect(classes).toContain('w-1');
    });
  });

  describe('default variants', () => {
    it('uses horizontal orientation by default', () => {
      const classes = dividerVariants();
      expect(classes).toContain('w-full');
    });

    it('uses sm size by default', () => {
      const classes = dividerVariants();
      expect(classes).toContain('h-px');
    });
  });
});
