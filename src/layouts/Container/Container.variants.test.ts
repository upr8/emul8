import { describe, expect, it } from 'vitest';
import { centerVariants, containerVariants } from './Container.variants';

describe('containerVariants', () => {
  it('includes base classes', () => {
    const result = containerVariants();
    expect(result).toContain('mx-auto');
    expect(result).toContain('w-full');
  });

  describe('size variant', () => {
    it('applies sm size', () => {
      expect(containerVariants({ size: 'sm' })).toContain('max-w-screen-sm');
    });

    it('applies md size', () => {
      expect(containerVariants({ size: 'md' })).toContain('max-w-screen-md');
    });

    it('applies lg size (default)', () => {
      expect(containerVariants()).toContain('max-w-screen-lg');
    });

    it('applies xl size', () => {
      expect(containerVariants({ size: 'xl' })).toContain('max-w-screen-xl');
    });

    it('applies 2xl size', () => {
      expect(containerVariants({ size: '2xl' })).toContain('max-w-screen-2xl');
    });

    it('applies full size', () => {
      expect(containerVariants({ size: 'full' })).toContain('max-w-full');
    });
  });

  describe('padding variant', () => {
    it('applies none padding with logical properties', () => {
      const classes = containerVariants({ padding: 'none' });
      expect(classes).toContain('ps-0');
      expect(classes).toContain('pe-0');
    });

    it('applies sm padding with logical properties', () => {
      const classes = containerVariants({ padding: 'sm' });
      expect(classes).toContain('ps-4');
      expect(classes).toContain('pe-4');
    });

    it('applies md padding by default with logical properties', () => {
      const classes = containerVariants();
      expect(classes).toContain('ps-6');
      expect(classes).toContain('pe-6');
    });

    it('applies lg padding with logical properties', () => {
      const classes = containerVariants({ padding: 'lg' });
      expect(classes).toContain('ps-8');
      expect(classes).toContain('pe-8');
    });
  });

  describe('center variant', () => {
    it('applies center classes when true', () => {
      const result = containerVariants({ center: true });
      expect(result).toContain('flex');
      expect(result).toContain('flex-col');
      expect(result).toContain('items-center');
    });
  });

  describe('andText variant', () => {
    it('applies text-center when true', () => {
      expect(containerVariants({ andText: true })).toContain('text-center');
    });
  });
});

describe('centerVariants', () => {
  it('is an alias for containerVariants', () => {
    expect(centerVariants).toBe(containerVariants);
  });
});
