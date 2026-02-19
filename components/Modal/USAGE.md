# Modal Component - Focus Management Usage

## Overview

The Modal component now supports enhanced focus management to meet accessibility requirements, specifically for the gated product spec downloads feature.

## Enhanced Focus Management Features

### 1. Initial Focus Control

Use `initialFocusSelector` to specify which element should receive focus when the modal opens.

**Example: Focus on first form field**

```tsx
<Modal
  isOpen={isModalOpen}
  onClose={handleClose}
  initialFocusSelector="#firstName"
  ariaLabel="Access Gate Form"
>
  <ContactForm config={formConfig} />
</Modal>
```

### 2. Return Focus Control

Use `returnFocusRef` to specify which element should receive focus when the modal closes.

**Example: Return focus to Spec Download Button**

```tsx
const buttonRef = useRef<HTMLButtonElement>(null);

// Pass ref to the button component
<SpecDownloadButton
  ref={buttonRef}
  productId={productId}
  onRequestSpecs={handleRequestSpecs}
  onDownloadPdf={handleDownloadPdf}
/>

// Pass ref to Modal
<Modal
  isOpen={isModalOpen}
  onClose={handleClose}
  returnFocusRef={buttonRef}
  ariaLabel="Access Gate Form"
>
  <ContactForm config={formConfig} />
</Modal>
```

## Complete Example for Product Page

```tsx
'use client';

import { useRef, useState } from 'react';
import Modal from '@/components/Modal/Modal';
import ContactForm from '@/components/ContactForm/ContactForm';
import SpecDownloadButton from '@/components/SpecDownloadButton/SpecDownloadButton';

export default function ProductPageClient({ productId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const specButtonRef = useRef<HTMLButtonElement>(null);

  const handleRequestSpecs = () => {
    setIsModalOpen(true);
  };

  const handleDownloadPdf = () => {
    // Trigger PDF download
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formConfig = {
    visibleFields: {
      firstName: true,
      lastName: true,
      email: true,
    },
    hiddenFields: {
      productId: productId,
    },
    submitButtonText: 'Request Specs',
    onSubmit: async (data) => {
      // Handle form submission
    },
  };

  return (
    <div>
      <SpecDownloadButton
        ref={specButtonRef}
        productId={productId}
        onRequestSpecs={handleRequestSpecs}
        onDownloadPdf={handleDownloadPdf}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialFocusSelector="#firstName"
        returnFocusRef={specButtonRef}
        ariaLabel="Request Product Specifications"
      >
        <ContactForm config={formConfig} />
      </Modal>
    </div>
  );
}
```

## Requirements Satisfied

- **Requirement 10.3**: When Form_Modal opens, focus moves to the first form field (`initialFocusSelector="#firstName"`)
- **Requirement 10.4**: When Form_Modal closes, focus returns to Spec_Download_Button (`returnFocusRef={specButtonRef}`)

## Default Behavior

If these props are not provided, the Modal maintains backward compatibility:

- **Without `initialFocusSelector`**: Focuses the first focusable element (typically the close button)
- **Without `returnFocusRef`**: Returns focus to the element that had focus before the modal opened

## Accessibility Notes

- The Modal maintains focus trap functionality (Tab/Shift+Tab cycles through focusable elements)
- Escape key closes the modal
- Click outside (backdrop) closes the modal
- All ARIA attributes are properly set (`role="dialog"`, `aria-modal="true"`)
