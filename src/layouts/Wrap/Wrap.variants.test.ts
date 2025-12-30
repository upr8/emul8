import { describe, expect, it } from 'vitest';
import { wrapVariants } from './Wrap.variants';

describe('wrapVariants', () => {
  it('includes base classes', () => {
    const classes = wrapVariants();
    expect(classes).toContain('flex');
    expect(classes).toContain('flex-wrap');
  });

  describe('gap variants', () => {
    it('applies none gap', () => {
      const classes = wrapVariants({ gap: 'none' });
      expect(classes).toContain('gap-0');
    });

    it('applies xs gap', () => {
      const classes = wrapVariants({ gap: 'xs' });
      expect(classes).toContain('gap-1');
    });

    it('applies sm gap', () => {
      const classes = wrapVariants({ gap: 'sm' });
      expect(classes).toContain('gap-2');
    });

    it('applies md gap', () => {
      const classes = wrapVariants({ gap: 'md' });
      expect(classes).toContain('gap-4');
    });

    it('applies lg gap', () => {
      const classes = wrapVariants({ gap: 'lg' });
      expect(classes).toContain('gap-6');
    });

    it('applies xl gap', () => {
      const classes = wrapVariants({ gap: 'xl' });
      expect(classes).toContain('gap-8');
    });
  });

  describe('align variants', () => {
    it('applies start alignment', () => {
      const classes = wrapVariants({ align: 'start' });
      expect(classes).toContain('items-start');
    });

    it('applies center alignment', () => {
      const classes = wrapVariants({ align: 'center' });
      expect(classes).toContain('items-center');
    });

    it('applies end alignment', () => {
      const classes = wrapVariants({ align: 'end' });
      expect(classes).toContain('items-end');
    });

    it('applies stretch alignment', () => {
      const classes = wrapVariants({ align: 'stretch' });
      expect(classes).toContain('items-stretch');
    });

    it('applies baseline alignment', () => {
      const classes = wrapVariants({ align: 'baseline' });
      expect(classes).toContain('items-baseline');
    });
  });

  describe('justify variants', () => {
    it('applies start justify', () => {
      const classes = wrapVariants({ justify: 'start' });
      expect(classes).toContain('justify-start');
    });

    it('applies center justify', () => {
      const classes = wrapVariants({ justify: 'center' });
      expect(classes).toContain('justify-center');
    });

    it('applies end justify', () => {
      const classes = wrapVariants({ justify: 'end' });
      expect(classes).toContain('justify-end');
    });
  });

  describe('default variants', () => {
    it('uses sm gap by default', () => {
      const classes = wrapVariants();
      expect(classes).toContain('gap-2');
    });

    it('uses center alignment by default', () => {
      const classes = wrapVariants();
      expect(classes).toContain('items-center');
    });

    it('uses start justify by default', () => {
      const classes = wrapVariants();
      expect(classes).toContain('justify-start');
    });
  });
});
