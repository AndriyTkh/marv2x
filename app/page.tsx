import Hero from '@/components/Hero/Hero';
import Technology from '@/components/Technology/Technology';
import ProductList from '@/components/Products/Products';
import About from '@/components/About/About';

export const metadata = {
  title: 'MARV2X | Advanced Environmental Measurement Solutions',
  description:
    'Discover MARV2X - cutting-edge environmental measurement devices for precise monitoring of air quality, water conditions, and climate.',
  keywords:
    'environmental sensors, measurement devices, air quality monitor, climate station, sustainable monitoring',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Technology />
      <ProductList
        limit={3}
        showViewAll
        title="Featured Products"
        description="Explore our selection of industry-leading environmental measurement solutions."
      />
      <About />
    </>
  );
}
