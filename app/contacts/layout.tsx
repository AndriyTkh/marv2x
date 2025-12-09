import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Marvilon for inquiries about optical measurement systems, technical support, and industrial monitoring solutions. Expert support for ATEX and CEMS applications.',
  keywords: [
    'contact Marvilon',
    'industrial measurement support',
    'ATEX consultation',
    'CEMS inquiry',
    'optical analyzer support',
    'technical assistance',
    'measurement system inquiry',
  ],
  openGraph: {
    title: 'Contact Marvilon — Industrial Measurement Experts',
    description:
      'Get in touch with Marvilon for technical support, product inquiries, and custom measurement solutions for harsh industrial environments.',
    url: 'https://marvilon.com/contacts',
    type: 'website',
    images: [
      {
        url: '/tech/marv2x_front_view.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Marvilon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Marvilon',
    description: 'Expert support for industrial optical measurement systems and ATEX applications.',
    images: ['/tech/marv2x_front_view.jpg'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
