import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import type {
  ModalBackdropProps,
  ModalBodyProps,
  ModalContentProps,
  ModalDescriptionProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
  ModalTitleProps,
} from './Modal.types';
import {
  backdropVariants,
  modalBodyVariants,
  modalContentVariants,
  modalFooterVariants,
  modalHeaderVariants,
} from './Modal.variants';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Track number of open modals for stack-safe body overflow management */
let openModalCount = 0;

/**
 * Modal provides a semantic dialog overlay with backdrop.
 *
 * Compose with Modal.Content, Modal.Header, Modal.Body, Modal.Footer
 * for a complete modal structure. Includes focus trap, auto-focus, and
 * return focus for full accessibility.
 */
const ModalRoot = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      children,
      open = false,
      onClose,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      trapFocus = true,
      autoFocus = true,
      returnFocus = true,
      triggerRef,
      ...props
    },
    ref
  ) => {
    // SSR safety check - must be BEFORE any hooks that access document
    // oxlint-disable-next-line emul8/no-direct-document -- SSR guard check
    const isSSR = typeof document === 'undefined';

    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    const handleFocusTrap = useCallback(
      (event: KeyboardEvent) => {
        if (!trapFocus || event.key !== 'Tab') return;

        const modal = modalRef.current;
        /* c8 ignore next -- modal always exists when event fires */
        if (!modal) return;

        const focusableElements = modal.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        /* c8 ignore next -- defensive check for empty focusable elements */
        if (!firstElement) return;

        /* c8 ignore start -- focus trap branches depend on jsdom focus behavior */
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
        /* c8 ignore stop */
      },
      [trapFocus]
    );

    // Handle keyboard events including Escape and Tab (focus trap)
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape' && closeOnEscape && onClose) {
          onClose();
        }
        // Focus trap handling for Tab key
        if (trapFocus && event.key === 'Tab') {
          handleFocusTrap(event.nativeEvent);
        }
      },
      [closeOnEscape, onClose, trapFocus, handleFocusTrap]
    );

    // Handle open/close effects
    useEffect(() => {
      // Skip all document access during SSR
      if (isSSR) return;

      if (open) {
        // Store the element that had focus before opening
        previousActiveElement.current =
          (triggerRef?.current as HTMLElement) || (document.activeElement as HTMLElement | null);

        // Stack-safe body overflow management
        openModalCount++;
        if (openModalCount === 1) {
          document.body.style.overflow = 'hidden';
        }

        // Auto-focus first focusable element
        let timeoutId: ReturnType<typeof setTimeout> | undefined;
        if (autoFocus) {
          // Use setTimeout to ensure the modal is rendered before focusing
          timeoutId = setTimeout(() => {
            const modal = modalRef.current;
            /* c8 ignore next -- modal always exists in timeout */
            if (modal) {
              const firstFocusable = modal.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
              firstFocusable?.focus();
            }
          }, 0);
        }

        return () => {
          if (timeoutId) clearTimeout(timeoutId);
          // Stack-safe body overflow cleanup
          openModalCount--;
          if (openModalCount === 0) {
            document.body.style.overflow = '';
          }
        };
      }
      // Return focus when modal closes
      if (returnFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
        previousActiveElement.current = null;
      }
    }, [open, autoFocus, returnFocus, triggerRef, isSSR]);

    // Combine refs safely - must be before early return to satisfy rules of hooks
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        modalRef.current = node;
        /* c8 ignore start -- ref callback/object branches depend on test setup */
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        /* c8 ignore stop */
      },
      [ref]
    );

    // Early returns after all hooks
    if (!open) return null;
    /* c8 ignore next -- SSR branch never executes in jsdom */
    if (isSSR) return null;

    const handleBackdropClick = () => {
      if (closeOnBackdropClick && onClose) {
        onClose();
      }
    };

    // Safe to access document.body after the SSR guard above
    // oxlint-disable-next-line emul8/no-direct-document -- guarded by isSSR check
    const portalTarget = document.body;

    const modal = (
      <div
        ref={setRefs}
        role="dialog"
        aria-modal="true"
        className={cn(backdropVariants(), className)}
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    );

    return createPortal(modal, portalTarget);
  }
);
ModalRoot.displayName = 'Modal';

/**
 * Modal.Content - The modal container with size variants.
 */
const Content = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, size, animation, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(modalContentVariants({ size, animation }), className)}
        {...props}
      />
    );
  }
);
Content.displayName = 'Modal.Content';

/**
 * Modal.Header - The top section of the modal.
 */
const Header = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, padding, ...props }, ref) => {
    return <div ref={ref} className={cn(modalHeaderVariants({ padding }), className)} {...props} />;
  }
);
Header.displayName = 'Modal.Header';

/**
 * Modal.Title - The modal title heading.
 */
const Title = forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2 ref={ref} className={cn('text-lg font-semibold', className)} {...props}>
        {children}
      </h2>
    );
  }
);
Title.displayName = 'Modal.Title';

/**
 * Modal.Description - The modal description text.
 */
const Description = forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ className, ...props }, ref) => {
    return <p ref={ref} className={cn('text-sm', className)} {...props} />;
  }
);
Description.displayName = 'Modal.Description';

/**
 * Modal.Body - The scrollable content area.
 */
const Body = forwardRef<HTMLDivElement, ModalBodyProps>(({ className, padding, ...props }, ref) => {
  return <div ref={ref} className={cn(modalBodyVariants({ padding }), className)} {...props} />;
});
Body.displayName = 'Modal.Body';

/**
 * Modal.Footer - The bottom action area.
 */
const Footer = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, padding, ...props }, ref) => {
    return <div ref={ref} className={cn(modalFooterVariants({ padding }), className)} {...props} />;
  }
);
Footer.displayName = 'Modal.Footer';

/**
 * Modal.Backdrop - Standalone backdrop component.
 */
const Backdrop = forwardRef<HTMLDivElement, ModalBackdropProps>(
  ({ className, animation, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(backdropVariants({ animation }), className)}
        onClick={onClick}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
Backdrop.displayName = 'Modal.Backdrop';

export const Modal = Object.assign(ModalRoot, {
  Content,
  Header,
  Title,
  Description,
  Body,
  Footer,
  Backdrop,
});
