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
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    const handleEscape = useCallback(
      (event: KeyboardEvent) => {
        if (closeOnEscape && event.key === 'Escape' && onClose) {
          onClose();
        }
      },
      [closeOnEscape, onClose]
    );

    const handleFocusTrap = useCallback(
      (event: KeyboardEvent) => {
        if (!trapFocus || event.key !== 'Tab') return;

        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement) return;

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      },
      [trapFocus]
    );

    // Handle open/close effects
    useEffect(() => {
      if (open) {
        // Store the element that had focus before opening
        previousActiveElement.current =
          (triggerRef?.current as HTMLElement) || (document.activeElement as HTMLElement);

        document.addEventListener('keydown', handleEscape);
        document.addEventListener('keydown', handleFocusTrap);
        document.body.style.overflow = 'hidden';

        // Auto-focus first focusable element
        if (autoFocus) {
          // Use setTimeout to ensure the modal is rendered before focusing
          const timeoutId = setTimeout(() => {
            const modal = modalRef.current;
            if (modal) {
              const firstFocusable = modal.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
              firstFocusable?.focus();
            }
          }, 0);
          return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('keydown', handleFocusTrap);
            document.body.style.overflow = '';
          };
        }

        return () => {
          document.removeEventListener('keydown', handleEscape);
          document.removeEventListener('keydown', handleFocusTrap);
          document.body.style.overflow = '';
        };
      }
      // Return focus when modal closes
      if (returnFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
        previousActiveElement.current = null;
      }
    }, [open, handleEscape, handleFocusTrap, autoFocus, returnFocus, triggerRef]);

    if (!open) return null;

    const handleBackdropClick = () => {
      if (closeOnBackdropClick && onClose) {
        onClose();
      }
    };

    const modal = (
      <div
        ref={(node) => {
          // Handle both refs
          (modalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        role="dialog"
        aria-modal="true"
        className={cn(backdropVariants(), className)}
        onClick={handleBackdropClick}
        {...props}
      >
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    );

    return createPortal(modal, document.body);
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
const Title = forwardRef<HTMLHeadingElement, ModalTitleProps>(({ className, ...props }, ref) => {
  return <h2 ref={ref} className={cn('text-lg font-semibold', className)} {...props} />;
});
Title.displayName = 'Modal.Title';

/**
 * Modal.Description - The modal description text.
 */
const Description = forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-gray-600 dark:text-gray-400', className)}
        {...props}
      />
    );
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
