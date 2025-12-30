import { describe, expect, it } from 'vitest';
import {
  appShellSidebarVariants,
  appShellVariants,
  footerVariants,
  headerVariants,
  mainVariants,
} from './AppShell.variants';

describe('appShellVariants', () => {
  it('includes base classes', () => {
    const classes = appShellVariants();
    expect(classes).toContain('min-h-screen');
    expect(classes).toContain('flex');
    expect(classes).toContain('flex-col');
  });

  describe('layout variants', () => {
    it('applies default layout', () => {
      const classes = appShellVariants({ layout: 'default' });
      expect(classes).toContain('min-h-screen');
    });

    it('applies centered layout', () => {
      const classes = appShellVariants({ layout: 'centered' });
      expect(classes).toContain('[&>main]:mx-auto');
      expect(classes).toContain('[&>main]:w-full');
    });
  });
});

describe('headerVariants', () => {
  it('includes base classes', () => {
    const classes = headerVariants();
    expect(classes).toContain('shrink-0');
    expect(classes).toContain('border-b');
  });

  describe('height variants', () => {
    it('applies sm height', () => {
      const classes = headerVariants({ height: 'sm' });
      expect(classes).toContain('h-12');
    });

    it('applies md height', () => {
      const classes = headerVariants({ height: 'md' });
      expect(classes).toContain('h-14');
    });

    it('applies lg height', () => {
      const classes = headerVariants({ height: 'lg' });
      expect(classes).toContain('h-16');
    });
  });

  describe('sticky variant', () => {
    it('applies sticky when true', () => {
      const classes = headerVariants({ sticky: true });
      expect(classes).toContain('sticky');
      expect(classes).toContain('top-0');
      expect(classes).toContain('z-40');
    });

    it('does not apply sticky when false', () => {
      const classes = headerVariants({ sticky: false });
      expect(classes).not.toContain('sticky');
    });
  });

  describe('default variants', () => {
    it('uses md height by default', () => {
      const classes = headerVariants();
      expect(classes).toContain('h-14');
    });

    it('is sticky by default', () => {
      const classes = headerVariants();
      expect(classes).toContain('sticky');
    });
  });
});

describe('appShellSidebarVariants', () => {
  it('includes base classes', () => {
    const classes = appShellSidebarVariants();
    expect(classes).toContain('shrink-0');
    expect(classes).toContain('border-r');
    expect(classes).toContain('overflow-y-auto');
  });

  describe('width variants', () => {
    it('applies sm width', () => {
      const classes = appShellSidebarVariants({ width: 'sm' });
      expect(classes).toContain('w-48');
    });

    it('applies md width', () => {
      const classes = appShellSidebarVariants({ width: 'md' });
      expect(classes).toContain('w-64');
    });

    it('applies lg width', () => {
      const classes = appShellSidebarVariants({ width: 'lg' });
      expect(classes).toContain('w-80');
    });
  });

  describe('position variants', () => {
    it('applies left position', () => {
      const classes = appShellSidebarVariants({ position: 'left' });
      expect(classes).toContain('order-first');
    });

    it('applies right position', () => {
      const classes = appShellSidebarVariants({ position: 'right' });
      expect(classes).toContain('order-last');
      expect(classes).toContain('border-l');
    });
  });

  describe('default variants', () => {
    it('uses md width by default', () => {
      const classes = appShellSidebarVariants();
      expect(classes).toContain('w-64');
    });

    it('uses left position by default', () => {
      const classes = appShellSidebarVariants();
      expect(classes).toContain('order-first');
    });
  });
});

describe('mainVariants', () => {
  it('includes base classes', () => {
    const classes = mainVariants();
    expect(classes).toContain('flex-1');
    expect(classes).toContain('overflow-auto');
  });

  describe('padding variants', () => {
    it('applies none padding', () => {
      const classes = mainVariants({ padding: 'none' });
      expect(classes).toContain('p-0');
    });

    it('applies sm padding', () => {
      const classes = mainVariants({ padding: 'sm' });
      expect(classes).toContain('p-4');
    });

    it('applies md padding', () => {
      const classes = mainVariants({ padding: 'md' });
      expect(classes).toContain('p-6');
    });

    it('applies lg padding', () => {
      const classes = mainVariants({ padding: 'lg' });
      expect(classes).toContain('p-8');
    });
  });

  describe('maxWidth variants', () => {
    it('applies no maxWidth', () => {
      const classes = mainVariants({ maxWidth: 'none' });
      expect(classes).not.toContain('max-w-');
    });

    it('applies sm maxWidth', () => {
      const classes = mainVariants({ maxWidth: 'sm' });
      expect(classes).toContain('max-w-screen-sm');
    });

    it('applies lg maxWidth', () => {
      const classes = mainVariants({ maxWidth: 'lg' });
      expect(classes).toContain('max-w-screen-lg');
    });

    it('applies 2xl maxWidth', () => {
      const classes = mainVariants({ maxWidth: '2xl' });
      expect(classes).toContain('max-w-screen-2xl');
    });
  });

  describe('default variants', () => {
    it('uses md padding by default', () => {
      const classes = mainVariants();
      expect(classes).toContain('p-6');
    });

    it('uses no maxWidth by default', () => {
      const classes = mainVariants();
      expect(classes).not.toContain('max-w-screen');
    });
  });
});

describe('footerVariants', () => {
  it('includes base classes', () => {
    const classes = footerVariants();
    expect(classes).toContain('shrink-0');
    expect(classes).toContain('border-t');
  });

  describe('padding variants', () => {
    it('applies sm padding', () => {
      const classes = footerVariants({ padding: 'sm' });
      expect(classes).toContain('py-4');
      expect(classes).toContain('px-4');
    });

    it('applies md padding', () => {
      const classes = footerVariants({ padding: 'md' });
      expect(classes).toContain('py-6');
      expect(classes).toContain('px-6');
    });

    it('applies lg padding', () => {
      const classes = footerVariants({ padding: 'lg' });
      expect(classes).toContain('py-8');
      expect(classes).toContain('px-8');
    });
  });

  describe('default variants', () => {
    it('uses md padding by default', () => {
      const classes = footerVariants();
      expect(classes).toContain('py-6');
      expect(classes).toContain('px-6');
    });
  });
});
