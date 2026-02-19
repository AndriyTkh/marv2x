import Link from 'next/link';
import Image from 'next/image';
import styles from './Technology.module.css';

export default function Technology() {
  return (
    <section className={styles.technology}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.textContent}>
            <p className={styles.description}>
              Marvilon's integrated optical measuring systems deliver simultaneous multi-parameter
              measurement in a single device. Our patent-pending technology combines UV/Vis and
              infrared spectroscopy to monitor gases, dust, and moisture in real-time—even in
              hazardous and wet dust environments where conventional analyzers fail.
            </p>
            <ul className={styles.features}>
              <li>
                Integrated measurement of CO, CO₂, NO, NO₂, NH₃, CH₄, particulate matter, and
                moisture
              </li>
              <li>High-pressure optical cell engineered for extreme industrial conditions</li>
              <li>ATEX Zone 1 & 2 certified for hazardous environments</li>
              <li>Continuous operation with remote monitoring and data acquisition</li>
            </ul>
            <Link href="/history/tech" className={styles.cta}>
              Learn More About Our Technology
            </Link>
          </div>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Optical Measurement Technology</h2>
            <div className={styles.imageWrapper}>
              <Image
                src="/products/zone_2_3.webp"
                alt="Marvilon optical measurement system"
                width={600}
                height={450}
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
