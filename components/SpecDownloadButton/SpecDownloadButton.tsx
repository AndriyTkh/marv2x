'use client';

import { useState, useEffect, forwardRef } from 'react';
import { getAccessState, getButtonLabel } from '@/lib/accessState';
import styles from './SpecDownloadButton.module.css';

interface SpecDownloadButtonProps {
  productId: string;
  onRequestSpecs: () => void;
  onDownloadPdf: () => void;
}

const SpecDownloadButton = forwardRef<HTMLButtonElement, SpecDownloadButtonProps>(
  function SpecDownloadButton({ productId, onRequestSpecs, onDownloadPdf }, ref) {
    const [hasAccess, setHasAccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      // Check localStorage for access state using utility function
      const accessState = getAccessState();
      setHasAccess(accessState);
      setIsLoading(false);

      // Listen for storage events to update button when access state changes
      const handleStorageChange = () => {
        const newAccessState = getAccessState();
        setHasAccess(newAccessState);
      };

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleClick = () => {
      if (hasAccess) {
        onDownloadPdf();
      } else {
        onRequestSpecs();
      }
    };

    const buttonLabel = getButtonLabel(hasAccess);
    const ariaLabel = hasAccess
      ? `Download PDF specification for ${productId}`
      : `Request access to full specifications for ${productId}`;

    if (isLoading) {
      return null; // Or a loading skeleton
    }

    return (
      <button
        ref={ref}
        className={styles.specButton}
        onClick={handleClick}
        aria-label={ariaLabel}
        type="button"
      >
        {buttonLabel}
      </button>
    );
  },
);

export default SpecDownloadButton;
