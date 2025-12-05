import Image from 'next/image';
import Link from 'next/link';
import products from '@/public/products.json';
import styles from './Products.module.css';

interface ProductsProps {
  limit?: number;
  showViewAll?: boolean;
  title?: string;
  description?: string;
}

export default function ProductList({
  limit,
  showViewAll = false,
  title,
  description,
}: ProductsProps) {
  const displayProducts = limit ? products.slice(0, limit) : products;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        {(title || description) && (
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && (
              <p className={styles.description}>{description}</p>
            )}
          </div>
        )}

        {/* Products Grid */}
        <div className={styles.grid}>
          {displayProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className={styles.productCard}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
                <div className={styles.footer}>
                  <span className={styles.price}>
                    ${product.price.toFixed(2)}
                  </span>
                  <span className={styles.arrow}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className={styles.viewAllContainer}>
            <Link href="/products" className={styles.viewAllButton}>
              View All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}