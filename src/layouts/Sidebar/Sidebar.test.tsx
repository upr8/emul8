import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('renders children correctly', () => {
    render(
      <Sidebar sidebar={<nav>Nav</nav>}>
        <main>Main content</main>
      </Sidebar>
    );
    expect(screen.getByText('Nav')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Sidebar ref={ref} sidebar={<nav>Nav</nav>}>
        Content
      </Sidebar>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(
      <Sidebar className="custom-class" sidebar={<nav>Nav</nav>} data-testid="sidebar">
        Content
      </Sidebar>
    );
    expect(screen.getByTestId('sidebar')).toHaveClass('custom-class');
  });

  it('applies base classes', () => {
    render(
      <Sidebar sidebar={<nav>Nav</nav>} data-testid="sidebar">
        Content
      </Sidebar>
    );
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toHaveClass('flex');
    expect(sidebar).toHaveClass('flex-wrap');
  });

  it('applies gap variant', () => {
    render(
      <Sidebar gap="lg" sidebar={<nav>Nav</nav>} data-testid="sidebar">
        Content
      </Sidebar>
    );
    expect(screen.getByTestId('sidebar')).toHaveClass('gap-6');
  });

  describe('noStretch prop', () => {
    it('stretches items by default', () => {
      render(
        <Sidebar sidebar={<nav>Nav</nav>} data-testid="sidebar">
          Content
        </Sidebar>
      );
      expect(screen.getByTestId('sidebar')).toHaveClass('items-stretch');
    });

    it('aligns items to start when noStretch is true', () => {
      render(
        <Sidebar noStretch sidebar={<nav>Nav</nav>} data-testid="sidebar">
          Content
        </Sidebar>
      );
      expect(screen.getByTestId('sidebar')).toHaveClass('items-start');
    });
  });

  describe('side prop', () => {
    it('places sidebar on the left by default', () => {
      render(
        <Sidebar sidebar={<nav data-testid="nav">Nav</nav>} data-testid="sidebar">
          <main data-testid="main">Main</main>
        </Sidebar>
      );
      const container = screen.getByTestId('sidebar');
      const children = Array.from(container.children);
      const navParentIndex = children.findIndex((el) => el.querySelector('[data-testid="nav"]'));
      const mainParentIndex = children.findIndex((el) => el.querySelector('[data-testid="main"]'));
      expect(navParentIndex).toBeLessThan(mainParentIndex);
    });

    it('places sidebar on the right when side is right', () => {
      render(
        <Sidebar side="right" sidebar={<nav data-testid="nav">Nav</nav>} data-testid="sidebar">
          <main data-testid="main">Main</main>
        </Sidebar>
      );
      const container = screen.getByTestId('sidebar');
      const children = Array.from(container.children);
      const navParentIndex = children.findIndex((el) => el.querySelector('[data-testid="nav"]'));
      const mainParentIndex = children.findIndex((el) => el.querySelector('[data-testid="main"]'));
      expect(mainParentIndex).toBeLessThan(navParentIndex);
    });
  });

  describe('sideWidth prop', () => {
    it('applies default sidebar width of 20rem', () => {
      render(<Sidebar sidebar={<nav data-testid="nav">Nav</nav>}>Content</Sidebar>);
      const navWrapper = screen.getByTestId('nav').parentElement;
      expect(navWrapper).toHaveStyle({ flexBasis: '20rem' });
    });

    it('applies custom sidebar width', () => {
      render(
        <Sidebar sideWidth="300px" sidebar={<nav data-testid="nav">Nav</nav>}>
          Content
        </Sidebar>
      );
      const navWrapper = screen.getByTestId('nav').parentElement;
      expect(navWrapper).toHaveStyle({ flexBasis: '300px' });
    });
  });

  describe('contentMin prop', () => {
    it('applies default content min of 50%', () => {
      render(
        <Sidebar sidebar={<nav>Nav</nav>}>
          <main data-testid="main">Main</main>
        </Sidebar>
      );
      const mainWrapper = screen.getByTestId('main').parentElement;
      expect(mainWrapper).toHaveStyle({ minInlineSize: '50%' });
    });

    it('applies custom content min', () => {
      render(
        <Sidebar contentMin="60%" sidebar={<nav>Nav</nav>}>
          <main data-testid="main">Main</main>
        </Sidebar>
      );
      const mainWrapper = screen.getByTestId('main').parentElement;
      expect(mainWrapper).toHaveStyle({ minInlineSize: '60%' });
    });
  });

  it('applies correct flex properties to sidebar element', () => {
    render(
      <Sidebar sideWidth="15rem" sidebar={<nav data-testid="nav">Nav</nav>}>
        Content
      </Sidebar>
    );
    const navWrapper = screen.getByTestId('nav').parentElement;
    expect(navWrapper).toHaveStyle({
      flexBasis: '15rem',
      flexGrow: 1,
    });
  });

  it('applies correct flex properties to content element', () => {
    render(
      <Sidebar contentMin="40%" sidebar={<nav>Nav</nav>}>
        <main data-testid="main">Main</main>
      </Sidebar>
    );
    const mainWrapper = screen.getByTestId('main').parentElement;
    expect(mainWrapper).toHaveStyle({
      flexBasis: 0,
      flexGrow: 999,
      minInlineSize: '40%',
    });
  });

  it('passes through additional HTML attributes', () => {
    render(
      <Sidebar sidebar={<nav>Nav</nav>} data-testid="sidebar-test" aria-label="layout">
        Content
      </Sidebar>
    );
    expect(screen.getByTestId('sidebar-test')).toHaveAttribute('aria-label', 'layout');
  });

  it('has correct displayName', () => {
    expect(Sidebar.displayName).toBe('Sidebar');
  });
});
