import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Reel } from './Reel';

describe('Reel', () => {
  it('renders children correctly', () => {
    render(
      <Reel>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Reel>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Reel ref={ref}>
        <div>Content</div>
      </Reel>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(
      <Reel className="custom-class" data-testid="reel">
        <div>Content</div>
      </Reel>
    );
    expect(screen.getByTestId('reel')).toHaveClass('custom-class');
  });

  it('applies base classes', () => {
    render(
      <Reel data-testid="reel">
        <div>Content</div>
      </Reel>
    );
    const reel = screen.getByTestId('reel');
    expect(reel).toHaveClass('flex');
    expect(reel).toHaveClass('overflow-x-auto');
    expect(reel).toHaveClass('overflow-y-hidden');
  });

  it('applies gap variant', () => {
    render(
      <Reel gap="lg" data-testid="reel">
        <div>Content</div>
      </Reel>
    );
    expect(screen.getByTestId('reel')).toHaveClass('gap-6');
  });

  describe('noBar prop', () => {
    it('shows scrollbar by default', () => {
      render(
        <Reel data-testid="reel">
          <div>Content</div>
        </Reel>
      );
      expect(screen.getByTestId('reel')).toHaveClass('pb-2');
    });

    it('hides scrollbar when noBar is true', () => {
      render(
        <Reel noBar data-testid="reel">
          <div>Content</div>
        </Reel>
      );
      expect(screen.getByTestId('reel')).toHaveClass('scrollbar-none');
    });
  });

  describe('height prop', () => {
    it('uses auto height by default', () => {
      render(
        <Reel data-testid="reel">
          <div>Content</div>
        </Reel>
      );
      expect(screen.getByTestId('reel')).toHaveStyle({ height: 'auto' });
    });

    it('applies custom height', () => {
      render(
        <Reel height="200px" data-testid="reel">
          <div>Content</div>
        </Reel>
      );
      expect(screen.getByTestId('reel')).toHaveStyle({ height: '200px' });
    });
  });

  describe('itemWidth prop', () => {
    it('wraps children with auto flex basis by default', () => {
      render(
        <Reel data-testid="reel">
          <div data-testid="item">Content</div>
        </Reel>
      );
      const item = screen.getByTestId('item');
      expect(item.parentElement).toHaveStyle({ flex: '0 0 auto' });
    });

    it('wraps children with custom flex basis when itemWidth is set', () => {
      render(
        <Reel itemWidth="300px" data-testid="reel">
          <div data-testid="item">Content</div>
        </Reel>
      );
      const item = screen.getByTestId('item');
      expect(item.parentElement).toHaveStyle({ flex: '0 0 300px' });
    });

    it('applies itemWidth to all children', () => {
      render(
        <Reel itemWidth="250px">
          <div data-testid="item1">Item 1</div>
          <div data-testid="item2">Item 2</div>
        </Reel>
      );
      expect(screen.getByTestId('item1').parentElement).toHaveStyle({ flex: '0 0 250px' });
      expect(screen.getByTestId('item2').parentElement).toHaveStyle({ flex: '0 0 250px' });
    });
  });

  it('wraps each child in a div', () => {
    render(
      <Reel data-testid="reel">
        <span data-testid="child1">Item 1</span>
        <span data-testid="child2">Item 2</span>
      </Reel>
    );
    const child1 = screen.getByTestId('child1');
    const child2 = screen.getByTestId('child2');
    expect(child1.parentElement?.tagName).toBe('DIV');
    expect(child2.parentElement?.tagName).toBe('DIV');
  });

  it('merges custom style with height', () => {
    render(
      <Reel style={{ margin: '10px' }} height="150px" data-testid="reel">
        <div>Content</div>
      </Reel>
    );
    const reel = screen.getByTestId('reel');
    expect(reel.style.margin).toBe('10px');
    expect(reel.style.height).toBe('150px');
  });

  it('passes through additional HTML attributes', () => {
    render(
      <Reel data-testid="reel-test" aria-label="carousel">
        <div>Content</div>
      </Reel>
    );
    expect(screen.getByTestId('reel-test')).toHaveAttribute('aria-label', 'carousel');
  });

  it('has correct displayName', () => {
    expect(Reel.displayName).toBe('Reel');
  });

  describe('accessibility', () => {
    it('has role="region"', () => {
      render(
        <Reel data-testid="reel">
          <div>Content</div>
        </Reel>
      );
      expect(screen.getByTestId('reel')).toHaveAttribute('role', 'region');
    });

    it('has tabIndex={0} for keyboard focus', () => {
      render(
        <Reel data-testid="reel">
          <div>Content</div>
        </Reel>
      );
      expect(screen.getByTestId('reel')).toHaveAttribute('tabindex', '0');
    });

    it('scrolls left on ArrowLeft key', () => {
      const scrollBySpy = vi.fn();
      render(
        <Reel data-testid="reel">
          <div>Content</div>
        </Reel>
      );
      const reel = screen.getByTestId('reel');
      reel.scrollBy = scrollBySpy;
      fireEvent.keyDown(reel, { key: 'ArrowLeft' });
      expect(scrollBySpy).toHaveBeenCalledWith({ left: -200, behavior: 'smooth' });
    });

    it('scrolls right on ArrowRight key', () => {
      const scrollBySpy = vi.fn();
      render(
        <Reel data-testid="reel">
          <div>Content</div>
        </Reel>
      );
      const reel = screen.getByTestId('reel');
      reel.scrollBy = scrollBySpy;
      fireEvent.keyDown(reel, { key: 'ArrowRight' });
      expect(scrollBySpy).toHaveBeenCalledWith({ left: 200, behavior: 'smooth' });
    });

    it('respects custom scrollAmount', () => {
      const scrollBySpy = vi.fn();
      render(
        <Reel scrollAmount={100} data-testid="reel">
          <div>Content</div>
        </Reel>
      );
      const reel = screen.getByTestId('reel');
      reel.scrollBy = scrollBySpy;
      fireEvent.keyDown(reel, { key: 'ArrowRight' });
      expect(scrollBySpy).toHaveBeenCalledWith({ left: 100, behavior: 'smooth' });
    });

    it('calls custom onKeyDown handler', () => {
      const onKeyDown = vi.fn();
      render(
        <Reel onKeyDown={onKeyDown} data-testid="reel">
          <div>Content</div>
        </Reel>
      );
      fireEvent.keyDown(screen.getByTestId('reel'), { key: 'ArrowRight' });
      expect(onKeyDown).toHaveBeenCalled();
    });

    it('does not scroll on non-arrow keys', () => {
      const scrollBySpy = vi.fn();
      render(
        <Reel data-testid="reel">
          <div>Content</div>
        </Reel>
      );
      const reel = screen.getByTestId('reel');
      reel.scrollBy = scrollBySpy;
      fireEvent.keyDown(reel, { key: 'Enter' });
      expect(scrollBySpy).not.toHaveBeenCalled();
    });
  });
});
