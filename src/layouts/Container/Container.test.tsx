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

  it('applies padding variant with RTL-safe logical properties', () => {
    render(<Container padding="lg">Content</Container>);
    const element = screen.getByText('Content');
    expect(element).toHaveClass('ps-8');
    expect(element).toHaveClass('pe-8');
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
    expect(element).toHaveClass('ps-4');
    expect(element).toHaveClass('pe-4');
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

describe('Container fluid variant', () => {
  it('applies fluid variant removing max-width', () => {
    render(<Container fluid>Content</Container>);
    expect(screen.getByText('Content')).toHaveClass('max-w-none');
  });

  it('fluid ignores size prop', () => {
    render(
      <Container fluid size="sm">
        Content
      </Container>
    );
    const element = screen.getByText('Content');
    expect(element).toHaveClass('max-w-none');
    expect(element).not.toHaveClass('max-w-screen-sm');
  });

  it('fluid maintains padding', () => {
    render(
      <Container fluid padding="lg">
        Content
      </Container>
    );
    const element = screen.getByText('Content');
    expect(element).toHaveClass('max-w-none');
    expect(element).toHaveClass('ps-8');
    expect(element).toHaveClass('pe-8');
  });

  it('fluid maintains center variant', () => {
    render(
      <Container fluid center>
        Content
      </Container>
    );
    const element = screen.getByText('Content');
    expect(element).toHaveClass('max-w-none');
    expect(element).toHaveClass('flex');
    expect(element).toHaveClass('items-center');
  });
});

describe('Container responsive padding', () => {
  it('applies responsive padding with object syntax using logical properties', () => {
    render(<Container padding={{ base: 'sm', md: 'md', lg: 'lg' }}>Content</Container>);
    const element = screen.getByText('Content');
    // Base responsive padding classes from responsivePadding utility
    expect(element.className).toMatch(/ps-4/);
    expect(element.className).toMatch(/pe-4/);
    expect(element.className).toMatch(/md:ps-6/);
    expect(element.className).toMatch(/md:pe-6/);
    expect(element.className).toMatch(/lg:ps-8/);
    expect(element.className).toMatch(/lg:pe-8/);
  });

  it('applies responsive padding with only breakpoint values', () => {
    render(<Container padding={{ md: 'md', xl: 'xl' }}>Content</Container>);
    const element = screen.getByText('Content');
    expect(element.className).toMatch(/md:ps-6/);
    expect(element.className).toMatch(/md:pe-6/);
    expect(element.className).toMatch(/xl:ps-12/);
    expect(element.className).toMatch(/xl:pe-12/);
  });

  it('combines fluid with responsive padding', () => {
    render(
      <Container fluid padding={{ base: 'sm', lg: 'md' }}>
        Content
      </Container>
    );
    const element = screen.getByText('Content');
    expect(element).toHaveClass('max-w-none');
    expect(element.className).toMatch(/ps-4/);
    expect(element.className).toMatch(/pe-4/);
    expect(element.className).toMatch(/lg:ps-6/);
    expect(element.className).toMatch(/lg:pe-6/);
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
