import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import type {
  backdropVariants,
  modalBodyVariants,
  modalContentVariants,
  modalFooterVariants,
  modalHeaderVariants,
} from './Modal.variants';

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
