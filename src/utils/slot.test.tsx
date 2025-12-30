import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Slot } from './slot';

describe('Slot', () => {
  it('is exported from the module', () => {
    expect(Slot).toBeDefined();
  });

  it('renders children', () => {
    render(
      <Slot>
        <span>Child content</span>
      </Slot>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('merges props onto child', () => {
    render(
      <Slot className="slot-class" data-testid="slot">
        <div className="child-class">Content</div>
      </Slot>
    );
    const element = screen.getByTestId('slot');
    expect(element).toHaveClass('slot-class');
    expect(element).toHaveClass('child-class');
  });

  it('passes through event handlers', () => {
    let clicked = false;
    render(
      <Slot
        onClick={() => {
          clicked = true;
        }}
      >
        <button>Click me</button>
      </Slot>
    );
    screen.getByRole('button').click();
    expect(clicked).toBe(true);
  });
});
