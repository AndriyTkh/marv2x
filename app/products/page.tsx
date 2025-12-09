import ProductList from '@/components/Products/Products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industrial Measurement Products',
  description:
    'Explore Marvilon optical measurement systems for dust, gas, and moisture monitoring in ATEX environments. MARV 2EX and advanced CEMS solutions.',
  keywords: [
    'MARV 2EX',
    'dust monitoring products',
    'gas analyzer systems',
    'ATEX certified equipment',
    'industrial CEMS',
    'optical measurement devices',
    'isokinetic sampling',
    'wet gas analyzer',
  ],
  openGraph: {
    title: 'Marvilon Industrial Measurement Products',
    description:
      'Browse our range of optical measurement systems for continuous monitoring in harsh industrial environments.',
    url: 'https://marvilon.com/products',
    type: 'website',
    images: [
      {
        url: '/tech/marv2x_front_view.jpg',
        width: 1200,
        height: 630,
        alt: 'Marvilon Product Range',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marvilon Industrial Measurement Products',
    description:
      'Browse our range of optical measurement systems for continuous monitoring in harsh industrial environments.',
    images: ['/tech/marv2x_front_view.jpg'],
  },
};

export default function ProductsPage() {
  return (
    <main>
      <ProductList
        title="Our Products"
        description="Explore our range of advanced environmental measurement solutions designed for precision and reliability."
      />
    </main>
  );
}
