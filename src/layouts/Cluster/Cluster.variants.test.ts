import { describe, expect, it } from 'vitest';
import { clusterVariants } from './Cluster.variants';

describe('clusterVariants', () => {
  it('includes base classes', () => {
    const result = clusterVariants();
    expect(result).toContain('flex');
    expect(result).toContain('flex-wrap');
  });

  describe('gap variant', () => {
    it('applies none gap', () => {
      expect(clusterVariants({ gap: 'none' })).toContain('gap-0');
    });

    it('applies xs gap', () => {
      expect(clusterVariants({ gap: 'xs' })).toContain('gap-1');
    });

    it('applies sm gap (default)', () => {
      expect(clusterVariants()).toContain('gap-2');
    });

    it('applies md gap', () => {
      expect(clusterVariants({ gap: 'md' })).toContain('gap-4');
    });

    it('applies lg gap', () => {
      expect(clusterVariants({ gap: 'lg' })).toContain('gap-6');
    });

    it('applies xl gap', () => {
      expect(clusterVariants({ gap: 'xl' })).toContain('gap-8');
    });
  });

  describe('justify variant', () => {
    it('applies start justify (default)', () => {
      expect(clusterVariants()).toContain('justify-start');
    });

    it('applies center justify', () => {
      expect(clusterVariants({ justify: 'center' })).toContain('justify-center');
    });

    it('applies end justify', () => {
      expect(clusterVariants({ justify: 'end' })).toContain('justify-end');
    });

    it('applies between justify', () => {
      expect(clusterVariants({ justify: 'between' })).toContain('justify-between');
    });
  });

  describe('align variant', () => {
    it('applies start alignment (default)', () => {
      expect(clusterVariants()).toContain('items-start');
    });

    it('applies center alignment', () => {
      expect(clusterVariants({ align: 'center' })).toContain('items-center');
    });

    it('applies end alignment', () => {
      expect(clusterVariants({ align: 'end' })).toContain('items-end');
    });

    it('applies baseline alignment', () => {
      expect(clusterVariants({ align: 'baseline' })).toContain('items-baseline');
    });

    it('applies stretch alignment', () => {
      expect(clusterVariants({ align: 'stretch' })).toContain('items-stretch');
    });
  });
});
