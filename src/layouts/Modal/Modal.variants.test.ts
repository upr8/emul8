import { describe, expect, it } from 'vitest';
import {
  backdropVariants,
  modalBodyVariants,
  modalContentVariants,
  modalFooterVariants,
  modalHeaderVariants,
} from './Modal.variants';

describe('backdropVariants', () => {
  it('includes base classes', () => {
    const classes = backdropVariants();
    expect(classes).toContain('fixed');
    expect(classes).toContain('inset-0');
    expect(classes).toContain('z-50');
    expect(classes).toContain('flex');
  });

  describe('animation variants', () => {
    it('applies fade animation by default with motion-safe prefix', () => {
      const classes = backdropVariants();
      expect(classes).toContain('motion-safe:animate-in');
      expect(classes).toContain('motion-safe:fade-in');
    });

    it('applies no animation when none', () => {
      const classes = backdropVariants({ animation: 'none' });
      expect(classes).not.toContain('animate-in');
    });
  });
});

describe('modalContentVariants', () => {
  it('includes base classes', () => {
    const classes = modalContentVariants();
    expect(classes).toContain('relative');
    expect(classes).toContain('bg-white');
    expect(classes).toContain('rounded-lg');
    expect(classes).toContain('shadow-xl');
  });

  describe('size variants', () => {
    it('applies sm size (expanded for i18n)', () => {
      const classes = modalContentVariants({ size: 'sm' });
      expect(classes).toContain('max-w-[460px]');
    });

    it('applies md size by default (expanded for i18n)', () => {
      const classes = modalContentVariants();
      expect(classes).toContain('max-w-[540px]');
    });

    it('applies lg size (expanded for i18n)', () => {
      const classes = modalContentVariants({ size: 'lg' });
      expect(classes).toContain('max-w-[620px]');
    });

    it('applies xl size (expanded for i18n)', () => {
      const classes = modalContentVariants({ size: 'xl' });
      expect(classes).toContain('max-w-[700px]');
    });

    it('applies 2xl size (expanded for i18n)', () => {
      const classes = modalContentVariants({ size: '2xl' });
      expect(classes).toContain('max-w-[860px]');
    });

    it('applies full size', () => {
      const classes = modalContentVariants({ size: 'full' });
      expect(classes).toContain('max-w-[calc(100vw-2rem)]');
    });
  });

  describe('animation variants', () => {
    it('applies scale animation by default with motion-safe prefix', () => {
      const classes = modalContentVariants();
      expect(classes).toContain('motion-safe:animate-in');
      expect(classes).toContain('motion-safe:zoom-in-95');
    });

    it('applies no animation when none', () => {
      const classes = modalContentVariants({ animation: 'none' });
      expect(classes).not.toContain('animate-in');
    });
  });
});

describe('modalHeaderVariants', () => {
  it('includes base classes', () => {
    const classes = modalHeaderVariants();
    expect(classes).toContain('shrink-0');
    expect(classes).toContain('border-b');
  });

  describe('padding variants', () => {
    it('applies sm padding with logical properties', () => {
      const classes = modalHeaderVariants({ padding: 'sm' });
      expect(classes).toContain('ps-4');
      expect(classes).toContain('pe-4');
      expect(classes).toContain('py-3');
    });

    it('applies md padding by default with logical properties', () => {
      const classes = modalHeaderVariants();
      expect(classes).toContain('ps-6');
      expect(classes).toContain('pe-6');
      expect(classes).toContain('py-4');
    });

    it('applies lg padding with logical properties', () => {
      const classes = modalHeaderVariants({ padding: 'lg' });
      expect(classes).toContain('ps-8');
      expect(classes).toContain('pe-8');
      expect(classes).toContain('py-5');
    });
  });
});

describe('modalBodyVariants', () => {
  it('includes base classes', () => {
    const classes = modalBodyVariants();
    expect(classes).toContain('flex-1');
    expect(classes).toContain('overflow-y-auto');
  });

  describe('padding variants', () => {
    it('applies none padding', () => {
      const classes = modalBodyVariants({ padding: 'none' });
      expect(classes).toContain('p-0');
    });

    it('applies sm padding', () => {
      const classes = modalBodyVariants({ padding: 'sm' });
      expect(classes).toContain('p-4');
    });

    it('applies md padding by default', () => {
      const classes = modalBodyVariants();
      expect(classes).toContain('p-6');
    });

    it('applies lg padding', () => {
      const classes = modalBodyVariants({ padding: 'lg' });
      expect(classes).toContain('p-8');
    });
  });
});

describe('modalFooterVariants', () => {
  it('includes base classes', () => {
    const classes = modalFooterVariants();
    expect(classes).toContain('shrink-0');
    expect(classes).toContain('border-t');
    expect(classes).toContain('flex');
    expect(classes).toContain('justify-end');
    expect(classes).toContain('gap-3');
  });

  describe('padding variants', () => {
    it('applies sm padding with logical properties', () => {
      const classes = modalFooterVariants({ padding: 'sm' });
      expect(classes).toContain('ps-4');
      expect(classes).toContain('pe-4');
      expect(classes).toContain('py-3');
    });

    it('applies md padding by default with logical properties', () => {
      const classes = modalFooterVariants();
      expect(classes).toContain('ps-6');
      expect(classes).toContain('pe-6');
      expect(classes).toContain('py-4');
    });

    it('applies lg padding with logical properties', () => {
      const classes = modalFooterVariants({ padding: 'lg' });
      expect(classes).toContain('ps-8');
      expect(classes).toContain('pe-8');
      expect(classes).toContain('py-5');
    });
  });
});
