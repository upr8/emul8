import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Cover } from './Cover';

describe('Cover', () => {
  it('renders children correctly', () => {
    render(<Cover>Main content</Cover>);
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Cover ref={ref}>Content</Cover>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(
      <Cover className="custom-class" data-testid="cover">
        Content
      </Cover>
    );
    expect(screen.getByTestId('cover')).toHaveClass('custom-class');
  });

  it('applies default minHeight of 100vh', () => {
    render(<Cover data-testid="cover">Content</Cover>);
    expect(screen.getByTestId('cover')).toHaveStyle({ minHeight: '100vh' });
  });

  it('applies custom minHeight', () => {
    render(
      <Cover minHeight="50vh" data-testid="cover">
        Content
      </Cover>
    );
    expect(screen.getByTestId('cover')).toHaveStyle({ minHeight: '50vh' });
  });

  it('applies gap variant', () => {
    render(
      <Cover gap="lg" data-testid="cover">
        Content
      </Cover>
    );
    expect(screen.getByTestId('cover')).toHaveClass('gap-6');
  });

  it('applies noPad variant', () => {
    render(
      <Cover noPad data-testid="cover">
        Content
      </Cover>
    );
    expect(screen.getByTestId('cover')).toHaveClass('p-0');
  });

  it('centers children vertically with my-auto', () => {
    render(
      <Cover data-testid="cover">
        <span>Main content</span>
      </Cover>
    );
    const cover = screen.getByTestId('cover');
    const mainWrapper = cover.querySelector('.my-auto');
    expect(mainWrapper).toBeInTheDocument();
  });

  describe('top slot', () => {
    it('renders top content', () => {
      render(<Cover top={<header>Header content</header>}>Main content</Cover>);
      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('renders top before main content', () => {
      render(
        <Cover top={<div data-testid="top">Top</div>} data-testid="cover">
          <div data-testid="main">Main</div>
        </Cover>
      );
      const cover = screen.getByTestId('cover');
      const children = Array.from(cover.children);
      const topIndex = children.findIndex((el) => el.querySelector('[data-testid="top"]'));
      const mainIndex = children.findIndex((el) => el.querySelector('[data-testid="main"]'));
      expect(topIndex).toBeLessThan(mainIndex);
    });

    it('does not render top wrapper when top is undefined', () => {
      render(<Cover data-testid="cover">Main content</Cover>);
      const cover = screen.getByTestId('cover');
      expect(cover.children.length).toBe(1);
    });
  });

  describe('bottom slot', () => {
    it('renders bottom content', () => {
      render(<Cover bottom={<footer>Footer content</footer>}>Main content</Cover>);
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('renders bottom after main content', () => {
      render(
        <Cover bottom={<div data-testid="bottom">Bottom</div>} data-testid="cover">
          <div data-testid="main">Main</div>
        </Cover>
      );
      const cover = screen.getByTestId('cover');
      const children = Array.from(cover.children);
      const mainIndex = children.findIndex((el) => el.querySelector('[data-testid="main"]'));
      const bottomIndex = children.findIndex((el) => el.querySelector('[data-testid="bottom"]'));
      expect(mainIndex).toBeLessThan(bottomIndex);
    });

    it('does not render bottom wrapper when bottom is undefined', () => {
      render(<Cover data-testid="cover">Main content</Cover>);
      const cover = screen.getByTestId('cover');
      expect(cover.children.length).toBe(1);
    });
  });

  it('renders all three sections together', () => {
    render(
      <Cover
        top={<div data-testid="top">Top</div>}
        bottom={<div data-testid="bottom">Bottom</div>}
        data-testid="cover"
      >
        <div data-testid="main">Main</div>
      </Cover>
    );
    const cover = screen.getByTestId('cover');
    expect(cover.children.length).toBe(3);
    expect(screen.getByTestId('top')).toBeInTheDocument();
    expect(screen.getByTestId('main')).toBeInTheDocument();
    expect(screen.getByTestId('bottom')).toBeInTheDocument();
  });

  it('merges custom style with minHeight', () => {
    render(
      <Cover style={{ padding: '20px' }} minHeight="80vh" data-testid="cover">
        Content
      </Cover>
    );
    const cover = screen.getByTestId('cover');
    expect(cover).toHaveStyle({ padding: '20px', minHeight: '80vh' });
  });

  it('passes through additional HTML attributes', () => {
    render(
      <Cover data-testid="cover-test" aria-label="cover">
        Content
      </Cover>
    );
    expect(screen.getByTestId('cover-test')).toHaveAttribute('aria-label', 'cover');
  });

  it('has correct displayName', () => {
    expect(Cover.displayName).toBe('Cover');
  });
});
