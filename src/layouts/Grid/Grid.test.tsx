import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders children correctly', () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Grid>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Grid ref={ref}>
        <div>Content</div>
      </Grid>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(
      <Grid className="custom-class" data-testid="grid">
        <div>Content</div>
      </Grid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('custom-class');
  });

  it('applies base grid class', () => {
    render(
      <Grid data-testid="grid">
        <div>Content</div>
      </Grid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('grid');
  });

  it('applies gap variant', () => {
    render(
      <Grid gap="lg" data-testid="grid">
        <div>Content</div>
      </Grid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('gap-6');
  });

  describe('min prop', () => {
    it('applies default min of 250px', () => {
      render(
        <Grid data-testid="grid">
          <div>Content</div>
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveStyle({
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(250px, 100%), 1fr))',
      });
    });

    it('applies custom min value', () => {
      render(
        <Grid min="300px" data-testid="grid">
          <div>Content</div>
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveStyle({
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
      });
    });

    it('applies percentage min value', () => {
      render(
        <Grid min="50%" data-testid="grid">
          <div>Content</div>
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveStyle({
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(50%, 100%), 1fr))',
      });
    });
  });

  describe('columns prop', () => {
    it('applies fixed column count', () => {
      render(
        <Grid columns={3} data-testid="grid">
          <div>Content</div>
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveStyle({
        gridTemplateColumns: 'repeat(3, 1fr)',
      });
    });

    it('overrides min when columns is set', () => {
      render(
        <Grid columns={4} min="200px" data-testid="grid">
          <div>Content</div>
        </Grid>
      );
      expect(screen.getByTestId('grid')).toHaveStyle({
        gridTemplateColumns: 'repeat(4, 1fr)',
      });
    });
  });

  describe('asChild', () => {
    it('renders as div by default', () => {
      render(
        <Grid data-testid="grid">
          <div>Content</div>
        </Grid>
      );
      expect(screen.getByTestId('grid').tagName).toBe('DIV');
    });

    it('renders as child element when asChild is true', () => {
      render(
        <Grid asChild data-testid="grid">
          <ul>
            <li>Item</li>
          </ul>
        </Grid>
      );
      expect(screen.getByTestId('grid').tagName).toBe('UL');
    });

    it('merges className with child when asChild is true', () => {
      render(
        <Grid asChild gap="xl" className="extra-class" data-testid="grid">
          <section className="section-class">
            <div>Content</div>
          </section>
        </Grid>
      );
      const element = screen.getByTestId('grid');
      expect(element).toHaveClass('gap-8');
      expect(element).toHaveClass('extra-class');
      expect(element).toHaveClass('section-class');
    });
  });

  it('merges custom style with grid template', () => {
    render(
      <Grid style={{ margin: '5px' }} min="150px" data-testid="grid">
        <div>Content</div>
      </Grid>
    );
    const grid = screen.getByTestId('grid');
    expect(grid.style.margin).toBe('5px');
    // Grid template is set via inline style
    expect(grid).toHaveStyle({
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(150px, 100%), 1fr))',
    });
  });

  it('passes through additional HTML attributes', () => {
    render(
      <Grid data-testid="grid-test" aria-label="grid">
        <div>Content</div>
      </Grid>
    );
    expect(screen.getByTestId('grid-test')).toHaveAttribute('aria-label', 'grid');
  });

  it('has correct displayName', () => {
    expect(Grid.displayName).toBe('Grid');
  });
});
