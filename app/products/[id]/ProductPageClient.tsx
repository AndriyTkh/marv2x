'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import SpecDownloadButton from '@/components/SpecDownloadButton/SpecDownloadButton';
import Modal from '@/components/Modal/Modal';
import AccessGateForm from '@/components/AccessGateForm/AccessGateForm';
import { setAccessState } from '@/lib/accessState';
import { ContactFormData } from '@/components/ContactForm/types';
import styles from './product.module.css';
import modalStyles from './ModalContent.module.css';
import type { Product } from './types';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface ProductPageClientProps {
  product: Product;
  productId: string;
}

export default function ProductPageClient({ product, productId }: ProductPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement>(null);

  const handleRequestSpecs = () => {
    setFormError(null);
    setIsModalOpen(true);
    // Store the button element for focus return
    if (buttonRef.current) {
      returnFocusRef.current = buttonRef.current;
    }
  };

  const handleDownloadPdf = async () => {
    try {
      console.log('Handle downlaod at client product');

      // Clear any previous download errors
      setDownloadError(null);

      // Check if product has specs field
      if (!product.specs) {
        throw new Error('Specification not available for this product');
      }

      // Import and call the PDF download utility with specs path and product name
      const { downloadProductPDF } = await import('@/lib/pdfDownload');
      await downloadProductPDF(product.specs, product.name);
    } catch (error) {
      // Display error message if PDF download fails
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to download specification';
      setDownloadError(errorMessage);
      console.error('PDF download error:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormError(null);
  };

  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      console.log('FORM SUBMITED');

      // Add timestamp to the submission
      const submissionData = {
        ...data,
        timestamp: new Date().toISOString(),
      };

      // Send form data to backend API endpoint
      const response = await fetch('/api/spec-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        // API returned an error - display it and keep modal open
        throw new Error(result.error || 'Failed to submit form');
      }

      // Success! Set access state to true in localStorage
      setAccessState(true);

      // Close the modal
      setIsModalOpen(false);
      setFormError(null);

      // Trigger PDF download after modal closes
      // Small delay to ensure modal close animation completes
      setTimeout(() => {
        handleDownloadPdf();
      }, 300);

      // Force re-render of SpecDownloadButton by triggering a window event
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      // Display error message within the form without closing modal
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred. Please try again.';
      setFormError(errorMessage);
      throw error; // Re-throw so ContactForm can handle the error state
    }
  };

  return (
    <>
      <div className={styles.infoContainer}>
        <h1 className={styles.title}>{product.name}</h1>
        <div className={styles.description}>
          {product.longDescription.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Price */}
        {product.price && (
          <div className={styles.priceSection}>
            <span className={styles.price}>{product.price}</span>
          </div>
        )}

        {/* CTA Buttons */}
        <div className={styles.ctaContainer}>
          <Link href="/contacts" className={styles.ctaButton}>
            Request a Quote
          </Link>
          {product.specs && (
            <SpecDownloadButton
              ref={buttonRef}
              productId={productId}
              onRequestSpecs={handleRequestSpecs}
              onDownloadPdf={handleDownloadPdf}
            />
          )}
        </div>

        {/* Download Error Message */}
        {downloadError && (
          <div className={modalStyles.downloadError} role="alert" aria-live="polite">
            {downloadError}
          </div>
        )}

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className={styles.characteristics}>
            <h2 className={styles.charTitle}>Key Features</h2>
            <ul className={styles.featureList}>
              {product.features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Applications */}
        {product.applications && product.applications.length > 0 && (
          <div className={styles.characteristics}>
            <h2 className={styles.charTitle}>Applications</h2>
            <div className={styles.applicationsList}>
              {product.applications.map((app, index) => (
                <div key={index} className={styles.applicationItem}>
                  <h3 className={styles.applicationProcess}>{app.process}</h3>
                  <p className={styles.applicationDescription}>{app.description}</p>
                  {'conditions' in app && app.conditions && (
                    <div className={styles.conditions}>
                      <strong>Conditions:</strong>
                      <ul className={styles.conditionsList}>
                        {Object.entries(app.conditions).map(([key, value]) => (
                          <li key={key}>
                            {key
                              .replace(/([A-Z])/g, ' $1')
                              .replace(/^./, (str) => str.toUpperCase())}
                            : {String(value)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {product.certifications && product.certifications.length > 0 && (
          <div className={styles.characteristics}>
            <h2 className={styles.charTitle}>Certifications</h2>
            <div className={styles.certificationsList}>
              {product.certifications.map((cert, index) => (
                <span key={index} className={styles.certificationBadge}>
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Access Gate Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ariaLabel="Request Product Specifications"
        initialFocusSelector="input[name='firstName']"
        returnFocusRef={returnFocusRef as React.RefObject<HTMLElement>}
      >
        <div>
          <h2 className={modalStyles.modalTitle}>Request Full Specifications</h2>
          <p className={modalStyles.modalDescription}>
            Please provide your information to access the complete product specifications.
          </p>
          {formError && (
            <div className={modalStyles.errorAlert} role="alert">
              {formError}
            </div>
          )}
          <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}>
            <AccessGateForm productId={productId} onSubmit={handleFormSubmit} />
          </GoogleReCaptchaProvider>
        </div>
      </Modal>
    </>
  );
}
