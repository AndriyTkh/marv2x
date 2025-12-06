import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | MARV2X',
  description:
    'Get in touch with MARV2X for inquiries about our environmental measurement solutions. Contact our team for product information, technical support, and partnership opportunities.',
  keywords: [
    'contact MARV2X',
    'environmental sensors inquiry',
    'technical support',
    'product information',
    'partnership opportunities',
  ],
  openGraph: {
    title: 'Contact Us | MARV2X',
    description:
      'Get in touch with MARV2X for inquiries about our environmental measurement solutions.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
