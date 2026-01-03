import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders children correctly', () => {
    render(
      <Stack>
        <div>Child 1</div>
        <div>Child 2</div>
      </Stack>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Stack ref={ref}>Content</Stack>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(
      <Stack className="custom-class" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId('stack')).toHaveClass('custom-class');
  });

  it('applies vertical direction by default', () => {
    render(<Stack data-testid="stack">Content</Stack>);
    expect(screen.getByTestId('stack')).toHaveClass('flex-col');
  });

  it('applies horizontal direction', () => {
    render(
      <Stack direction="horizontal" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId('stack')).toHaveClass('flex-row');
  });

  it('applies gap variant', () => {
    render(
      <Stack gap="lg" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId('stack')).toHaveClass('gap-6');
  });

  it('applies align variant', () => {
    render(
      <Stack align="center" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId('stack')).toHaveClass('items-center');
  });

  it('applies justify variant', () => {
    render(
      <Stack justify="between" data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId('stack')).toHaveClass('justify-between');
  });

  it('applies wrap variant', () => {
    render(
      <Stack wrap data-testid="stack">
        Content
      </Stack>
    );
    expect(screen.getByTestId('stack')).toHaveClass('flex-wrap');
  });

  describe('splitAfter', () => {
    it('adds ml-auto to element after splitAfter index in horizontal direction', () => {
      render(
        <Stack direction="horizontal" splitAfter={0} data-testid="stack">
          <div data-testid="child-0">First</div>
          <div data-testid="child-1">Second</div>
          <div data-testid="child-2">Third</div>
        </Stack>
      );
      expect(screen.getByTestId('child-1')).toHaveClass('ml-auto');
    });

    it('adds mt-auto to element after splitAfter index in vertical direction', () => {
      render(
        <Stack direction="vertical" splitAfter={0} data-testid="stack">
          <div data-testid="child-0">First</div>
          <div data-testid="child-1">Second</div>
          <div data-testid="child-2">Third</div>
        </Stack>
      );
      expect(screen.getByTestId('child-1')).toHaveClass('mt-auto');
    });

    it('preserves existing className on split element', () => {
      render(
        <Stack direction="horizontal" splitAfter={0}>
          <div>First</div>
          <div className="existing-class" data-testid="split-child">
            Second
          </div>
        </Stack>
      );
      const splitChild = screen.getByTestId('split-child');
      expect(splitChild).toHaveClass('ml-auto');
      expect(splitChild).toHaveClass('existing-class');
    });

    it('does not modify children when splitAfter is negative', () => {
      render(
        <Stack direction="horizontal" splitAfter={-1} data-testid="stack">
          <div data-testid="child-0">First</div>
          <div data-testid="child-1">Second</div>
        </Stack>
      );
      expect(screen.getByTestId('child-0')).not.toHaveClass('ml-auto');
      expect(screen.getByTestId('child-1')).not.toHaveClass('ml-auto');
    });

    it('handles splitAfter at last index correctly', () => {
      render(
        <Stack direction="horizontal" splitAfter={1}>
          <div data-testid="child-0">First</div>
          <div data-testid="child-1">Second</div>
        </Stack>
      );
      // No child after index 1, so no element should have ml-auto
      expect(screen.getByTestId('child-0')).not.toHaveClass('ml-auto');
      expect(screen.getByTestId('child-1')).not.toHaveClass('ml-auto');
    });
  });

  it('passes through additional HTML attributes', () => {
    render(<Stack data-testid="stack-test">Content</Stack>);
    expect(screen.getByTestId('stack-test')).toBeInTheDocument();
  });

  it('has correct displayName', () => {
    expect(Stack.displayName).toBe('Stack');
  });
});

describe('Stack responsive gap', () => {
  it('applies responsive gap with @breakpoint notation', () => {
    render(
      <Stack gap="sm md@md lg@lg" data-testid="stack">
        <div>Content</div>
      </Stack>
    );
    const element = screen.getByTestId('stack');
    expect(element).toHaveClass('gap-2');
    expect(element).toHaveClass('md:gap-4');
    expect(element).toHaveClass('lg:gap-6');
  });

  it('applies responsive gap with only breakpoint values', () => {
    render(
      <Stack gap="md@md xl@xl" data-testid="stack">
        <div>Content</div>
      </Stack>
    );
    const element = screen.getByTestId('stack');
    expect(element).toHaveClass('md:gap-4');
    expect(element).toHaveClass('xl:gap-8');
  });

  it('combines responsive gap with direction', () => {
    render(
      <Stack gap="xs sm@lg" direction="horizontal" data-testid="stack">
        <div>Content</div>
      </Stack>
    );
    const element = screen.getByTestId('stack');
    expect(element).toHaveClass('flex-row');
    expect(element).toHaveClass('gap-1');
    expect(element).toHaveClass('lg:gap-2');
  });

  it('combines responsive gap with splitAfter', () => {
    render(
      <Stack gap="sm md@md" direction="horizontal" splitAfter={0} data-testid="stack">
        <div data-testid="child-0">First</div>
        <div data-testid="child-1">Second</div>
      </Stack>
    );
    const element = screen.getByTestId('stack');
    expect(element).toHaveClass('gap-2');
    expect(element).toHaveClass('md:gap-4');
    expect(screen.getByTestId('child-1')).toHaveClass('ml-auto');
  });
});
