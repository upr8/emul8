import { describe, expect, it } from 'vitest';
import { stackVariants } from './Stack.variants';

describe('stackVariants', () => {
  it('includes base flex class', () => {
    expect(stackVariants()).toContain('flex');
  });

  describe('direction variant', () => {
    it('applies vertical direction (default)', () => {
      expect(stackVariants()).toContain('flex-col');
    });

    it('applies horizontal direction', () => {
      expect(stackVariants({ direction: 'horizontal' })).toContain('flex-row');
    });
  });

  describe('gap variant', () => {
    it('applies none gap', () => {
      expect(stackVariants({ gap: 'none' })).toContain('gap-0');
    });

    it('applies xs gap', () => {
      expect(stackVariants({ gap: 'xs' })).toContain('gap-1');
    });

    it('applies sm gap', () => {
      expect(stackVariants({ gap: 'sm' })).toContain('gap-2');
    });

    it('applies md gap (default)', () => {
      expect(stackVariants()).toContain('gap-4');
    });

    it('applies lg gap', () => {
      expect(stackVariants({ gap: 'lg' })).toContain('gap-6');
    });

    it('applies xl gap', () => {
      expect(stackVariants({ gap: 'xl' })).toContain('gap-8');
    });

    it('applies 2xl gap', () => {
      expect(stackVariants({ gap: '2xl' })).toContain('gap-12');
    });
  });

  describe('align variant', () => {
    it('applies start alignment', () => {
      expect(stackVariants({ align: 'start' })).toContain('items-start');
    });

    it('applies center alignment', () => {
      expect(stackVariants({ align: 'center' })).toContain('items-center');
    });

    it('applies end alignment', () => {
      expect(stackVariants({ align: 'end' })).toContain('items-end');
    });

    it('applies stretch alignment', () => {
      expect(stackVariants({ align: 'stretch' })).toContain('items-stretch');
    });

    it('applies baseline alignment', () => {
      expect(stackVariants({ align: 'baseline' })).toContain('items-baseline');
    });
  });

  describe('justify variant', () => {
    it('applies start justify', () => {
      expect(stackVariants({ justify: 'start' })).toContain('justify-start');
    });

    it('applies center justify', () => {
      expect(stackVariants({ justify: 'center' })).toContain('justify-center');
    });

    it('applies end justify', () => {
      expect(stackVariants({ justify: 'end' })).toContain('justify-end');
    });

    it('applies between justify', () => {
      expect(stackVariants({ justify: 'between' })).toContain('justify-between');
    });

    it('applies around justify', () => {
      expect(stackVariants({ justify: 'around' })).toContain('justify-around');
    });

    it('applies evenly justify', () => {
      expect(stackVariants({ justify: 'evenly' })).toContain('justify-evenly');
    });
  });

  describe('wrap variant', () => {
    it('applies flex-nowrap by default', () => {
      expect(stackVariants()).toContain('flex-nowrap');
    });

    it('applies flex-wrap when true', () => {
      expect(stackVariants({ wrap: true })).toContain('flex-wrap');
    });

    it('applies flex-nowrap when false', () => {
      expect(stackVariants({ wrap: false })).toContain('flex-nowrap');
    });
  });
});
