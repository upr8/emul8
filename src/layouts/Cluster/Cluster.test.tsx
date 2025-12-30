import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Cluster } from './Cluster';

describe('Cluster', () => {
  it('renders children correctly', () => {
    render(
      <Cluster>
        <span>Item 1</span>
        <span>Item 2</span>
      </Cluster>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Cluster ref={ref}>Content</Cluster>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(
      <Cluster className="custom-class" data-testid="cluster">
        Content
      </Cluster>
    );
    expect(screen.getByTestId('cluster')).toHaveClass('custom-class');
  });

  it('applies gap variant', () => {
    render(
      <Cluster gap="lg" data-testid="cluster">
        Content
      </Cluster>
    );
    expect(screen.getByTestId('cluster')).toHaveClass('gap-6');
  });

  it('applies justify variant', () => {
    render(
      <Cluster justify="center" data-testid="cluster">
        Content
      </Cluster>
    );
    expect(screen.getByTestId('cluster')).toHaveClass('justify-center');
  });

  it('applies align variant', () => {
    render(
      <Cluster align="end" data-testid="cluster">
        Content
      </Cluster>
    );
    expect(screen.getByTestId('cluster')).toHaveClass('items-end');
  });

  it('combines multiple variants', () => {
    render(
      <Cluster gap="xl" justify="between" align="center" data-testid="cluster">
        Content
      </Cluster>
    );
    const cluster = screen.getByTestId('cluster');
    expect(cluster).toHaveClass('gap-8');
    expect(cluster).toHaveClass('justify-between');
    expect(cluster).toHaveClass('items-center');
  });

  describe('asChild', () => {
    it('renders as div by default', () => {
      render(
        <Cluster data-testid="cluster">
          <span>Content</span>
        </Cluster>
      );
      expect(screen.getByTestId('cluster').tagName).toBe('DIV');
    });

    it('renders as child element when asChild is true', () => {
      render(
        <Cluster asChild data-testid="cluster">
          <section>Content</section>
        </Cluster>
      );
      expect(screen.getByTestId('cluster').tagName).toBe('SECTION');
    });

    it('merges className with child when asChild is true', () => {
      render(
        <Cluster asChild gap="lg" data-testid="cluster">
          <nav className="nav-class">Content</nav>
        </Cluster>
      );
      const element = screen.getByTestId('cluster');
      expect(element).toHaveClass('gap-6');
      expect(element).toHaveClass('nav-class');
    });
  });

  it('passes through additional HTML attributes', () => {
    render(
      <Cluster data-testid="cluster-test" aria-label="cluster">
        Content
      </Cluster>
    );
    expect(screen.getByTestId('cluster-test')).toHaveAttribute('aria-label', 'cluster');
  });

  it('has correct displayName', () => {
    expect(Cluster.displayName).toBe('Cluster');
  });
});
