import { describe, expect, it } from 'vitest';
import { flexVariants } from './Flex.variants';

describe('flexVariants', () => {
  it('includes base flex class', () => {
    const classes = flexVariants();
    expect(classes).toContain('flex');
  });

  describe('direction variants', () => {
    it('applies row direction', () => {
      const classes = flexVariants({ direction: 'row' });
      expect(classes).toContain('flex-row');
    });

    it('applies column direction', () => {
      const classes = flexVariants({ direction: 'column' });
      expect(classes).toContain('flex-col');
    });

    it('applies rowReverse direction', () => {
      const classes = flexVariants({ direction: 'rowReverse' });
      expect(classes).toContain('flex-row-reverse');
    });

    it('applies columnReverse direction', () => {
      const classes = flexVariants({ direction: 'columnReverse' });
      expect(classes).toContain('flex-col-reverse');
    });
  });

  describe('align variants', () => {
    it('applies start alignment', () => {
      const classes = flexVariants({ align: 'start' });
      expect(classes).toContain('items-start');
    });

    it('applies center alignment', () => {
      const classes = flexVariants({ align: 'center' });
      expect(classes).toContain('items-center');
    });

    it('applies end alignment', () => {
      const classes = flexVariants({ align: 'end' });
      expect(classes).toContain('items-end');
    });

    it('applies stretch alignment', () => {
      const classes = flexVariants({ align: 'stretch' });
      expect(classes).toContain('items-stretch');
    });

    it('applies baseline alignment', () => {
      const classes = flexVariants({ align: 'baseline' });
      expect(classes).toContain('items-baseline');
    });
  });

  describe('justify variants', () => {
    it('applies start justify', () => {
      const classes = flexVariants({ justify: 'start' });
      expect(classes).toContain('justify-start');
    });

    it('applies center justify', () => {
      const classes = flexVariants({ justify: 'center' });
      expect(classes).toContain('justify-center');
    });

    it('applies end justify', () => {
      const classes = flexVariants({ justify: 'end' });
      expect(classes).toContain('justify-end');
    });

    it('applies between justify', () => {
      const classes = flexVariants({ justify: 'between' });
      expect(classes).toContain('justify-between');
    });

    it('applies around justify', () => {
      const classes = flexVariants({ justify: 'around' });
      expect(classes).toContain('justify-around');
    });

    it('applies evenly justify', () => {
      const classes = flexVariants({ justify: 'evenly' });
      expect(classes).toContain('justify-evenly');
    });
  });

  describe('wrap variants', () => {
    it('applies nowrap', () => {
      const classes = flexVariants({ wrap: 'nowrap' });
      expect(classes).toContain('flex-nowrap');
    });

    it('applies wrap', () => {
      const classes = flexVariants({ wrap: 'wrap' });
      expect(classes).toContain('flex-wrap');
    });

    it('applies wrapReverse', () => {
      const classes = flexVariants({ wrap: 'wrapReverse' });
      expect(classes).toContain('flex-wrap-reverse');
    });
  });

  describe('gap variants', () => {
    it('applies none gap', () => {
      const classes = flexVariants({ gap: 'none' });
      expect(classes).toContain('gap-0');
    });

    it('applies md gap', () => {
      const classes = flexVariants({ gap: 'md' });
      expect(classes).toContain('gap-4');
    });

    it('applies 2xl gap', () => {
      const classes = flexVariants({ gap: '2xl' });
      expect(classes).toContain('gap-12');
    });
  });

  describe('inline variant', () => {
    it('applies inline-flex when true', () => {
      const classes = flexVariants({ inline: true });
      expect(classes).toContain('inline-flex');
    });

    it('applies flex when false', () => {
      const classes = flexVariants({ inline: false });
      expect(classes).toContain('flex');
    });
  });

  describe('default variants', () => {
    it('uses row direction by default', () => {
      const classes = flexVariants();
      expect(classes).toContain('flex-row');
    });

    it('uses stretch alignment by default', () => {
      const classes = flexVariants();
      expect(classes).toContain('items-stretch');
    });

    it('uses start justify by default', () => {
      const classes = flexVariants();
      expect(classes).toContain('justify-start');
    });

    it('uses nowrap by default', () => {
      const classes = flexVariants();
      expect(classes).toContain('flex-nowrap');
    });

    it('uses no gap by default', () => {
      const classes = flexVariants();
      expect(classes).toContain('gap-0');
    });
  });
});
