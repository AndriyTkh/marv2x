'use client';

import { useState, useEffect } from 'react';
import styles from './Hero.module.css';

const images = [
  '/hero-cycle/stock-0',
  '/hero-cycle/stock-1',
  '/hero-cycle/stock-2',
  '/hero-cycle/stock-3',
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const mainHeading = 'MARVILON';
  const subheading =
    'Integrated Optical measuring systems for continuous industrial process and emissions monitoring.';

  useEffect(() => {
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((i) => (i + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }, 1500);

    return () => clearTimeout(start);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background Images */}
      <div className={styles.backgroundContainer}>
        {images.map((base, index) => (
          <div
            key={base}
            className={`${styles.imageWrapper} ${index !== currentImageIndex ? styles.hidden : ''}`}
          >
            <img
              alt="Environmental monitoring"
              src={`${base} (2).avif`} // fallback (highest)
              srcSet={`
                ${base}.avif 480w,
                ${base}(1).avif 768w,
                ${base}(2).avif 1280w
              `}
              sizes="(max-width: 768px) 100vw, 1200px"
              fetchPriority={index === 0 ? 'high' : 'auto'}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className={styles.backgroundImage}
            />

            {/* <Image
              alt="Environmental monitoring"
              fill
              fetchPriority={index === 0 ? 'high' : 'auto'}
              loading={index === 0 ? 'eager' : 'lazy'}
              sizes="(max-width: 768px) 100vw, 1200px"
              src={`${base} (2).avif`}
              className={styles.backgroundImage}
            /> */}
          </div>
        ))}
        <div className={styles.overlay} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.container}>
          <h1 className={styles.title}>{mainHeading}</h1>
          <p className={styles.catchPhrase}>{subheading}</p>

          <div className={styles.benefits}>
            <ul className={styles.benefitsList}>
              <li>One system for complete process insight</li>
              <li>Real-time multi-parameter measurement</li>
              <li>ATEX Zone 1 & 2 certified for hazardous areas</li>
            </ul>
          </div>

          <div className={styles.ctaGroup}>
            <a href="/contacts" className={styles.ctaPrimary}>
              Talk to a measurement expert
            </a>
            <a href="/history/tech" className={styles.ctaSecondary}>
              Explore the technology
            </a>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className={styles.indicators}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentImageIndex ? styles.active : ''}`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Show image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
