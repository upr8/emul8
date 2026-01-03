import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Group } from './Group';

describe('Group', () => {
  it('renders children correctly', () => {
    render(<Group>Test content</Group>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Group ref={ref}>Content</Group>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(<Group className="custom-class">Content</Group>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });

  it('has group role for accessibility', () => {
    render(<Group>Content</Group>);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('applies inline-flex by default', () => {
    render(<Group>Content</Group>);
    expect(screen.getByRole('group')).toHaveClass('inline-flex');
  });

  it('applies gap variant', () => {
    render(<Group gap="lg">Content</Group>);
    expect(screen.getByRole('group')).toHaveClass('gap-6');
  });

  it('applies align variant', () => {
    render(<Group align="start">Content</Group>);
    expect(screen.getByRole('group')).toHaveClass('items-start');
  });

  it('applies grow variant', () => {
    render(<Group grow>Content</Group>);
    expect(screen.getByRole('group')).toHaveClass('[&>*]:flex-1');
  });

  it('applies preventGrow variant', () => {
    render(<Group preventGrow>Content</Group>);
    expect(screen.getByRole('group')).toHaveClass('[&>*]:flex-none');
  });

  it('renders as child element with asChild', () => {
    render(
      <Group asChild>
        <nav>Content</nav>
      </Group>
    );
    expect(screen.getByRole('group').tagName).toBe('NAV');
  });

  it('passes through additional HTML attributes', () => {
    render(<Group data-testid="group-test">Content</Group>);
    expect(screen.getByTestId('group-test')).toBeInTheDocument();
  });

  it('has correct displayName', () => {
    expect(Group.displayName).toBe('Group');
  });
});
