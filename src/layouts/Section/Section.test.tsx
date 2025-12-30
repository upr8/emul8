import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Section } from './Section';

describe('Section', () => {
  it('renders children correctly', () => {
    render(<Section>Test content</Section>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('forwards ref to the underlying section element', () => {
    const ref = createRef<HTMLElement>();
    render(<Section ref={ref}>Content</Section>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('SECTION');
  });

  it('applies custom className', () => {
    render(<Section className="custom-class">Content</Section>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });

  it('renders as section element by default', () => {
    render(<Section>Content</Section>);
    expect(screen.getByText('Content').tagName).toBe('SECTION');
  });

  it('applies size variant', () => {
    render(<Section size="lg">Content</Section>);
    expect(screen.getByText('Content')).toHaveClass('py-16');
  });

  it('applies padding variant', () => {
    render(<Section padding="lg">Content</Section>);
    expect(screen.getByText('Content')).toHaveClass('px-8');
  });

  it('renders as child element with asChild', () => {
    render(
      <Section asChild>
        <article>Content</article>
      </Section>
    );
    expect(screen.getByText('Content').tagName).toBe('ARTICLE');
  });

  it('combines size and padding variants', () => {
    render(
      <Section size="xl" padding="sm">
        Content
      </Section>
    );
    const element = screen.getByText('Content');
    expect(element).toHaveClass('py-24');
    expect(element).toHaveClass('px-4');
  });

  it('passes through additional HTML attributes', () => {
    render(<Section data-testid="section-test">Content</Section>);
    expect(screen.getByTestId('section-test')).toBeInTheDocument();
  });

  it('has correct displayName', () => {
    expect(Section.displayName).toBe('Section');
  });
});
