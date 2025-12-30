import { fireEvent, render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  it('does not render when closed', () => {
    render(<Modal open={false}>Content</Modal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    render(<Modal open>Content</Modal>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<Modal open>Modal content</Modal>);
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('has dialog role and aria-modal', () => {
    render(<Modal open>Content</Modal>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose}>
        <Modal.Content>Content</Modal.Content>
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when closeOnBackdropClick is false', () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} closeOnBackdropClick={false}>
        <Modal.Content>Content</Modal.Content>
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not close when clicking modal content', () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose}>
        <Modal.Content>Content</Modal.Content>
      </Modal>
    );
    fireEvent.click(screen.getByText('Content'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose}>
        Content
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when closeOnEscape is false', () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} closeOnEscape={false}>
        Content
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(
      <Modal open className="custom-class">
        Content
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveClass('custom-class');
  });

  it('has correct displayName', () => {
    expect(Modal.displayName).toBe('Modal');
  });
});

describe('Modal.Content', () => {
  it('renders children correctly', () => {
    render(
      <Modal open>
        <Modal.Content>Content text</Modal.Content>
      </Modal>
    );
    expect(screen.getByText('Content text')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Modal open>
        <Modal.Content ref={ref}>Content</Modal.Content>
      </Modal>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies size variant', () => {
    render(
      <Modal open>
        <Modal.Content size="lg">Content</Modal.Content>
      </Modal>
    );
    expect(screen.getByText('Content')).toHaveClass('max-w-lg');
  });

  it('has correct displayName', () => {
    expect(Modal.Content.displayName).toBe('Modal.Content');
  });
});

describe('Modal.Header', () => {
  it('renders children correctly', () => {
    render(
      <Modal open>
        <Modal.Content>
          <Modal.Header>Header text</Modal.Header>
        </Modal.Content>
      </Modal>
    );
    expect(screen.getByText('Header text')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Modal open>
        <Modal.Content>
          <Modal.Header ref={ref}>Header</Modal.Header>
        </Modal.Content>
      </Modal>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies padding variant', () => {
    render(
      <Modal open>
        <Modal.Content>
          <Modal.Header padding="lg">Header</Modal.Header>
        </Modal.Content>
      </Modal>
    );
    expect(screen.getByText('Header')).toHaveClass('px-8');
  });

  it('has correct displayName', () => {
    expect(Modal.Header.displayName).toBe('Modal.Header');
  });
});

describe('Modal.Title', () => {
  it('renders as h2', () => {
    render(
      <Modal open>
        <Modal.Content>
          <Modal.Title>Title</Modal.Title>
        </Modal.Content>
      </Modal>
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Title');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLHeadingElement>();
    render(
      <Modal open>
        <Modal.Content>
          <Modal.Title ref={ref}>Title</Modal.Title>
        </Modal.Content>
      </Modal>
    );
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });

  it('has correct displayName', () => {
    expect(Modal.Title.displayName).toBe('Modal.Title');
  });
});

describe('Modal.Description', () => {
  it('renders as paragraph', () => {
    render(
      <Modal open>
        <Modal.Content>
          <Modal.Description>Description text</Modal.Description>
        </Modal.Content>
      </Modal>
    );
    expect(screen.getByText('Description text').tagName).toBe('P');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLParagraphElement>();
    render(
      <Modal open>
        <Modal.Content>
          <Modal.Description ref={ref}>Description</Modal.Description>
        </Modal.Content>
      </Modal>
    );
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });

  it('has correct displayName', () => {
    expect(Modal.Description.displayName).toBe('Modal.Description');
  });
});

describe('Modal.Body', () => {
  it('renders children correctly', () => {
    render(
      <Modal open>
        <Modal.Content>
          <Modal.Body>Body content</Modal.Body>
        </Modal.Content>
      </Modal>
    );
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Modal open>
        <Modal.Content>
          <Modal.Body ref={ref}>Body</Modal.Body>
        </Modal.Content>
      </Modal>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies padding variant', () => {
    render(
      <Modal open>
        <Modal.Content>
          <Modal.Body padding="lg">Body</Modal.Body>
        </Modal.Content>
      </Modal>
    );
    expect(screen.getByText('Body')).toHaveClass('p-8');
  });

  it('has correct displayName', () => {
    expect(Modal.Body.displayName).toBe('Modal.Body');
  });
});

describe('Modal.Footer', () => {
  it('renders children correctly', () => {
    render(
      <Modal open>
        <Modal.Content>
          <Modal.Footer>Footer content</Modal.Footer>
        </Modal.Content>
      </Modal>
    );
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Modal open>
        <Modal.Content>
          <Modal.Footer ref={ref}>Footer</Modal.Footer>
        </Modal.Content>
      </Modal>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies padding variant', () => {
    render(
      <Modal open>
        <Modal.Content>
          <Modal.Footer padding="lg">Footer</Modal.Footer>
        </Modal.Content>
      </Modal>
    );
    expect(screen.getByText('Footer')).toHaveClass('px-8');
  });

  it('has correct displayName', () => {
    expect(Modal.Footer.displayName).toBe('Modal.Footer');
  });
});

describe('Modal.Backdrop', () => {
  it('renders correctly', () => {
    render(<Modal.Backdrop data-testid="backdrop" />);
    expect(screen.getByTestId('backdrop')).toBeInTheDocument();
  });

  it('has aria-hidden', () => {
    render(<Modal.Backdrop data-testid="backdrop" />);
    expect(screen.getByTestId('backdrop')).toHaveAttribute('aria-hidden', 'true');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Modal.Backdrop data-testid="backdrop" onClick={onClick} />);
    fireEvent.click(screen.getByTestId('backdrop'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has correct displayName', () => {
    expect(Modal.Backdrop.displayName).toBe('Modal.Backdrop');
  });
});

describe('Modal composition', () => {
  it('renders full modal structure', () => {
    render(
      <Modal open>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>Body content here</Modal.Body>
          <Modal.Footer>
            <button type="button">Cancel</button>
            <button type="button">Confirm</button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );

    expect(screen.getByRole('heading', { name: 'Modal Title' })).toBeInTheDocument();
    expect(screen.getByText('Body content here')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });
});

describe('Modal accessibility', () => {
  it('supports aria-labelledby', () => {
    render(
      <Modal open aria-labelledby="modal-title">
        <Modal.Content>
          <Modal.Title id="modal-title">Test Title</Modal.Title>
        </Modal.Content>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('supports aria-describedby', () => {
    render(
      <Modal open aria-describedby="modal-desc">
        <Modal.Content>
          <Modal.Description id="modal-desc">Test description</Modal.Description>
        </Modal.Content>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-describedby', 'modal-desc');
  });

  it('traps focus within modal by default', () => {
    render(
      <Modal open>
        <Modal.Content>
          <Modal.Body>
            <button type="button">First</button>
            <button type="button">Last</button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );

    const firstButton = screen.getByRole('button', { name: 'First' });
    const lastButton = screen.getByRole('button', { name: 'Last' });

    // Focus first button and shift+tab should wrap to last
    firstButton.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(lastButton);

    // Focus last button and tab should wrap to first
    lastButton.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: false });
    expect(document.activeElement).toBe(firstButton);
  });

  it('does not trap focus when trapFocus is false', () => {
    render(
      <Modal open trapFocus={false}>
        <Modal.Content>
          <Modal.Body>
            <button type="button">First</button>
            <button type="button">Last</button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );

    const lastButton = screen.getByRole('button', { name: 'Last' });

    // With trapFocus=false, tab should not wrap
    lastButton.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: false });
    // Should not have wrapped to first button
    expect(document.activeElement).toBe(lastButton);
  });

  it('auto-focuses first focusable element when opened', async () => {
    vi.useFakeTimers();
    render(
      <Modal open>
        <Modal.Content>
          <Modal.Body>
            <button type="button">Focus me</button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );

    vi.runAllTimers();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Focus me' }));
    vi.useRealTimers();
  });

  it('does not auto-focus when autoFocus is false', async () => {
    vi.useFakeTimers();
    render(
      <Modal open autoFocus={false}>
        <Modal.Content>
          <Modal.Body>
            <button type="button">Do not focus</button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );

    vi.runAllTimers();
    // Should not have focused the button
    expect(document.activeElement).not.toBe(screen.getByRole('button', { name: 'Do not focus' }));
    vi.useRealTimers();
  });

  it('returns focus to trigger element when closed', () => {
    vi.useFakeTimers();
    const TestComponent = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open Modal
          </button>
          <Modal open={open} onClose={() => setOpen(false)} returnFocus>
            <Modal.Content>
              <Modal.Body>
                <button type="button" onClick={() => setOpen(false)}>
                  Close
                </button>
              </Modal.Body>
            </Modal.Content>
          </Modal>
        </>
      );
    };

    render(<TestComponent />);

    const openButton = screen.getByRole('button', { name: 'Open Modal' });
    openButton.focus();
    fireEvent.click(openButton);
    vi.runAllTimers();

    // Modal should be open and focus moved
    const closeButton = screen.getByRole('button', { name: 'Close' });
    expect(closeButton).toBeInTheDocument();

    // Close modal
    fireEvent.click(closeButton);

    // Focus should return to the open button
    expect(document.activeElement).toBe(openButton);
    vi.useRealTimers();
  });

  it('Modal.Description has text-sm class for styling', () => {
    render(
      <Modal open>
        <Modal.Content>
          <Modal.Description>Description text</Modal.Description>
        </Modal.Content>
      </Modal>
    );
    const description = screen.getByText('Description text');
    expect(description).toHaveClass('text-sm');
  });
});
