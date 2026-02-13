'use client';

import { useState, useEffect } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const mainHeading = 'MARVILON';
  const subheading =
    'Integrated Optical measuring systems for continuous industrial process and emissions monitoring.';
  return (
    <section className={styles.hero}>
      {/* BG Video */}
      <div className={styles.backgroundContainer}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src="/video/MainLoop.webm"
          className={styles.bgVideo}
        ></video>

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
    </section>
  );
}
