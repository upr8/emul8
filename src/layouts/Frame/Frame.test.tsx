import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Frame } from './Frame';

describe('Frame', () => {
  it('renders children correctly', () => {
    render(
      <Frame>
        <img src="test.jpg" alt="test" />
      </Frame>
    );
    expect(screen.getByAltText('test')).toBeInTheDocument();
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Frame ref={ref}>
        <div>Content</div>
      </Frame>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(
      <Frame className="custom-class" data-testid="frame">
        <div>Content</div>
      </Frame>
    );
    expect(screen.getByTestId('frame')).toHaveClass('custom-class');
  });

  it('applies base classes', () => {
    render(
      <Frame data-testid="frame">
        <div>Content</div>
      </Frame>
    );
    const frame = screen.getByTestId('frame');
    expect(frame).toHaveClass('relative');
    expect(frame).toHaveClass('overflow-hidden');
  });

  describe('ratio prop', () => {
    it('applies default 16:9 aspect ratio', () => {
      render(
        <Frame data-testid="frame">
          <div>Content</div>
        </Frame>
      );
      expect(screen.getByTestId('frame')).toHaveStyle({ aspectRatio: '16 / 9' });
    });

    it('applies 4:3 aspect ratio', () => {
      render(
        <Frame ratio="4:3" data-testid="frame">
          <div>Content</div>
        </Frame>
      );
      const frame = screen.getByTestId('frame');
      expect(frame.style.aspectRatio).toBe('4 / 3');
    });

    it('applies 1:1 aspect ratio', () => {
      render(
        <Frame ratio="1:1" data-testid="frame">
          <div>Content</div>
        </Frame>
      );
      expect(screen.getByTestId('frame')).toHaveStyle({ aspectRatio: '1 / 1' });
    });

    it('applies 21:9 aspect ratio', () => {
      render(
        <Frame ratio="21:9" data-testid="frame">
          <div>Content</div>
        </Frame>
      );
      expect(screen.getByTestId('frame')).toHaveStyle({ aspectRatio: '21 / 9' });
    });
  });

  describe('asChild', () => {
    it('renders as div by default', () => {
      render(
        <Frame data-testid="frame">
          <img src="test.jpg" alt="test" />
        </Frame>
      );
      expect(screen.getByTestId('frame').tagName).toBe('DIV');
    });

    it('applies asChild to inner wrapper', () => {
      // Note: Frame has an internal wrapper div, so asChild merges props with that wrapper,
      // not the user-provided child element. This is a limitation of Frame's design.
      render(
        <Frame asChild data-testid="frame">
          <figure>
            <img src="test.jpg" alt="test" />
          </figure>
        </Frame>
      );
      // The data-testid is applied to the inner wrapper div
      const element = screen.getByTestId('frame');
      expect(element.tagName).toBe('DIV');
      expect(element).toHaveClass('absolute');
    });

    it('merges className when asChild is true', () => {
      render(
        <Frame asChild ratio="4:3" className="extra-class" data-testid="frame">
          <section>
            <div>Content</div>
          </section>
        </Frame>
      );
      const element = screen.getByTestId('frame');
      // Classes are merged with the inner wrapper
      expect(element).toHaveClass('extra-class');
    });
  });

  it('wraps children in absolute positioned container', () => {
    render(
      <Frame data-testid="frame">
        <img src="test.jpg" alt="test" />
      </Frame>
    );
    const frame = screen.getByTestId('frame');
    const innerWrapper = frame.querySelector('div');
    expect(innerWrapper).toHaveClass('absolute');
    expect(innerWrapper).toHaveClass('inset-0');
    expect(innerWrapper).toHaveClass('flex');
    expect(innerWrapper).toHaveClass('items-center');
    expect(innerWrapper).toHaveClass('justify-center');
  });

  it('merges custom style with aspect ratio', () => {
    render(
      <Frame style={{ margin: '10px' }} ratio="4:3" data-testid="frame">
        <div>Content</div>
      </Frame>
    );
    const frame = screen.getByTestId('frame');
    expect(frame.style.margin).toBe('10px');
    expect(frame.style.aspectRatio).toBe('4 / 3');
  });

  it('passes through additional HTML attributes', () => {
    render(
      <Frame data-testid="frame-test" aria-label="frame">
        <div>Content</div>
      </Frame>
    );
    expect(screen.getByTestId('frame-test')).toHaveAttribute('aria-label', 'frame');
  });

  it('has correct displayName', () => {
    expect(Frame.displayName).toBe('Frame');
  });
});
