import ProductList from '@/components/Products/Products';

export const metadata = {
  title: 'Products | MARV2X',
  description: 'Browse our collection of advanced environmental measurement devices and solutions.',
  keywords: 'environmental sensors, air quality, water monitoring, climate stations',
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
