import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SimpleGrid } from './SimpleGrid';

describe('SimpleGrid', () => {
  it('renders children', () => {
    render(
      <SimpleGrid>
        <div>Child 1</div>
        <div>Child 2</div>
      </SimpleGrid>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('applies grid class', () => {
    render(<SimpleGrid data-testid="grid">Content</SimpleGrid>);
    expect(screen.getByTestId('grid')).toHaveClass('grid');
  });

  it('applies fixed columns', () => {
    render(
      <SimpleGrid columns="3" data-testid="grid">
        Content
      </SimpleGrid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('grid-cols-3');
  });

  it('applies responsive columns with object syntax', () => {
    render(
      <SimpleGrid columns={{ base: '1', md: '3' }} data-testid="grid">
        Content
      </SimpleGrid>
    );
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-3');
  });

  it('applies minChildWidth as inline style', () => {
    render(
      <SimpleGrid minChildWidth="200px" data-testid="grid">
        Content
      </SimpleGrid>
    );
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyle({
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
    });
  });

  it('applies gap', () => {
    render(
      <SimpleGrid gap="lg" data-testid="grid">
        Content
      </SimpleGrid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('gap-6');
  });

  it('applies responsive gap with object syntax', () => {
    render(
      <SimpleGrid gap={{ base: 'sm', md: 'lg' }} data-testid="grid">
        Content
      </SimpleGrid>
    );
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('gap-2');
    expect(grid).toHaveClass('md:gap-6');
  });

  it('applies gapX and gapY', () => {
    render(
      <SimpleGrid gapX="lg" gapY="sm" data-testid="grid">
        Content
      </SimpleGrid>
    );
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('gap-x-6');
    expect(grid).toHaveClass('gap-y-2');
  });

  it('applies custom className', () => {
    render(
      <SimpleGrid className="custom-class" data-testid="grid">
        Content
      </SimpleGrid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<SimpleGrid ref={ref}>Content</SimpleGrid>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders as Slot when asChild is true', () => {
    render(
      <SimpleGrid asChild data-testid="grid">
        <section>Content</section>
      </SimpleGrid>
    );
    expect(screen.getByTestId('grid').tagName).toBe('SECTION');
  });

  it('minChildWidth takes precedence over columns', () => {
    render(
      <SimpleGrid minChildWidth="200px" columns="3" data-testid="grid">
        Content
      </SimpleGrid>
    );
    const grid = screen.getByTestId('grid');
    // Should have minChildWidth style, not grid-cols-3
    expect(grid).toHaveStyle({
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
    });
    expect(grid).not.toHaveClass('grid-cols-3');
  });

  it('applies all gap sizes correctly', () => {
    const { rerender } = render(
      <SimpleGrid gap="none" data-testid="grid">
        Content
      </SimpleGrid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('gap-0');

    rerender(
      <SimpleGrid gap="xs" data-testid="grid">
        Content
      </SimpleGrid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('gap-1');

    rerender(
      <SimpleGrid gap="sm" data-testid="grid">
        Content
      </SimpleGrid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('gap-2');

    rerender(
      <SimpleGrid gap="md" data-testid="grid">
        Content
      </SimpleGrid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('gap-4');

    rerender(
      <SimpleGrid gap="xl" data-testid="grid">
        Content
      </SimpleGrid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('gap-8');

    rerender(
      <SimpleGrid gap="2xl" data-testid="grid">
        Content
      </SimpleGrid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('gap-10');

    rerender(
      <SimpleGrid gap="3xl" data-testid="grid">
        Content
      </SimpleGrid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('gap-12');
  });

  it('applies responsive columns with object syntax', () => {
    render(
      <SimpleGrid columns={{ base: '1', sm: '2', md: '3' }} data-testid="grid">
        Content
      </SimpleGrid>
    );
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('sm:grid-cols-2');
    expect(grid).toHaveClass('md:grid-cols-3');
  });
});
