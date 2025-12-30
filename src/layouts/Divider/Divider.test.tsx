import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders correctly', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Divider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(<Divider className="custom-class" />);
    expect(screen.getByRole('separator')).toHaveClass('custom-class');
  });

  it('has separator role for accessibility', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('applies horizontal orientation by default', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('applies vertical orientation', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('applies aria-label when label provided', () => {
    render(<Divider label="Section divider" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-label', 'Section divider');
  });

  it('applies size variant', () => {
    render(<Divider size="lg" />);
    expect(screen.getByRole('separator')).toHaveClass('h-1');
  });

  it('passes through additional HTML attributes', () => {
    render(<Divider data-testid="divider-test" />);
    expect(screen.getByTestId('divider-test')).toBeInTheDocument();
  });

  it('has correct displayName', () => {
    expect(Divider.displayName).toBe('Divider');
  });
});
