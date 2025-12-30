import { describe, expect, it } from 'vitest';
import { boxVariants } from './Box.variants';

describe('boxVariants', () => {
  describe('padding styles', () => {
    it('applies none padding', () => {
      const classes = boxVariants({ padding: 'none' });
      expect(classes).toContain('p-0');
    });

    it('applies xs padding', () => {
      const classes = boxVariants({ padding: 'xs' });
      expect(classes).toContain('p-1');
    });

    it('applies sm padding', () => {
      const classes = boxVariants({ padding: 'sm' });
      expect(classes).toContain('p-2');
    });

    it('applies md padding', () => {
      const classes = boxVariants({ padding: 'md' });
      expect(classes).toContain('p-4');
    });

    it('applies lg padding', () => {
      const classes = boxVariants({ padding: 'lg' });
      expect(classes).toContain('p-6');
    });

    it('applies xl padding', () => {
      const classes = boxVariants({ padding: 'xl' });
      expect(classes).toContain('p-8');
    });
  });

  describe('borderWidth styles', () => {
    it('applies none borderWidth', () => {
      const classes = boxVariants({ borderWidth: 'none' });
      expect(classes).toContain('border-0');
    });

    it('applies thin borderWidth', () => {
      const classes = boxVariants({ borderWidth: 'thin' });
      expect(classes).toContain('border');
    });

    it('applies medium borderWidth', () => {
      const classes = boxVariants({ borderWidth: 'medium' });
      expect(classes).toContain('border-2');
    });

    it('applies thick borderWidth', () => {
      const classes = boxVariants({ borderWidth: 'thick' });
      expect(classes).toContain('border-4');
    });
  });

  describe('default variants', () => {
    it('uses md padding by default', () => {
      const classes = boxVariants();
      expect(classes).toContain('p-4');
    });

    it('uses none borderWidth by default', () => {
      const classes = boxVariants();
      expect(classes).toContain('border-0');
    });
  });

  describe('combined variants', () => {
    it('combines padding and borderWidth', () => {
      const classes = boxVariants({ padding: 'lg', borderWidth: 'thick' });
      expect(classes).toContain('p-6');
      expect(classes).toContain('border-4');
    });
  });
});
