import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Wrap } from './Wrap';

describe('Wrap', () => {
  it('renders children correctly', () => {
    render(<Wrap>Test content</Wrap>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Wrap ref={ref}>Content</Wrap>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(<Wrap className="custom-class">Content</Wrap>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });

  it('applies flex-wrap by default', () => {
    render(<Wrap>Content</Wrap>);
    const element = screen.getByText('Content');
    expect(element).toHaveClass('flex');
    expect(element).toHaveClass('flex-wrap');
  });

  it('applies gap variant', () => {
    render(<Wrap gap="lg">Content</Wrap>);
    expect(screen.getByText('Content')).toHaveClass('gap-6');
  });

  it('applies align variant', () => {
    render(<Wrap align="start">Content</Wrap>);
    expect(screen.getByText('Content')).toHaveClass('items-start');
  });

  it('applies justify variant', () => {
    render(<Wrap justify="center">Content</Wrap>);
    expect(screen.getByText('Content')).toHaveClass('justify-center');
  });

  it('renders as child element with asChild', () => {
    render(
      <Wrap asChild>
        <nav>Content</nav>
      </Wrap>
    );
    expect(screen.getByText('Content').tagName).toBe('NAV');
  });

  it('combines multiple variants', () => {
    render(
      <Wrap gap="md" align="center" justify="center">
        Content
      </Wrap>
    );
    const element = screen.getByText('Content');
    expect(element).toHaveClass('gap-4');
    expect(element).toHaveClass('items-center');
    expect(element).toHaveClass('justify-center');
  });

  it('passes through additional HTML attributes', () => {
    render(<Wrap data-testid="wrap-test">Content</Wrap>);
    expect(screen.getByTestId('wrap-test')).toBeInTheDocument();
  });

  it('has correct displayName', () => {
    expect(Wrap.displayName).toBe('Wrap');
  });
});
