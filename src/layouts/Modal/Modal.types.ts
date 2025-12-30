import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, RefObject } from 'react';
import type {
  backdropVariants,
  modalBodyVariants,
  modalContentVariants,
  modalFooterVariants,
  modalHeaderVariants,
} from './Modal.variants';

/**
 * Props for the Modal component.
 *
 * Modal is fully accessible with focus trap, keyboard navigation, and ARIA attributes.
 * Use `aria-labelledby` and `aria-describedby` to link to Modal.Title and Modal.Description.
 *
 * @example
 * ```tsx
 * <Modal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   aria-labelledby="modal-title"
 *   aria-describedby="modal-desc"
 * >
 *   <Modal.Content>
 *     <Modal.Title id="modal-title">Confirm</Modal.Title>
 *     <Modal.Description id="modal-desc">Are you sure?</Modal.Description>
 *   </Modal.Content>
 * </Modal>
 * ```
 */
export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the modal is open.
   */
  open?: boolean;
  /**
   * Callback when the modal requests to close (backdrop click or escape key).
   */
  onClose?: () => void;
  /**
   * Whether clicking the backdrop closes the modal.
   * @default true
   */
  closeOnBackdropClick?: boolean;
  /**
   * Whether pressing Escape closes the modal.
   * @default true
   */
  closeOnEscape?: boolean;
  /**
   * Whether to trap focus within the modal when open.
   * @default true
   */
  trapFocus?: boolean;
  /**
   * Whether to auto-focus the first focusable element when opened.
   * @default true
   */
  autoFocus?: boolean;
  /**
   * Whether to return focus to the trigger element when closed.
   * @default true
   */
  returnFocus?: boolean;
  /**
   * Reference to the element that triggered the modal (for returning focus).
   * If not provided, uses document.activeElement when modal opens.
   */
  triggerRef?: RefObject<HTMLElement>;
}

export interface ModalContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalContentVariants> {}

export interface ModalHeaderProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalHeaderVariants> {}

export interface ModalBodyProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalBodyVariants> {}

export interface ModalFooterProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalFooterVariants> {}

export interface ModalBackdropProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof backdropVariants> {
  /**
   * Callback when backdrop is clicked.
   */
  onClick?: () => void;
}

export interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export interface ModalDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
