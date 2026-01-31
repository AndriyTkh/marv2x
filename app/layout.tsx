import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://marvilon.com'),
  title: {
    default: 'Marvilon — Optical Measurement Systems for Industrial Processes',
    template: '%s | Marvilon',
  },
  description:
    'Advanced optical systems for dust, moisture, and gas monitoring in harsh industrial environments, including wet gas and ATEX Zone 1/2 applications.',
  keywords: [
    'optical measuring cell',
    'industrial gas analyzer',
    'dust monitoring system',
    'wet gas measurement',
    'ATEX Zone 1',
    'ATEX Zone 2',
    'CO CO2 CH4 monitoring',
    'industrial CEMS',
    'optical particle measurement',
    'isokinetic sampling system',
    'continuous emission monitoring',
  ],
  authors: [{ name: 'Marvilon LLC' }],
  creator: 'Marvilon LLC',
  publisher: 'Marvilon LLC',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://marvilon.com',
    siteName: 'Marvilon',
    title: 'Marvilon — Industrial Optical Measurement Systems',
    description:
      'High-precision optical systems for dust, moisture, and gas composition monitoring in heavy industry. Operates in wet, dusty, and explosive environments.',
    images: [
      {
        url: '/tech/marv2x_front_view.jpg',
        width: 1200,
        height: 630,
        alt: 'Marvilon Optical Measurement System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marvilon — Optical Monitoring for Industrial Processes',
    description: 'Advanced optical measurement technologies for harsh industrial environments.',
    images: ['/tech/marv2x_front_view.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/svg/marvilon_logo.svg',
    apple: '/svg/marvilon_logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header /> {/* Could be server component since no toggle needed */}
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
