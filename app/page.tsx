import Hero from '@/components/Hero/Hero';
import TrustBar from '@/components/TrustBar/TrustBar';
import ProblemSolution from '@/components/ProblemSolution/ProblemSolution';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import KeyCapabilities from '@/components/KeyCapabilities/KeyCapabilities';
import Applications from '@/components/Applications/Applications';
import Compliance from '@/components/Compliance/Compliance';
import WhyMarvilon from '@/components/WhyMarvilon/WhyMarvilon';
import Technology from '@/components/Technology/Technology';
import ProductList from '@/components/Products/Products';
import About from '@/components/About/About';
import FinalCTA from '@/components/FinalCTA/FinalCTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Integrated Optical Measuring Systems | Industrial Process & Emissions Monitoring | Marvilon',
  description:
    'Marvilon develops advanced optical measurement solutions that simultaneously monitor gases, dust, and moisture in real time. ATEX Zone 1 & 2 certified for hazardous industrial environments.',
  keywords: [
    'integrated optical measuring systems',
    'industrial process monitoring',
    'emissions monitoring',
    'optical measurement solutions',
    'gas dust moisture monitoring',
    'ATEX Zone 1 Zone 2 certified',
    'continuous industrial measurement',
    'multi-parameter measurement',
    'industrial optical systems',
    'process control measurement',
    'hazardous environment monitoring',
    'real-time measurement systems',
  ],
  openGraph: {
    title: 'Integrated Optical Measuring Systems for Industrial Process Monitoring | Marvilon',
    description:
      'Advanced optical measurement solutions for simultaneous gas, dust, and moisture monitoring in hazardous industrial environments. ATEX certified for continuous operation.',
    url: 'https://marvilon.com',
    type: 'website',
    images: [
      {
        url: '/tech/marv2x_front_view.jpg',
        width: 1200,
        height: 630,
        alt: 'Marvilon Integrated Optical Measurement System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Integrated Optical Measuring Systems | Industrial Process Monitoring',
    description:
      'Advanced optical measurement solutions for continuous industrial process and emissions monitoring in hazardous environments.',
    images: ['/tech/marv2x_front_view.jpg'],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProblemSolution />
      <HowItWorks />
      {/* <Technology /> */}
      {/* <KeyCapabilities /> */}
      <Applications />
      <Compliance />
      <About />
      <WhyMarvilon />
      <ProductList
        limit={3}
        showViewAll
        title="Featured Products"
        description="Explore our selection of industry-leading environmental measurement solutions."
      />
      <FinalCTA />
    </>
  );
}
