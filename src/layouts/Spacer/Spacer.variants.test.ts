import { describe, expect, it } from 'vitest';
import { spacerVariants } from './Spacer.variants';

describe('spacerVariants', () => {
  describe('size variants', () => {
    it('applies auto size (flex-grow)', () => {
      const classes = spacerVariants({ size: 'auto' });
      expect(classes).toContain('flex-grow');
    });

    it('applies xs size', () => {
      const classes = spacerVariants({ size: 'xs' });
      expect(classes).toContain('flex-none');
      expect(classes).toContain('w-1');
      expect(classes).toContain('h-1');
    });

    it('applies sm size', () => {
      const classes = spacerVariants({ size: 'sm' });
      expect(classes).toContain('flex-none');
      expect(classes).toContain('w-2');
      expect(classes).toContain('h-2');
    });

    it('applies md size', () => {
      const classes = spacerVariants({ size: 'md' });
      expect(classes).toContain('flex-none');
      expect(classes).toContain('w-4');
      expect(classes).toContain('h-4');
    });

    it('applies lg size', () => {
      const classes = spacerVariants({ size: 'lg' });
      expect(classes).toContain('flex-none');
      expect(classes).toContain('w-6');
      expect(classes).toContain('h-6');
    });

    it('applies xl size', () => {
      const classes = spacerVariants({ size: 'xl' });
      expect(classes).toContain('flex-none');
      expect(classes).toContain('w-8');
      expect(classes).toContain('h-8');
    });
  });

  describe('default variants', () => {
    it('uses auto size by default', () => {
      const classes = spacerVariants();
      expect(classes).toContain('flex-grow');
    });
  });
});
