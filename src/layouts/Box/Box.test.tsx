import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Box } from './Box';

describe('Box', () => {
  it('renders children correctly', () => {
    render(<Box>Content</Box>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders as a div element by default', () => {
    render(<Box data-testid="box">Content</Box>);
    const box = screen.getByTestId('box');
    expect(box.tagName).toBe('DIV');
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Box ref={ref}>Content</Box>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(
      <Box className="custom-class" data-testid="box">
        Content
      </Box>
    );
    expect(screen.getByTestId('box')).toHaveClass('custom-class');
  });

  it('passes through additional props', () => {
    render(
      <Box data-testid="test-box" aria-label="test">
        Content
      </Box>
    );
    expect(screen.getByTestId('test-box')).toHaveAttribute('aria-label', 'test');
  });

  describe('padding', () => {
    it('applies md padding by default', () => {
      render(<Box data-testid="box">Content</Box>);
      expect(screen.getByTestId('box')).toHaveClass('p-4');
    });

    it('applies none padding', () => {
      render(
        <Box padding="none" data-testid="box">
          Content
        </Box>
      );
      expect(screen.getByTestId('box')).toHaveClass('p-0');
    });

    it('applies xs padding', () => {
      render(
        <Box padding="xs" data-testid="box">
          Content
        </Box>
      );
      expect(screen.getByTestId('box')).toHaveClass('p-1');
    });

    it('applies sm padding', () => {
      render(
        <Box padding="sm" data-testid="box">
          Content
        </Box>
      );
      expect(screen.getByTestId('box')).toHaveClass('p-2');
    });

    it('applies lg padding', () => {
      render(
        <Box padding="lg" data-testid="box">
          Content
        </Box>
      );
      expect(screen.getByTestId('box')).toHaveClass('p-6');
    });

    it('applies xl padding', () => {
      render(
        <Box padding="xl" data-testid="box">
          Content
        </Box>
      );
      expect(screen.getByTestId('box')).toHaveClass('p-8');
    });
  });

  describe('borderWidth', () => {
    it('applies no border by default', () => {
      render(<Box data-testid="box">Content</Box>);
      expect(screen.getByTestId('box')).toHaveClass('border-0');
    });

    it('applies thin border', () => {
      render(
        <Box borderWidth="thin" data-testid="box">
          Content
        </Box>
      );
      expect(screen.getByTestId('box')).toHaveClass('border');
    });

    it('applies medium border', () => {
      render(
        <Box borderWidth="medium" data-testid="box">
          Content
        </Box>
      );
      expect(screen.getByTestId('box')).toHaveClass('border-2');
    });

    it('applies thick border', () => {
      render(
        <Box borderWidth="thick" data-testid="box">
          Content
        </Box>
      );
      expect(screen.getByTestId('box')).toHaveClass('border-4');
    });
  });

  describe('asChild', () => {
    it('renders as child element when asChild is true', () => {
      render(
        <Box asChild>
          <section data-testid="section">Content</section>
        </Box>
      );
      const section = screen.getByTestId('section');
      expect(section.tagName).toBe('SECTION');
    });

    it('applies box styles to child element', () => {
      render(
        <Box asChild padding="lg" borderWidth="thin">
          <article data-testid="article">Content</article>
        </Box>
      );
      const article = screen.getByTestId('article');
      expect(article).toHaveClass('p-6');
      expect(article).toHaveClass('border');
    });
  });

  it('has correct displayName', () => {
    expect(Box.displayName).toBe('Box');
  });
});
