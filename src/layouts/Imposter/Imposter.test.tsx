import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Imposter } from './Imposter';

describe('Imposter', () => {
  it('renders children correctly', () => {
    render(<Imposter>Modal content</Imposter>);
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Imposter ref={ref}>Content</Imposter>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(
      <Imposter className="custom-class" data-testid="imposter">
        Content
      </Imposter>
    );
    expect(screen.getByTestId('imposter')).toHaveClass('custom-class');
  });

  it('applies base classes', () => {
    render(<Imposter data-testid="imposter">Content</Imposter>);
    const imposter = screen.getByTestId('imposter');
    expect(imposter).toHaveClass('inset-0');
    expect(imposter).toHaveClass('flex');
    expect(imposter).toHaveClass('items-center');
    expect(imposter).toHaveClass('justify-center');
    expect(imposter).toHaveClass('overflow-auto');
  });

  describe('fixed prop', () => {
    it('applies absolute positioning by default', () => {
      render(<Imposter data-testid="imposter">Content</Imposter>);
      expect(screen.getByTestId('imposter')).toHaveClass('absolute');
    });

    it('applies absolute positioning when fixed is false', () => {
      render(
        <Imposter fixed={false} data-testid="imposter">
          Content
        </Imposter>
      );
      expect(screen.getByTestId('imposter')).toHaveClass('absolute');
    });

    it('applies fixed positioning when fixed is true', () => {
      render(
        <Imposter fixed data-testid="imposter">
          Content
        </Imposter>
      );
      expect(screen.getByTestId('imposter')).toHaveClass('fixed');
    });
  });

  describe('breakout prop', () => {
    it('applies max size constraints by default', () => {
      render(<Imposter data-testid="imposter">Content</Imposter>);
      expect(screen.getByTestId('imposter')).toHaveStyle({
        maxInlineSize: 'calc(100% - (0px * 2))',
        maxBlockSize: 'calc(100% - (0px * 2))',
      });
    });

    it('does not apply max size constraints when breakout is true', () => {
      render(
        <Imposter breakout data-testid="imposter">
          Content
        </Imposter>
      );
      const imposter = screen.getByTestId('imposter');
      // When breakout is true, maxInlineSize and maxBlockSize should not be set in inline style
      expect(imposter.style.maxInlineSize).toBe('');
      expect(imposter.style.maxBlockSize).toBe('');
    });
  });

  describe('margin prop', () => {
    it('uses 0px margin by default', () => {
      render(<Imposter data-testid="imposter">Content</Imposter>);
      expect(screen.getByTestId('imposter')).toHaveStyle({
        maxInlineSize: 'calc(100% - (0px * 2))',
        maxBlockSize: 'calc(100% - (0px * 2))',
      });
    });

    it('applies custom margin', () => {
      render(
        <Imposter margin="1rem" data-testid="imposter">
          Content
        </Imposter>
      );
      expect(screen.getByTestId('imposter')).toHaveStyle({
        maxInlineSize: 'calc(100% - (1rem * 2))',
        maxBlockSize: 'calc(100% - (1rem * 2))',
      });
    });

    it('applies pixel margin', () => {
      render(
        <Imposter margin="20px" data-testid="imposter">
          Content
        </Imposter>
      );
      expect(screen.getByTestId('imposter')).toHaveStyle({
        maxInlineSize: 'calc(100% - (20px * 2))',
        maxBlockSize: 'calc(100% - (20px * 2))',
      });
    });

    it('ignores margin when breakout is true', () => {
      render(
        <Imposter breakout margin="2rem" data-testid="imposter">
          Content
        </Imposter>
      );
      const imposter = screen.getByTestId('imposter');
      // When breakout is true, margin is ignored so maxInlineSize should not be set
      expect(imposter.style.maxInlineSize).toBe('');
    });
  });

  it('merges custom style with computed styles', () => {
    render(
      <Imposter style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} margin="1rem" data-testid="imposter">
        Content
      </Imposter>
    );
    expect(screen.getByTestId('imposter')).toHaveStyle({
      backgroundColor: 'rgba(0,0,0,0.5)',
      maxInlineSize: 'calc(100% - (1rem * 2))',
    });
  });

  it('merges style when breakout is true', () => {
    render(
      <Imposter breakout style={{ zIndex: 100 }} data-testid="imposter">
        Content
      </Imposter>
    );
    expect(screen.getByTestId('imposter')).toHaveStyle({ zIndex: 100 });
  });

  it('passes through additional HTML attributes', () => {
    render(
      <Imposter data-testid="imposter-test" aria-label="modal">
        Content
      </Imposter>
    );
    expect(screen.getByTestId('imposter-test')).toHaveAttribute('aria-label', 'modal');
  });

  it('has correct displayName', () => {
    expect(Imposter.displayName).toBe('Imposter');
  });
});
