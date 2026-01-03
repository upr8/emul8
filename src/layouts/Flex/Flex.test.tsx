import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Flex } from './Flex';

describe('Flex', () => {
  it('renders children correctly', () => {
    render(<Flex>Test content</Flex>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Flex ref={ref}>Content</Flex>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(<Flex className="custom-class">Content</Flex>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });

  it('applies flex display by default', () => {
    render(<Flex>Content</Flex>);
    expect(screen.getByText('Content')).toHaveClass('flex');
  });

  it('applies inline variant', () => {
    render(<Flex inline>Content</Flex>);
    expect(screen.getByText('Content')).toHaveClass('inline-flex');
  });

  it('applies direction variant', () => {
    render(<Flex direction="column">Content</Flex>);
    expect(screen.getByText('Content')).toHaveClass('flex-col');
  });

  it('applies align variant', () => {
    render(<Flex align="center">Content</Flex>);
    expect(screen.getByText('Content')).toHaveClass('items-center');
  });

  it('applies justify variant', () => {
    render(<Flex justify="between">Content</Flex>);
    expect(screen.getByText('Content')).toHaveClass('justify-between');
  });

  it('applies wrap variant', () => {
    render(<Flex wrap="wrap">Content</Flex>);
    expect(screen.getByText('Content')).toHaveClass('flex-wrap');
  });

  it('applies gap variant', () => {
    render(<Flex gap="lg">Content</Flex>);
    expect(screen.getByText('Content')).toHaveClass('gap-6');
  });

  it('renders as child element with asChild', () => {
    render(
      <Flex asChild>
        <section>Content</section>
      </Flex>
    );
    expect(screen.getByText('Content').tagName).toBe('SECTION');
  });

  it('combines multiple variants', () => {
    render(
      <Flex direction="row" align="center" justify="between" gap="md">
        Content
      </Flex>
    );
    const element = screen.getByText('Content');
    expect(element).toHaveClass('flex-row');
    expect(element).toHaveClass('items-center');
    expect(element).toHaveClass('justify-between');
    expect(element).toHaveClass('gap-4');
  });

  it('passes through additional HTML attributes', () => {
    render(<Flex data-testid="flex-test">Content</Flex>);
    expect(screen.getByTestId('flex-test')).toBeInTheDocument();
  });

  it('has correct displayName', () => {
    expect(Flex.displayName).toBe('Flex');
  });
});

describe('Flex responsive gap', () => {
  it('applies responsive gap with object syntax', () => {
    render(
      <Flex gap={{ base: 'sm', md: 'md', lg: 'lg' }} data-testid="flex">
        Content
      </Flex>
    );
    const element = screen.getByTestId('flex');
    expect(element).toHaveClass('gap-2');
    expect(element).toHaveClass('md:gap-4');
    expect(element).toHaveClass('lg:gap-6');
  });

  it('applies responsive gap with only breakpoint values', () => {
    render(
      <Flex gap={{ md: 'md', xl: 'xl' }} data-testid="flex">
        Content
      </Flex>
    );
    const element = screen.getByTestId('flex');
    expect(element).toHaveClass('md:gap-4');
    expect(element).toHaveClass('xl:gap-8');
  });

  it('combines responsive gap with other variants', () => {
    render(
      <Flex gap={{ base: 'xs', lg: 'sm' }} direction="column" align="center" data-testid="flex">
        Content
      </Flex>
    );
    const element = screen.getByTestId('flex');
    expect(element).toHaveClass('flex-col');
    expect(element).toHaveClass('items-center');
    expect(element).toHaveClass('gap-1');
    expect(element).toHaveClass('lg:gap-2');
  });

  it('combines responsive gap with asChild', () => {
    render(
      <Flex asChild gap={{ base: 'sm', md: 'md' }} data-testid="flex">
        <nav>Content</nav>
      </Flex>
    );
    const element = screen.getByTestId('flex');
    expect(element.tagName).toBe('NAV');
    expect(element).toHaveClass('gap-2');
    expect(element).toHaveClass('md:gap-4');
  });
});

describe('Flex gapX/gapY', () => {
  it('applies gapX', () => {
    render(
      <Flex gapX="lg" data-testid="flex">
        Content
      </Flex>
    );
    expect(screen.getByTestId('flex')).toHaveClass('gap-x-6');
  });

  it('applies gapY', () => {
    render(
      <Flex gapY="sm" data-testid="flex">
        Content
      </Flex>
    );
    expect(screen.getByTestId('flex')).toHaveClass('gap-y-2');
  });

  it('applies both gapX and gapY', () => {
    render(
      <Flex gapX="lg" gapY="sm" data-testid="flex">
        Content
      </Flex>
    );
    const element = screen.getByTestId('flex');
    expect(element).toHaveClass('gap-x-6');
    expect(element).toHaveClass('gap-y-2');
  });
});
