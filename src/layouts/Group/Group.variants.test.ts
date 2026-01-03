import { describe, expect, it } from 'vitest';
import { groupVariants } from './Group.variants';

describe('groupVariants', () => {
  it('includes base classes', () => {
    const classes = groupVariants();
    expect(classes).toContain('inline-flex');
    expect(classes).toContain('items-center');
  });

  describe('gap variants', () => {
    it('applies none gap', () => {
      const classes = groupVariants({ gap: 'none' });
      expect(classes).toContain('gap-0');
    });

    it('applies xs gap', () => {
      const classes = groupVariants({ gap: 'xs' });
      expect(classes).toContain('gap-1');
    });

    it('applies sm gap', () => {
      const classes = groupVariants({ gap: 'sm' });
      expect(classes).toContain('gap-2');
    });

    it('applies md gap', () => {
      const classes = groupVariants({ gap: 'md' });
      expect(classes).toContain('gap-4');
    });

    it('applies lg gap', () => {
      const classes = groupVariants({ gap: 'lg' });
      expect(classes).toContain('gap-6');
    });

    it('applies xl gap', () => {
      const classes = groupVariants({ gap: 'xl' });
      expect(classes).toContain('gap-8');
    });
  });

  describe('align variants', () => {
    it('applies start alignment', () => {
      const classes = groupVariants({ align: 'start' });
      expect(classes).toContain('items-start');
    });

    it('applies center alignment', () => {
      const classes = groupVariants({ align: 'center' });
      expect(classes).toContain('items-center');
    });

    it('applies end alignment', () => {
      const classes = groupVariants({ align: 'end' });
      expect(classes).toContain('items-end');
    });

    it('applies baseline alignment', () => {
      const classes = groupVariants({ align: 'baseline' });
      expect(classes).toContain('items-baseline');
    });
  });

  describe('grow variant', () => {
    it('applies grow styles when true', () => {
      const classes = groupVariants({ grow: true });
      expect(classes).toContain('[&>*]:flex-1');
    });

    it('does not apply grow styles when false', () => {
      const classes = groupVariants({ grow: false });
      expect(classes).not.toContain('[&>*]:flex-1');
    });
  });

  describe('preventGrow variant', () => {
    it('applies preventGrow styles when true', () => {
      const classes = groupVariants({ preventGrow: true });
      expect(classes).toContain('[&>*]:flex-none');
    });

    it('does not apply preventGrow styles when false', () => {
      const classes = groupVariants({ preventGrow: false });
      expect(classes).not.toContain('[&>*]:flex-none');
    });
  });

  describe('default variants', () => {
    it('uses sm gap by default', () => {
      const classes = groupVariants();
      expect(classes).toContain('gap-2');
    });

    it('uses center alignment by default', () => {
      const classes = groupVariants();
      expect(classes).toContain('items-center');
    });
  });
});
