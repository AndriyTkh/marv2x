import Image from 'next/image';
import Link from 'next/link';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>About MARVILON</h2>
          <p className={styles.subtitle}>
            Engineering industrial measurement systems for the most challenging environments
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <Image
              src="/company/workplace-stock.jpg"
              alt="MARVILON engineering workplace"
              width={800}
              height={600}
              className={styles.image}
            />
          </div>
          <div className={styles.textContent}>
            <p>
              Founded in Kyiv, Ukraine, MARVILON LLC specializes in designing industrial measurement
              systems that operate where conventional solutions fail — in high-moisture, high-dust,
              and hazardous gas environments.
            </p>
            <p>
              From optical component development to complete integrated systems, we deliver robust
              solutions for continuous process monitoring in metallurgy, petrochemistry, fertilizer
              production, and energy sectors.
            </p>
            <p>
              Our breakthrough technology enables stable measurements in wet gas environments and
              ATEX Zone 1/2 atmospheres, providing simultaneous monitoring of particulate matter,
              moisture, and gas composition where traditional devices cannot operate.
            </p>
          </div>
        </div>

        <div className={styles.highlights}>
          <div className={styles.highlightCard}>
            <h3>Optical Expertise</h3>
            <p>Advanced NDIR and laser photometry for multi-parameter measurement</p>
          </div>
          <div className={styles.highlightCard}>
            <h3>Industrial Robustness</h3>
            <p>Designed for explosive, wet, and high-dust environments</p>
          </div>
          <div className={styles.highlightCard}>
            <h3>Integrated Solutions</h3>
            <p>Complete systems from sampling probes to data acquisition</p>
          </div>
        </div>

        <div className={styles.cta}>
          <Link href="/history/company" className={styles.ctaButton}>
            Read Our Full Story
          </Link>
        </div>
      </div>
    </section>
  );
}
