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
              Marvilon develops integrated optical measuring systems for continuous industrial
              process monitoring. Unlike conventional solutions, our system simultaneously tracks
              gas composition, particulate matter, and moisture in real-time, enabling precise
              process control and regulatory compliance.
            </p>
            <ul className={styles.features}>
              <li>
                Simultaneous multi-parameter measurement (CO, CO₂, NO, NO₂, SO₂, NH₃, CH₄, PM,
                moisture)
              </li>
              <li>Non-dispersive IR (NDIR) and UV/Vis absorption technology</li>
              <li>ATEX Zone 1 & 2 certified for hazardous environments</li>
              <li>Real-time data acquisition with remote monitoring</li>
            </ul>
            <Link href="/history/tech" className={styles.cta}>
              Learn More About Our Technology
            </Link>
          </div>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Advanced Optical Measurement Technology</h2>
            <div className={styles.imageWrapper}>
              <Image
                src="/tech/marv2x_3d_render.jpg"
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
