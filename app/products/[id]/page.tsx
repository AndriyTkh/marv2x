import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import products from '@/public/products.json';
import styles from './product.module.css';

type Product = (typeof products)[0];

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | MARV2X`,
    description: product.description,
    keywords: `${product.name}, environmental sensor, measurement device`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id) as Product | undefined;

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Back Link */}
        <Link href="/products" className={styles.backLink}>
          ← Back to Products
        </Link>

        {/* Product Section */}
        <section className={styles.productSection}>
          {/* Product Image */}
          <div className={styles.imageContainer}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className={styles.image}
            />
          </div>

          {/* Product Info */}
          <div className={styles.infoContainer}>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.description}>{product.description}</p>

            {/* Price */}
            <div className={styles.priceSection}>
              <span className={styles.price}>${product.price.toFixed(2)}</span>
            </div>

            {/* CTA Button */}
            <Link href="/contacts" className={styles.ctaButton}>
              Request a Quote
            </Link>

            {/* Characteristics */}
            <div className={styles.characteristics}>
              <h2 className={styles.charTitle}>Specifications</h2>
              <div className={styles.charGrid}>
                {Object.entries(product.characteristics).map(
                  ([key, value]) => (
                    <div key={key} className={styles.charItem}>
                      <dt className={styles.charLabel}>
                        {key
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/^./, (str) => str.toUpperCase())}
                      </dt>
                      <dd className={styles.charValue}>{value}</dd>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>Related Products</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedImageWrapper}>
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className={styles.relatedImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className={styles.relatedName}>{relatedProduct.name}</h3>
                  <p className={styles.relatedPrice}>
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}