import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HStack } from './HStack';

describe('HStack', () => {
  it('renders children', () => {
    render(
      <HStack>
        <div>Child 1</div>
        <div>Child 2</div>
      </HStack>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('applies horizontal direction', () => {
    render(<HStack data-testid="hstack">Content</HStack>);
    expect(screen.getByTestId('hstack')).toHaveClass('flex-row');
  });

  it('applies gap', () => {
    render(
      <HStack gap="lg" data-testid="hstack">
        Content
      </HStack>
    );
    expect(screen.getByTestId('hstack')).toHaveClass('gap-6');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<HStack ref={ref}>Content</HStack>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(
      <HStack className="custom-class" data-testid="hstack">
        Content
      </HStack>
    );
    expect(screen.getByTestId('hstack')).toHaveClass('custom-class');
  });
});
