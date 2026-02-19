'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import styles from './ContactForm.module.css';
import { ContactFormConfig, ContactFormData } from './types';

interface FormData {
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
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  phone?: string;
  postalCode?: string;
  message?: string;
}

const MIN_MESSAGE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 2000;
const FORM_STORAGE_KEY = 'marvilon_contact_form_backup';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\-\+\(\)]+$/;
const POSTAL_CODE_REGEX = /^[A-Za-z0-9\s\-]+$/;
const NAME_REGEX = /^[a-zA-Z\s\-']+$/;

const EMPTY_FORM: FormData = {
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  postalCode: '',
  topic: '',
  message: '',
};

const getInitialFormData = (): FormData => {
  if (typeof window === 'undefined') return EMPTY_FORM;

  try {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedData) return JSON.parse(savedData);
  } catch (error) {
    console.error('Failed to load form data from localStorage:', error);
  }

  return EMPTY_FORM;
};

export default function ContactForm(config?: ContactFormConfig) {
  // Destructure config with defaults for backward compatibility
  const {
    visibleFields,
    onSubmit: customOnSubmit,
    hiddenFields = {},
    submitButtonText = 'Send Message',
    submitButtonLoadingText = 'Sending...',
  } = config || {};

  // Helper function to check if a field should be visible
  // If no config provided, all fields are visible (backward compatibility)
  const isFieldVisible = (fieldName: keyof FormData): boolean => {
    if (!visibleFields) return true; // No config = show all fields
    return visibleFields[fieldName as keyof typeof visibleFields] === true;
  };

  const [formData, setFormData] = useState<FormData>(getInitialFormData);

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Save form data to localStorage whenever it changes
  // useEffect(() => {
  //   try {
  //     localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
  //   } catch (error) {
  //     console.error('Failed to save form data to localStorage:', error);
  //   }
  // }, [formData]);
  useEffect(() => {
    setFormData(getInitialFormData());
  }, []);

  useEffect(() => {
    if (!visibleFields) return;

    setFormData((prev) => {
      const cleaned = { ...prev };

      Object.keys(cleaned).forEach((key) => {
        if (!isFieldVisible(key as keyof FormData)) {
          cleaned[key as keyof FormData] = '';
        }
      });

      return cleaned;
    });
  }, [visibleFields]);

  // Validation functions
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) return 'This field is required';
        if (value.length < 2) return 'Must be at least 2 characters';
        if (value.length > 50) return 'Must not exceed 50 characters';
        if (!NAME_REGEX.test(value))
          return 'Only letters, spaces, hyphens, and apostrophes allowed';
        return undefined;

      case 'company':
        if (!value.trim()) return 'Company name is required';
        if (value.length < 2) return 'Must be at least 2 characters';
        if (value.length > 100) return 'Must not exceed 100 characters';
        return undefined;

      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email address';
        if (value.length > 100) return 'Email is too long';
        return undefined;

      case 'phone':
        if (value && !PHONE_REGEX.test(value)) return 'Please enter a valid phone number';
        if (value.length > 20) return 'Phone number is too long';
        return undefined;

      case 'postalCode':
        if (value && !POSTAL_CODE_REGEX.test(value)) return 'Please enter a valid postal code';
        if (value.length > 20) return 'Postal code is too long';
        return undefined;

      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.length < MIN_MESSAGE_LENGTH)
          return `Message must be at least ${MIN_MESSAGE_LENGTH} characters`;
        if (value.length > MAX_MESSAGE_LENGTH)
          return `Message must not exceed ${MAX_MESSAGE_LENGTH} characters`;
        return undefined;

      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const requiredFields: (keyof FormErrors)[] = [];

    // Build list of required fields based on visibility
    if (isFieldVisible('firstName')) requiredFields.push('firstName');
    if (isFieldVisible('lastName')) requiredFields.push('lastName');
    if (isFieldVisible('company')) requiredFields.push('company');
    if (isFieldVisible('email')) requiredFields.push('email');
    if (isFieldVisible('message')) requiredFields.push('message');

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    // Validate optional fields if they have values and are visible
    ['phone', 'postalCode'].forEach((field) => {
      if (
        isFieldVisible(field as keyof typeof visibleFields) &&
        formData[field as keyof FormData]
      ) {
        const error = validateField(field, formData[field as keyof FormData]);
        if (error) newErrors[field as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (!validateForm()) {
      setStatus('error');
      setErrorMessage('Please fix the errors in the form before submitting');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Get reCAPTCHA token
      if (!executeRecaptcha) {
        setStatus('error');
        setErrorMessage('reCAPTCHA not loaded. Please refresh the page.');
        return;
      }

      const recaptchaToken = await executeRecaptcha('contact_form');

      // Merge form data with hidden fields and reCAPTCHA token
      const submissionData: ContactFormData = {
        ...formData,
        ...hiddenFields,
        recaptchaToken,
        timestamp: Date.now(),
      };

      // Use custom onSubmit if provided, otherwise use default API submission
      if (customOnSubmit) {
        await customOnSubmit(submissionData);
      } else {
        // Default submission logic
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to send message');
        }
      }

      setStatus('success');
      setFormData(EMPTY_FORM);
      setErrors({});
      setTouched({});
      localStorage.removeItem(FORM_STORAGE_KEY);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  const messageLength = formData.message.length;

  // Check if form is valid based on visible fields
  const isFormValid = (() => {
    // Check required visible fields are filled and valid
    if (isFieldVisible('firstName') && validateField('firstName', formData.firstName)) return false;
    if (isFieldVisible('lastName') && validateField('lastName', formData.lastName)) return false;
    if (isFieldVisible('company') && validateField('company', formData.company)) return false;
    if (isFieldVisible('email') && validateField('email', formData.email)) return false;
    if (isFieldVisible('message') && validateField('message', formData.message)) return false;

    // Check optional fields if they have values
    if (isFieldVisible('phone') && formData.phone && validateField('phone', formData.phone))
      return false;
    if (
      isFieldVisible('postalCode') &&
      formData.postalCode &&
      validateField('postalCode', formData.postalCode)
    )
      return false;

    return true;
  })();

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {(isFieldVisible('firstName') || isFieldVisible('lastName')) && (
        <div className={styles.row}>
          {isFieldVisible('firstName') && (
            <div className={styles.field}>
              <label htmlFor="firstName">
                First Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                maxLength={50}
                className={errors.firstName && touched.firstName ? styles.inputError : ''}
                aria-invalid={errors.firstName && touched.firstName ? 'true' : 'false'}
                aria-describedby={
                  errors.firstName && touched.firstName ? 'firstName-error' : undefined
                }
              />
              {errors.firstName && touched.firstName && (
                <span id="firstName-error" className={styles.fieldError} role="alert">
                  {errors.firstName}
                </span>
              )}
            </div>
          )}

          {isFieldVisible('lastName') && (
            <div className={styles.field}>
              <label htmlFor="lastName">
                Last Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                maxLength={50}
                className={errors.lastName && touched.lastName ? styles.inputError : ''}
                aria-invalid={errors.lastName && touched.lastName ? 'true' : 'false'}
                aria-describedby={
                  errors.lastName && touched.lastName ? 'lastName-error' : undefined
                }
              />
              {errors.lastName && touched.lastName && (
                <span id="lastName-error" className={styles.fieldError} role="alert">
                  {errors.lastName}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {isFieldVisible('company') && (
        <div className={styles.field}>
          <label htmlFor="company">
            Company <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            maxLength={100}
            className={errors.company && touched.company ? styles.inputError : ''}
            aria-invalid={errors.company && touched.company ? 'true' : 'false'}
            aria-describedby={errors.company && touched.company ? 'company-error' : undefined}
          />
          {errors.company && touched.company && (
            <span id="company-error" className={styles.fieldError} role="alert">
              {errors.company}
            </span>
          )}
        </div>
      )}

      {(isFieldVisible('email') || isFieldVisible('phone')) && (
        <div className={styles.row}>
          {isFieldVisible('email') && (
            <div className={styles.field}>
              <label htmlFor="email">
                Email <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                maxLength={100}
                className={errors.email && touched.email ? styles.inputError : ''}
                aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
              />
              {errors.email && touched.email && (
                <span id="email-error" className={styles.fieldError} role="alert">
                  {errors.email}
                </span>
              )}
            </div>
          )}

          {isFieldVisible('phone') && (
            <div className={styles.field}>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={20}
                placeholder="+1 (555) 123-4567"
                className={errors.phone && touched.phone ? styles.inputError : ''}
                aria-invalid={errors.phone && touched.phone ? 'true' : 'false'}
                aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
              />
              {errors.phone && touched.phone && (
                <span id="phone-error" className={styles.fieldError} role="alert">
                  {errors.phone}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {(isFieldVisible('country') || isFieldVisible('city') || isFieldVisible('postalCode')) && (
        <div className={styles.rowThree}>
          {isFieldVisible('country') && (
            <div className={styles.field}>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                maxLength={50}
                placeholder="United States"
              />
            </div>
          )}

          {isFieldVisible('city') && (
            <div className={styles.field}>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                maxLength={50}
                placeholder="New York"
              />
            </div>
          )}

          {isFieldVisible('postalCode') && (
            <div className={styles.field}>
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={20}
                placeholder="10001"
                className={errors.postalCode && touched.postalCode ? styles.inputError : ''}
                aria-invalid={errors.postalCode && touched.postalCode ? 'true' : 'false'}
                aria-describedby={
                  errors.postalCode && touched.postalCode ? 'postalCode-error' : undefined
                }
              />
              {errors.postalCode && touched.postalCode && (
                <span id="postalCode-error" className={styles.fieldError} role="alert">
                  {errors.postalCode}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {isFieldVisible('topic') && (
        <div className={styles.field}>
          <label htmlFor="topic">Topic</label>
          <select id="topic" name="topic" value={formData.topic} onChange={handleChange}>
            <option value="">Select a topic</option>
            <option value="general">General Inquiry</option>
            <option value="product">Product Information</option>
            <option value="support">Technical Support</option>
            <option value="partnership">Partnership Opportunity</option>
            <option value="other">Other</option>
          </select>
        </div>
      )}

      {isFieldVisible('message') && (
        <div className={styles.field}>
          <label htmlFor="message">
            Message <span className={styles.required}>*</span>
            <span className={styles.charCount}>
              {messageLength}/{MAX_MESSAGE_LENGTH}
              {messageLength > 0 && messageLength < MIN_MESSAGE_LENGTH && (
                <span className={styles.charCountWarning}> (min: {MIN_MESSAGE_LENGTH})</span>
              )}
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            maxLength={MAX_MESSAGE_LENGTH}
            placeholder="Please provide details about your inquiry..."
            className={errors.message && touched.message ? styles.inputError : ''}
            aria-invalid={errors.message && touched.message ? 'true' : 'false'}
            aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
          />
          {errors.message && touched.message && (
            <span id="message-error" className={styles.fieldError} role="alert">
              {errors.message}
            </span>
          )}
        </div>
      )}

      {status === 'success' && (
        <div className={styles.success}>
          Thank you! Your message has been sent successfully. We'll get back to you soon.
        </div>
      )}

      {status === 'error' && (
        <div className={styles.error}>
          {errorMessage || 'Failed to send message. Please try again.'}
        </div>
      )}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={status === 'loading' || !isFormValid}
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? submitButtonLoadingText : submitButtonText}
      </button>

      <p className={styles.recaptchaNotice}>
        This site is protected by reCAPTCHA and the Google{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </a>{' '}
        apply.
      </p>
    </form>
  );
}
