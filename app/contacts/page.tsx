'use client';

import ContactForm from '@/components/ContactForm/ContactForm';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import styles from './page.module.css';

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Marvilon',
            description:
              'Contact Marvilon for inquiries about optical measurement systems, technical support, and industrial monitoring solutions.',
            url: 'https://marvilon.com/contacts',
            mainEntity: {
              '@type': 'Organization',
              name: 'Marvilon LLC',
              email: 'otherbadeng@gmail.com',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                availableLanguage: ['English'],
              },
            },
          }),
        }}
      />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Contact Us</h1>
          <p className={styles.description}>
            Have questions about our products or services? Fill out the form below and we'll get
            back to you as soon as possible.
          </p>
          <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}>
            <ContactForm />
          </GoogleReCaptchaProvider>
        </div>
      </main>
    </>
  );
}
