/**
 * Configuration interfaces for ContactForm component
 * Enables flexible form configuration for different use cases
 */

/**
 * Defines which fields should be visible in the form
 * All fields default to false (hidden) unless explicitly set to true
 */
export interface ContactFormFieldConfig {
  firstName?: boolean;
  lastName?: boolean;
  company?: boolean;
  email?: boolean;
  phone?: boolean;
  country?: boolean;
  city?: boolean;
  postalCode?: boolean;
  topic?: boolean;
  message?: boolean;
}

/**
 * Hidden field data that will be submitted with the form but not displayed to the user
 * Useful for tracking context like product IDs, referral sources, etc.
 */
export interface HiddenFieldData {
  [key: string]: string | number | boolean;
}

/**
 * Form data structure for submission
 */
export interface ContactFormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  postalCode: string;
  topic: string;
  message: string;
  [key: string]: string | number | boolean; // Allow additional fields from hiddenFields
}

/**
 * Main configuration interface for ContactForm component
 */
export interface ContactFormConfig {
  /**
   * Defines which fields to display in the form
   * If not provided, all fields are shown (default behavior)
   */
  visibleFields?: ContactFormFieldConfig;

  /**
   * Custom submit handler that receives form data
   * If provided, this handler is called instead of the default API submission
   * @param data - The form data including visible fields and hidden fields
   * @returns Promise that resolves when submission is complete
   */
  onSubmit?: (data: ContactFormData) => Promise<void>;

  /**
   * Hidden fields that will be included in form submission but not displayed
   * These are merged with the visible form data before submission
   */
  hiddenFields?: HiddenFieldData;

  /**
   * Custom text for the submit button
   * Defaults to "Send Message" if not provided
   */
  submitButtonText?: string;

  /**
   * Custom text for the submit button when form is submitting
   * Defaults to "Sending..." if not provided
   */
  submitButtonLoadingText?: string;
}
