import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { AppShell } from './AppShell';

describe('AppShell', () => {
  it('renders children correctly', () => {
    render(<AppShell>Test content</AppShell>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<AppShell ref={ref}>Content</AppShell>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(<AppShell className="custom-class">Content</AppShell>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });

  it('applies default layout styles', () => {
    render(<AppShell>Content</AppShell>);
    const element = screen.getByText('Content');
    expect(element).toHaveClass('min-h-screen');
    expect(element).toHaveClass('flex');
    expect(element).toHaveClass('flex-col');
  });

  it('applies centered layout', () => {
    render(<AppShell layout="centered">Content</AppShell>);
    expect(screen.getByText('Content')).toHaveClass('[&>main]:mx-auto');
  });

  it('has correct displayName', () => {
    expect(AppShell.displayName).toBe('AppShell');
  });
});

describe('AppShell.Header', () => {
  it('renders children correctly', () => {
    render(<AppShell.Header>Header content</AppShell.Header>);
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });

  it('forwards ref to the underlying header element', () => {
    const ref = createRef<HTMLElement>();
    render(<AppShell.Header ref={ref}>Content</AppShell.Header>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('HEADER');
  });

  it('renders as header element', () => {
    render(<AppShell.Header>Content</AppShell.Header>);
    expect(screen.getByText('Content').tagName).toBe('HEADER');
  });

  it('applies height variant', () => {
    render(<AppShell.Header height="lg">Content</AppShell.Header>);
    expect(screen.getByText('Content')).toHaveClass('h-16');
  });

  it('applies sticky variant', () => {
    render(<AppShell.Header sticky>Content</AppShell.Header>);
    const element = screen.getByText('Content');
    expect(element).toHaveClass('sticky');
    expect(element).toHaveClass('top-0');
  });

  it('has correct displayName', () => {
    expect(AppShell.Header.displayName).toBe('AppShell.Header');
  });
});

describe('AppShell.Sidebar', () => {
  it('renders children correctly', () => {
    render(<AppShell.Sidebar>Sidebar content</AppShell.Sidebar>);
    expect(screen.getByText('Sidebar content')).toBeInTheDocument();
  });

  it('forwards ref to the underlying aside element', () => {
    const ref = createRef<HTMLElement>();
    render(<AppShell.Sidebar ref={ref}>Content</AppShell.Sidebar>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('ASIDE');
  });

  it('renders as aside element', () => {
    render(<AppShell.Sidebar>Content</AppShell.Sidebar>);
    expect(screen.getByText('Content').tagName).toBe('ASIDE');
  });

  it('applies width variant', () => {
    render(<AppShell.Sidebar width="lg">Content</AppShell.Sidebar>);
    expect(screen.getByText('Content')).toHaveClass('w-80');
  });

  it('applies position variant', () => {
    render(<AppShell.Sidebar position="right">Content</AppShell.Sidebar>);
    const element = screen.getByText('Content');
    expect(element).toHaveClass('order-last');
    expect(element).toHaveClass('border-l');
  });

  it('has correct displayName', () => {
    expect(AppShell.Sidebar.displayName).toBe('AppShell.Sidebar');
  });
});

describe('AppShell.Main', () => {
  it('renders children correctly', () => {
    render(<AppShell.Main>Main content</AppShell.Main>);
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  it('forwards ref to the underlying main element', () => {
    const ref = createRef<HTMLElement>();
    render(<AppShell.Main ref={ref}>Content</AppShell.Main>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('MAIN');
  });

  it('renders as main element', () => {
    render(<AppShell.Main>Content</AppShell.Main>);
    expect(screen.getByText('Content').tagName).toBe('MAIN');
  });

  it('applies padding variant', () => {
    render(<AppShell.Main padding="lg">Content</AppShell.Main>);
    expect(screen.getByText('Content')).toHaveClass('p-8');
  });

  it('applies maxWidth variant', () => {
    render(<AppShell.Main maxWidth="lg">Content</AppShell.Main>);
    expect(screen.getByText('Content')).toHaveClass('max-w-screen-lg');
  });

  it('has correct displayName', () => {
    expect(AppShell.Main.displayName).toBe('AppShell.Main');
  });
});

describe('AppShell.Footer', () => {
  it('renders children correctly', () => {
    render(<AppShell.Footer>Footer content</AppShell.Footer>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('forwards ref to the underlying footer element', () => {
    const ref = createRef<HTMLElement>();
    render(<AppShell.Footer ref={ref}>Content</AppShell.Footer>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('FOOTER');
  });

  it('renders as footer element', () => {
    render(<AppShell.Footer>Content</AppShell.Footer>);
    expect(screen.getByText('Content').tagName).toBe('FOOTER');
  });

  it('applies padding variant', () => {
    render(<AppShell.Footer padding="lg">Content</AppShell.Footer>);
    const element = screen.getByText('Content');
    expect(element).toHaveClass('py-8');
    expect(element).toHaveClass('px-8');
  });

  it('has correct displayName', () => {
    expect(AppShell.Footer.displayName).toBe('AppShell.Footer');
  });
});

describe('AppShell.Body', () => {
  it('renders children correctly', () => {
    render(<AppShell.Body>Body content</AppShell.Body>);
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<AppShell.Body ref={ref}>Content</AppShell.Body>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies flex styles', () => {
    render(<AppShell.Body>Content</AppShell.Body>);
    const element = screen.getByText('Content');
    expect(element).toHaveClass('flex');
    expect(element).toHaveClass('flex-1');
    expect(element).toHaveClass('overflow-hidden');
  });

  it('has correct displayName', () => {
    expect(AppShell.Body.displayName).toBe('AppShell.Body');
  });
});

describe('AppShell composition', () => {
  it('renders full layout correctly', () => {
    render(
      <AppShell>
        <AppShell.Header>Header</AppShell.Header>
        <AppShell.Body>
          <AppShell.Sidebar>Sidebar</AppShell.Sidebar>
          <AppShell.Main>Main</AppShell.Main>
        </AppShell.Body>
        <AppShell.Footer>Footer</AppShell.Footer>
      </AppShell>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
