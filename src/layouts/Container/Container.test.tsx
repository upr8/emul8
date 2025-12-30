import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Center, Container } from './Container';

describe('Container', () => {
  it('renders children correctly', () => {
    render(<Container>Test content</Container>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Container ref={ref}>Content</Container>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(<Container className="custom-class">Content</Container>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });

  it('applies size variant', () => {
    render(<Container size="sm">Content</Container>);
    expect(screen.getByText('Content')).toHaveClass('max-w-screen-sm');
  });

  it('applies padding variant', () => {
    render(<Container padding="lg">Content</Container>);
    expect(screen.getByText('Content')).toHaveClass('px-8');
  });

  it('applies center variant', () => {
    render(<Container center>Content</Container>);
    const element = screen.getByText('Content');
    expect(element).toHaveClass('flex');
    expect(element).toHaveClass('items-center');
  });

  it('applies andText variant', () => {
    render(<Container andText>Content</Container>);
    expect(screen.getByText('Content')).toHaveClass('text-center');
  });

  it('combines multiple variants', () => {
    render(
      <Container size="xl" padding="sm" center andText>
        Content
      </Container>
    );
    const element = screen.getByText('Content');
    expect(element).toHaveClass('max-w-screen-xl');
    expect(element).toHaveClass('px-4');
    expect(element).toHaveClass('flex');
    expect(element).toHaveClass('text-center');
  });

  it('passes through additional HTML attributes', () => {
    render(<Container data-testid="container-test">Content</Container>);
    expect(screen.getByTestId('container-test')).toBeInTheDocument();
  });

  it('has correct displayName', () => {
    // Note: displayName is 'Center' because Center.displayName = 'Center' is set after Container
    // and Center === Container (same reference)
    expect(Container.displayName).toBe('Center');
  });
});

describe('Center', () => {
  it('is an alias for Container', () => {
    expect(Center).toBe(Container);
  });

  it('has correct displayName', () => {
    expect(Center.displayName).toBe('Center');
  });

  it('renders children correctly', () => {
    render(<Center>Centered content</Center>);
    expect(screen.getByText('Centered content')).toBeInTheDocument();
  });
});
