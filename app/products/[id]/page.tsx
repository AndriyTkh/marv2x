import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import products from '@/public/products.json';
import ImageGallery from '@/components/ImageGallery/ImageGallery';
import styles from './product.module.css';

type Product = (typeof products)[0];

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | MARV2X`,
    description: product.shortDescription,
    keywords: `${product.name}, ${product.certifications.join(', ')}, environmental sensor, measurement device`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id) as Product | undefined;

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Back Link */}
        <Link href="/products" className={styles.backLink}>
          ← Back to Products
        </Link>

        {/* Product Section */}
        <section className={styles.productSection}>
          {/* Product Image Gallery */}
          <div className={styles.imageContainer}>
            <ImageGallery images={product.imageUrls} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className={styles.infoContainer}>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.description}>{product.longDescription}</p>

            {/* Price */}
            {product.price && (
              <div className={styles.priceSection}>
                <span className={styles.price}>{product.price}</span>
              </div>
            )}

            {/* CTA Button */}
            <Link href="/contacts" className={styles.ctaButton}>
              Request a Quote
            </Link>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className={styles.characteristics}>
                <h2 className={styles.charTitle}>Key Features</h2>
                <ul className={styles.featureList}>
                  {product.features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Applications */}
            {product.applications && product.applications.length > 0 && (
              <div className={styles.characteristics}>
                <h2 className={styles.charTitle}>Applications</h2>
                <div className={styles.applicationsList}>
                  {product.applications.map((app, index) => (
                    <div key={index} className={styles.applicationItem}>
                      <h3 className={styles.applicationProcess}>{app.process}</h3>
                      <p className={styles.applicationDescription}>{app.description}</p>
                      {'conditions' in app && app.conditions && (
                        <div className={styles.conditions}>
                          <strong>Conditions:</strong>
                          <ul className={styles.conditionsList}>
                            {Object.entries(app.conditions).map(([key, value]) => (
                              <li key={key}>
                                {key
                                  .replace(/([A-Z])/g, ' $1')
                                  .replace(/^./, (str) => str.toUpperCase())}
                                : {String(value)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div className={styles.characteristics}>
                <h2 className={styles.charTitle}>Certifications</h2>
                <div className={styles.certificationsList}>
                  {product.certifications.map((cert, index) => (
                    <span key={index} className={styles.certificationBadge}>
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
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
                      src={relatedProduct.imageUrls[0] || '/hero-cycle/stock-0.jpg'}
                      alt={relatedProduct.name}
                      fill
                      className={styles.relatedImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className={styles.relatedName}>{relatedProduct.name}</h3>
                  {relatedProduct.price && (
                    <p className={styles.relatedPrice}>{relatedProduct.price}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
