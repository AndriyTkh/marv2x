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
            Developing integrated optical measuring systems for continuous industrial process
            automation and emissions monitoring
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
              Founded in Kyiv, Ukraine, MARVILON LLC specializes in developing integrated optical
              measuring systems that enable simultaneous real-time measurement of gases, dust, and
              moisture in hazardous and extreme industrial environments.
            </p>
            <p>
              Our patent-pending technology combines UV/Vis and infrared spectroscopy in a single
              high-pressure optical cell, delivering complete process insight where conventional
              analyzers cannot operate—in wet dust conditions and ATEX Zone 1/2 atmospheres.
            </p>
            <p>
              From optical component development to complete integrated systems, we provide robust
              solutions for continuous process monitoring and emissions compliance in metallurgy,
              petrochemistry, fertilizer production, and energy sectors.
            </p>
          </div>
        </div>

        <div className={styles.highlights}>
          <div className={styles.highlightCard}>
            <h3>Integrated Measurement</h3>
            <p>Simultaneous gas, dust, and moisture monitoring in one system</p>
          </div>
          <div className={styles.highlightCard}>
            <h3>Extreme Environments</h3>
            <p>ATEX certified for hazardous, wet dust, and high-temperature conditions</p>
          </div>
          <div className={styles.highlightCard}>
            <h3>Patent-Pending Technology</h3>
            <p>Advanced optical cell design with UV/Vis and infrared spectroscopy</p>
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
