'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/hero-cycle/stock-0.jpg',
    '/hero-cycle/stock-1.jpg',
    '/hero-cycle/stock-2.jpg',
    '/hero-cycle/stock-3.jpg',
    '/hero-cycle/stock-4.jpg',
  ];

  const catchPhrase = 'Advanced Environmental Measurement Solutions for a Sustainable Future';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        return (prev + 1) % images.length;
      });
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className={styles.hero}>
      {/* Background Image with Overlay */}
      <div className={styles.backgroundContainer}>
        {images.map((image, index) => {
          return (
            <div
              key={image}
              className={`${styles.imageWrapper} ${index !== currentImageIndex ? styles.hidden : ''}`}
            >
              <Image
                src={image}
                alt="Environmental monitoring"
                fill
                priority={index === currentImageIndex}
                quality={75}
                className={`${styles.backgroundImage}`}
              />
            </div>
          );
        })}
        <div className={styles.overlay} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.container}>
          <h1 className={styles.title}>MARV2X</h1>
          <p className={styles.catchPhrase}>{catchPhrase}</p>
          <a href="/products" className={styles.cta}>
            Explore Products
          </a>
        </div>
      </div>

      {/* Image Indicators */}
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
