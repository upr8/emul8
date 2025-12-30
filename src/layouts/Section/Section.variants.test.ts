import { describe, expect, it } from 'vitest';
import { sectionVariants } from './Section.variants';

describe('sectionVariants', () => {
  describe('size variants', () => {
    it('applies sm size', () => {
      const classes = sectionVariants({ size: 'sm' });
      expect(classes).toContain('py-8');
    });

    it('applies md size', () => {
      const classes = sectionVariants({ size: 'md' });
      expect(classes).toContain('py-12');
    });

    it('applies lg size', () => {
      const classes = sectionVariants({ size: 'lg' });
      expect(classes).toContain('py-16');
    });

    it('applies xl size', () => {
      const classes = sectionVariants({ size: 'xl' });
      expect(classes).toContain('py-24');
    });
  });

  describe('padding variants', () => {
    it('applies none padding', () => {
      const classes = sectionVariants({ padding: 'none' });
      expect(classes).toContain('px-0');
    });

    it('applies sm padding', () => {
      const classes = sectionVariants({ padding: 'sm' });
      expect(classes).toContain('px-4');
    });

    it('applies md padding', () => {
      const classes = sectionVariants({ padding: 'md' });
      expect(classes).toContain('px-6');
    });

    it('applies lg padding', () => {
      const classes = sectionVariants({ padding: 'lg' });
      expect(classes).toContain('px-8');
    });
  });

  describe('default variants', () => {
    it('uses md size by default', () => {
      const classes = sectionVariants();
      expect(classes).toContain('py-12');
    });

    it('uses md padding by default', () => {
      const classes = sectionVariants();
      expect(classes).toContain('px-6');
    });
  });

  describe('combined variants', () => {
    it('combines size and padding', () => {
      const classes = sectionVariants({ size: 'lg', padding: 'sm' });
      expect(classes).toContain('py-16');
      expect(classes).toContain('px-4');
    });
  });
});
