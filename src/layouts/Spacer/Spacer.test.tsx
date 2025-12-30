import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Spacer } from './Spacer';

describe('Spacer', () => {
  it('renders correctly', () => {
    render(<Spacer data-testid="spacer" />);
    expect(screen.getByTestId('spacer')).toBeInTheDocument();
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Spacer ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(<Spacer className="custom-class" data-testid="spacer" />);
    expect(screen.getByTestId('spacer')).toHaveClass('custom-class');
  });

  it('has aria-hidden for accessibility', () => {
    render(<Spacer data-testid="spacer" />);
    expect(screen.getByTestId('spacer')).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies flexible size by default', () => {
    render(<Spacer data-testid="spacer" />);
    expect(screen.getByTestId('spacer')).toHaveClass('flex-grow');
  });

  it('applies fixed size variant', () => {
    render(<Spacer size="md" data-testid="spacer" />);
    const element = screen.getByTestId('spacer');
    expect(element).toHaveClass('h-4');
    expect(element).toHaveClass('w-4');
  });

  it('passes through additional HTML attributes', () => {
    render(<Spacer data-testid="spacer-test" />);
    expect(screen.getByTestId('spacer-test')).toBeInTheDocument();
  });

  it('has correct displayName', () => {
    expect(Spacer.displayName).toBe('Spacer');
  });
});
