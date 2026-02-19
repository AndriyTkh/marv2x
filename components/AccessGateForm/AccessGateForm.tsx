'use client';

import ContactForm from '@/components/ContactForm/ContactForm';
import { ContactFormConfig, ContactFormData } from '@/components/ContactForm/types';

interface AccessGateFormProps {
  productId: string;
  onSubmit: (data: ContactFormData) => Promise<void>;
}

/**
 * AccessGateForm component
 *
 * Wraps ContactForm for spec download access gate.
 * Displays firstName, lastName, email, company, country (required) and phone (optional).
 * Includes productId as a hidden field.
 *
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6
 */
export default function AccessGateForm({ productId, onSubmit }: AccessGateFormProps) {
  const config: ContactFormConfig = {
    // Required fields: firstName, lastName, email, company, country
    // Optional field: phone
    visibleFields: {
      firstName: true,
      lastName: true,
      email: true,
      company: true,
      phone: true,
      country: true,
      city: false,
      postalCode: false,
      topic: false,
      message: false,
    },
    // Hidden field: productId from URL parameter
    hiddenFields: {
      productId,
    },
    // Custom submit handler for spec request flow
    onSubmit,
    // Custom submit button text
    submitButtonText: 'Request Specs',
    submitButtonLoadingText: 'Requesting...',
  };

  return <ContactForm {...config} />;
}
