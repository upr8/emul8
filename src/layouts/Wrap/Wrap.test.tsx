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

describe('Wrap responsive gap', () => {
  it('applies responsive gap with object syntax', () => {
    render(
      <Wrap gap={{ base: 'sm', md: 'md', lg: 'lg' }} data-testid="wrap">
        Content
      </Wrap>
    );
    const element = screen.getByTestId('wrap');
    expect(element).toHaveClass('gap-2');
    expect(element).toHaveClass('md:gap-4');
    expect(element).toHaveClass('lg:gap-6');
  });

  it('applies responsive gap with only breakpoint values', () => {
    render(
      <Wrap gap={{ md: 'md', xl: 'xl' }} data-testid="wrap">
        Content
      </Wrap>
    );
    const element = screen.getByTestId('wrap');
    expect(element).toHaveClass('md:gap-4');
    expect(element).toHaveClass('xl:gap-8');
  });

  it('combines responsive gap with other variants', () => {
    render(
      <Wrap gap={{ base: 'xs', lg: 'sm' }} align="start" justify="center" data-testid="wrap">
        Content
      </Wrap>
    );
    const element = screen.getByTestId('wrap');
    expect(element).toHaveClass('items-start');
    expect(element).toHaveClass('justify-center');
    expect(element).toHaveClass('gap-1');
    expect(element).toHaveClass('lg:gap-2');
  });

  it('combines responsive gap with asChild', () => {
    render(
      <Wrap asChild gap={{ base: 'sm', md: 'md' }} data-testid="wrap">
        <ul>Content</ul>
      </Wrap>
    );
    const element = screen.getByTestId('wrap');
    expect(element.tagName).toBe('UL');
    expect(element).toHaveClass('gap-2');
    expect(element).toHaveClass('md:gap-4');
  });
});

describe('Wrap gapX/gapY', () => {
  it('applies gapX', () => {
    render(
      <Wrap gapX="lg" data-testid="wrap">
        Content
      </Wrap>
    );
    expect(screen.getByTestId('wrap')).toHaveClass('gap-x-6');
  });

  it('applies gapY', () => {
    render(
      <Wrap gapY="sm" data-testid="wrap">
        Content
      </Wrap>
    );
    expect(screen.getByTestId('wrap')).toHaveClass('gap-y-2');
  });

  it('applies both gapX and gapY', () => {
    render(
      <Wrap gapX="lg" gapY="sm" data-testid="wrap">
        Content
      </Wrap>
    );
    const element = screen.getByTestId('wrap');
    expect(element).toHaveClass('gap-x-6');
    expect(element).toHaveClass('gap-y-2');
  });

  it('applies responsive object gap', () => {
    render(
      <Wrap gap={{ base: 'sm', md: 'lg' }} data-testid="wrap">
        Content
      </Wrap>
    );
    const element = screen.getByTestId('wrap');
    expect(element).toHaveClass('gap-2');
    expect(element).toHaveClass('md:gap-6');
  });
});
