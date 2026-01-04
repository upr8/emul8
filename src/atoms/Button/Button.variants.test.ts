import { describe, expect, it } from 'vitest';
import { buttonVariants } from './Button.variants';

describe('buttonVariants', () => {
  describe('base styles', () => {
    it('includes base button styles', () => {
      const classes = buttonVariants();
      expect(classes).toContain('inline-flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('justify-center');
      expect(classes).toContain('rounded-lg');
      expect(classes).toContain('font-medium');
      expect(classes).toContain('cursor-pointer');
    });
  });

  describe('variant styles', () => {
    it('applies primary variant styles', () => {
      const classes = buttonVariants({ variant: 'primary' });
      expect(classes).toContain('bg-gray-950');
      expect(classes).toContain('text-white');
    });

    it('applies secondary variant styles', () => {
      const classes = buttonVariants({ variant: 'secondary' });
      expect(classes).toContain('bg-gray-500');
      expect(classes).toContain('text-white');
    });

    it('applies danger variant styles', () => {
      const classes = buttonVariants({ variant: 'danger' });
      expect(classes).toContain('bg-red-600');
      expect(classes).toContain('text-white');
    });

    it('applies success variant styles', () => {
      const classes = buttonVariants({ variant: 'success' });
      expect(classes).toContain('bg-green-700');
      expect(classes).toContain('text-white');
    });

    it('applies ghost variant styles', () => {
      const classes = buttonVariants({ variant: 'ghost' });
      expect(classes).toContain('bg-transparent');
    });

    it('applies outline variant styles', () => {
      const classes = buttonVariants({ variant: 'outline' });
      expect(classes).toContain('border-gray-300');
      expect(classes).toContain('bg-transparent');
    });
  });

  describe('size styles', () => {
    it('applies sm size styles', () => {
      const classes = buttonVariants({ size: 'sm' });
      expect(classes).toContain('px-3');
      expect(classes).toContain('py-1.5');
      expect(classes).toContain('text-sm');
    });

    it('applies md size styles', () => {
      const classes = buttonVariants({ size: 'md' });
      expect(classes).toContain('px-5');
      expect(classes).toContain('py-2.5');
      expect(classes).toContain('text-base');
    });

    it('applies lg size styles', () => {
      const classes = buttonVariants({ size: 'lg' });
      expect(classes).toContain('px-6');
      expect(classes).toContain('py-3');
      expect(classes).toContain('text-lg');
    });

    it('applies icon size styles', () => {
      const classes = buttonVariants({ size: 'icon' });
      expect(classes).toContain('p-2.5');
      expect(classes).toContain('min-w-[40px]');
    });
  });

  describe('fullWidth', () => {
    it('applies full width when true', () => {
      const classes = buttonVariants({ fullWidth: true });
      expect(classes).toContain('w-full');
    });

    it('does not apply full width when false', () => {
      const classes = buttonVariants({ fullWidth: false });
      expect(classes).not.toContain('w-full');
    });
  });

  describe('default variants', () => {
    it('uses primary variant by default', () => {
      const classes = buttonVariants();
      expect(classes).toContain('bg-gray-950');
    });

    it('uses md size by default', () => {
      const classes = buttonVariants();
      expect(classes).toContain('px-5');
    });
  });
});
