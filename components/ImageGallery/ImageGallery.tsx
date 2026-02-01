'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ImageGallery.module.css';
import blurMap from '@/blur.json';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const typedBlurMap = blurMap as Record<string, string>;

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.mainImageContainer}>
      <Image
        src={images[selectedIndex]}
        alt={`${productName} - Image ${selectedIndex + 1}`}
        fill
        priority
        className={styles.mainImage}
      />
      {/* <Image
        src={images[selectedIndex]}
        alt={`${productName} - Image ${selectedIndex + 1}`}
        fill
        placeholder="blur"
        blurDataURL={typedBlurMap[images[selectedIndex]]}
        sizes="(max-width: 768px) 100vw, 600px"
        className={styles.mainImage}
        priority
      /> */}

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className={`${styles.navButton} ${styles.prevButton}`}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className={`${styles.navButton} ${styles.nextButton}`}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className={styles.imageCounter}>
          {selectedIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
