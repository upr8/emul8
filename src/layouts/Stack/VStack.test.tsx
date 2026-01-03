import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VStack } from './VStack';

describe('VStack', () => {
  it('renders children', () => {
    render(
      <VStack>
        <div>Child 1</div>
        <div>Child 2</div>
      </VStack>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('applies vertical direction', () => {
    render(<VStack data-testid="vstack">Content</VStack>);
    expect(screen.getByTestId('vstack')).toHaveClass('flex-col');
  });

  it('applies gap', () => {
    render(
      <VStack gap="lg" data-testid="vstack">
        Content
      </VStack>
    );
    expect(screen.getByTestId('vstack')).toHaveClass('gap-6');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<VStack ref={ref}>Content</VStack>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(
      <VStack className="custom-class" data-testid="vstack">
        Content
      </VStack>
    );
    expect(screen.getByTestId('vstack')).toHaveClass('custom-class');
  });
});
