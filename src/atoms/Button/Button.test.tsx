import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders as a button element by default', () => {
    render(<Button>Button</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('passes through additional props', () => {
    render(<Button data-testid="test-button">Button</Button>);
    expect(screen.getByTestId('test-button')).toBeInTheDocument();
  });

  describe('variants', () => {
    it('applies primary variant by default', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-gray-950');
    });

    it('applies secondary variant', () => {
      render(<Button variant="secondary">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-gray-500');
    });

    it('applies danger variant', () => {
      render(<Button variant="danger">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-red-600');
    });

    it('applies success variant', () => {
      render(<Button variant="success">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-green-500');
    });

    it('applies ghost variant', () => {
      render(<Button variant="ghost">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-transparent');
    });

    it('applies outline variant', () => {
      render(<Button variant="outline">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('border-gray-300');
    });
  });

  describe('sizes', () => {
    it('applies md size by default', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-5');
    });

    it('applies sm size', () => {
      render(<Button size="sm">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-3');
    });

    it('applies lg size', () => {
      render(<Button size="lg">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-6');
    });

    it('applies icon size', () => {
      render(<Button size="icon">Icon</Button>);
      expect(screen.getByRole('button')).toHaveClass('p-2.5');
    });
  });

  describe('fullWidth', () => {
    it('applies full width when true', () => {
      render(<Button fullWidth>Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('w-full');
    });

    it('does not apply full width by default', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).not.toHaveClass('w-full');
    });
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Button</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('is not disabled by default', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).not.toBeDisabled();
    });
  });

  describe('loading state', () => {
    it('is disabled when loading', () => {
      render(<Button loading>Button</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('shows spinner when loading', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('still shows children when loading', () => {
      render(<Button loading>Loading text</Button>);
      expect(screen.getByText('Loading text')).toBeInTheDocument();
    });

    it('does not show spinner when not loading', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button.querySelector('.animate-spin')).not.toBeInTheDocument();
    });
  });

  describe('asChild', () => {
    it('renders as child element when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );
      const link = screen.getByRole('link', { name: 'Link Button' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
    });

    it('applies button styles to child element', () => {
      render(
        <Button asChild variant="danger">
          <a href="/test">Link Button</a>
        </Button>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveClass('bg-red-600');
    });
  });

  it('has correct displayName', () => {
    expect(Button.displayName).toBe('Button');
  });
});
