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
