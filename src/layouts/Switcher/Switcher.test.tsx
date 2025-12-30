import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Switcher } from './Switcher';

describe('Switcher', () => {
  it('renders children correctly', () => {
    render(
      <Switcher>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Switcher>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Switcher ref={ref}>
        <div>Content</div>
      </Switcher>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(
      <Switcher className="custom-class" data-testid="switcher">
        <div>Content</div>
      </Switcher>
    );
    expect(screen.getByTestId('switcher')).toHaveClass('custom-class');
  });

  it('applies base classes', () => {
    render(
      <Switcher data-testid="switcher">
        <div>Content</div>
      </Switcher>
    );
    const switcher = screen.getByTestId('switcher');
    expect(switcher).toHaveClass('flex');
    expect(switcher).toHaveClass('flex-wrap');
  });

  it('applies gap variant', () => {
    render(
      <Switcher gap="lg" data-testid="switcher">
        <div>Content</div>
      </Switcher>
    );
    expect(screen.getByTestId('switcher')).toHaveClass('gap-6');
  });

  describe('threshold prop', () => {
    it('applies default threshold of 30rem', () => {
      render(
        <Switcher>
          <div data-testid="item">Content</div>
        </Switcher>
      );
      const itemWrapper = screen.getByTestId('item').parentElement;
      expect(itemWrapper).toHaveStyle({
        flexBasis: 'calc((30rem - 100%) * 999)',
        flexGrow: 1,
      });
    });

    it('applies custom threshold', () => {
      render(
        <Switcher threshold="40rem">
          <div data-testid="item">Content</div>
        </Switcher>
      );
      const itemWrapper = screen.getByTestId('item').parentElement;
      expect(itemWrapper).toHaveStyle({
        flexBasis: 'calc((40rem - 100%) * 999)',
      });
    });

    it('applies threshold to all children', () => {
      render(
        <Switcher threshold="500px">
          <div data-testid="item1">Item 1</div>
          <div data-testid="item2">Item 2</div>
        </Switcher>
      );
      expect(screen.getByTestId('item1').parentElement).toHaveStyle({
        flexBasis: 'calc((500px - 100%) * 999)',
      });
      expect(screen.getByTestId('item2').parentElement).toHaveStyle({
        flexBasis: 'calc((500px - 100%) * 999)',
      });
    });
  });

  describe('limit prop', () => {
    it('does not force vertical when children count is within limit', () => {
      render(
        <Switcher limit={3}>
          <div data-testid="item1">Item 1</div>
          <div data-testid="item2">Item 2</div>
          <div data-testid="item3">Item 3</div>
        </Switcher>
      );
      const itemWrapper = screen.getByTestId('item1').parentElement;
      expect(itemWrapper).toHaveStyle({
        flexBasis: 'calc((30rem - 100%) * 999)',
      });
    });

    it('forces vertical layout when children exceed limit', () => {
      render(
        <Switcher limit={2}>
          <div data-testid="item1">Item 1</div>
          <div data-testid="item2">Item 2</div>
          <div data-testid="item3">Item 3</div>
        </Switcher>
      );
      const itemWrapper = screen.getByTestId('item1').parentElement;
      expect(itemWrapper).toHaveStyle({
        flexBasis: '100%',
        flexGrow: 1,
      });
    });

    it('applies vertical layout to all children when exceeding limit', () => {
      render(
        <Switcher limit={1}>
          <div data-testid="item1">Item 1</div>
          <div data-testid="item2">Item 2</div>
        </Switcher>
      );
      expect(screen.getByTestId('item1').parentElement).toHaveStyle({
        flexBasis: '100%',
      });
      expect(screen.getByTestId('item2').parentElement).toHaveStyle({
        flexBasis: '100%',
      });
    });

    it('uses normal layout when limit is undefined', () => {
      render(
        <Switcher>
          <div data-testid="item">Item</div>
        </Switcher>
      );
      const itemWrapper = screen.getByTestId('item').parentElement;
      expect(itemWrapper).toHaveStyle({
        flexBasis: 'calc((30rem - 100%) * 999)',
      });
    });
  });

  it('wraps each child in a div', () => {
    render(
      <Switcher>
        <span data-testid="child1">Item 1</span>
        <span data-testid="child2">Item 2</span>
      </Switcher>
    );
    expect(screen.getByTestId('child1').parentElement?.tagName).toBe('DIV');
    expect(screen.getByTestId('child2').parentElement?.tagName).toBe('DIV');
  });

  it('merges custom style', () => {
    render(
      <Switcher style={{ margin: '15px' }} data-testid="switcher">
        <div>Content</div>
      </Switcher>
    );
    expect(screen.getByTestId('switcher').style.margin).toBe('15px');
  });

  it('passes through additional HTML attributes', () => {
    render(
      <Switcher data-testid="switcher-test" aria-label="switcher">
        <div>Content</div>
      </Switcher>
    );
    expect(screen.getByTestId('switcher-test')).toHaveAttribute('aria-label', 'switcher');
  });

  it('has correct displayName', () => {
    expect(Switcher.displayName).toBe('Switcher');
  });
});
