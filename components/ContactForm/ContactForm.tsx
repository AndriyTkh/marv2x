'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import styles from './ContactForm.module.css';

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

// Validation patterns
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\-\+\(\)]+$/;
const POSTAL_CODE_REGEX = /^[A-Za-z0-9\s\-]+$/;
const NAME_REGEX = /^[a-zA-Z\s\-']+$/;

// Helper function to load initial form data from localStorage
const getInitialFormData = (): FormData => {
  if (typeof window === 'undefined') {
    return {
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
  }

  try {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error('Failed to load form data from localStorage:', error);
  }

  return {
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
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(getInitialFormData);

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formLoadTime = useRef<number>(Date.now());
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error('Failed to save form data to localStorage:', error);
    }
  }, [formData]);

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
    let isValid = true;

    // Validate required fields
    const requiredFields: (keyof FormErrors)[] = [
      'firstName',
      'lastName',
      'company',
      'email',
      'message',
    ];

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    // Validate optional fields if they have values
    if (formData.phone) {
      const phoneError = validateField('phone', formData.phone);
      if (phoneError) {
        newErrors.phone = phoneError;
        isValid = false;
      }
    }

    if (formData.postalCode) {
      const postalError = validateField('postalCode', formData.postalCode);
      if (postalError) {
        newErrors.postalCode = postalError;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation for touched fields
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    );
    setTouched(allTouched);

    // Validate all fields
    if (!validateForm()) {
      setStatus('error');
      setErrorMessage('Please fix the errors in the form before submitting');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Honeypot check
    if (honeypot) {
      setStatus('error');
      setErrorMessage('Invalid submission detected');
      return;
    }

    // Time-based check
    const timeSinceLoad = Date.now() - formLoadTime.current;
    if (timeSinceLoad < 3000) {
      setStatus('error');
      setErrorMessage('Please take your time filling out the form');
      return;
    }

    // Get reCAPTCHA token
    if (!executeRecaptcha) {
      setStatus('error');
      setErrorMessage('reCAPTCHA not loaded. Please refresh the page.');
      return;
    }

    try {
      const recaptchaToken = await executeRecaptcha('contact_form');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
          timestamp: Date.now(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');

      // Clear form data
      setFormData({
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
      });
      setErrors({});
      setTouched({});
      formLoadTime.current = Date.now();

      // Clear localStorage backup
      try {
        localStorage.removeItem(FORM_STORAGE_KEY);
      } catch (error) {
        console.error('Failed to clear form data from localStorage:', error);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  const messageLength = formData.message.length;
  const hasErrors = Object.keys(errors).some((key) => errors[key as keyof FormErrors]);
  const isFormValid =
    !hasErrors &&
    formData.firstName &&
    formData.lastName &&
    formData.company &&
    formData.email &&
    formData.message;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Honeypot field */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className={styles.row}>
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
            aria-describedby={errors.firstName && touched.firstName ? 'firstName-error' : undefined}
          />
          {errors.firstName && touched.firstName && (
            <span id="firstName-error" className={styles.fieldError} role="alert">
              {errors.firstName}
            </span>
          )}
        </div>

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
            aria-describedby={errors.lastName && touched.lastName ? 'lastName-error' : undefined}
          />
          {errors.lastName && touched.lastName && (
            <span id="lastName-error" className={styles.fieldError} role="alert">
              {errors.lastName}
            </span>
          )}
        </div>
      </div>

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

      <div className={styles.row}>
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
      </div>

      <div className={styles.rowThree}>
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
      </div>

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
        {status === 'loading' ? 'Sending...' : 'Send Message'}
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
