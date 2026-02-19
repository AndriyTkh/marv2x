'use client';

import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';
import { ModalProps } from './types';

export default function Modal({
  isOpen,
  onClose,
  children,
  ariaLabel = 'Dialog',
  initialFocusSelector,
  returnFocusRef,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus trap implementation
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    // Store the element that had focus before modal opened
    // Use returnFocusRef if provided, otherwise use the currently active element
    if (returnFocusRef?.current) {
      previousActiveElement.current = returnFocusRef.current;
    } else {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }

    // Get all focusable elements within the modal
    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Focus the specified element or the first focusable element
    if (initialFocusSelector) {
      const targetElement = modalRef.current.querySelector<HTMLElement>(initialFocusSelector);
      if (targetElement) {
        targetElement.focus();
      } else if (firstFocusable) {
        firstFocusable.focus();
      }
    } else if (firstFocusable) {
      firstFocusable.focus();
    }

    // Handle Tab key to trap focus
    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);

    // Cleanup: restore focus when modal closes
    return () => {
      document.removeEventListener('keydown', handleTab);
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, initialFocusSelector, returnFocusRef]);

  // Handle click outside (on backdrop)
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick} aria-hidden="true">
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close dialog"
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
