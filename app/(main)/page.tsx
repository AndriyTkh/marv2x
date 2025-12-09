import Hero from '@/components/Hero/Hero';
import ProductList from '@/components/Products/Products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marvilon — Optical Measurement Systems for Industrial Processes',
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
  openGraph: {
    title: 'Marvilon — Industrial Optical Measurement Systems',
    description:
      'High-precision optical systems for dust, moisture, and gas composition monitoring in heavy industry. Operates in wet, dusty, and explosive environments.',
    url: 'https://marvilon.com',
    type: 'website',
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
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductList
        limit={3}
        showViewAll
        title="Featured Products"
        description="Explore our selection of industry-leading environmental measurement solutions."
      />
    </>
  );
}
