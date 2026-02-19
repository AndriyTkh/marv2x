import Image from 'next/image';
import styles from './page.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BOF Stack Applications',
  description:
    'MARV 2Ex wet gas extractive dust monitor system for Basic Oxygen Furnace stack monitoring in explosive atmospheres with ATEX compliance.',
  keywords: [
    'BOF stack monitoring',
    'dust monitor',
    'ATEX Zone 1',
    'wet gas monitoring',
    'explosive atmosphere',
    'isokinetic sampling',
    'steel production',
    'particulate monitoring',
  ],
};

export default function ApplicationsPage() {
  return (
    <main className={styles.main}>
      <div className="container">
        <h1 className={styles.title}>BOF Stack Applications</h1>
        <p className={styles.subtitle}>Wet gas extractive dust monitor system MARV 2Ex</p>

        {/* Section 1: Application Purpose */}
        <section className={styles.section}>
          <h2>1. Application Purpose</h2>
          <div className={styles.horizontal}>
            <div className={styles.textContent}>
              <p>
                Basic Oxygen Process (BOP), also known as Linz-Donawitz (LD) process, is one of the
                main metallurgical production methods since the late 1940s. Today BOF furnaces
                produce more than 50% of the world's steel.
              </p>
              <p>
                Besides steel, the process generates slag and exhaust gas. While conventional
                analyzers measure gas components such as CO, CO₂ and O₂, MARV 2Ex measures another
                critical component — dust — even in wet gas and explosive atmosphere conditions.
              </p>
              <p>
                MARV 2Ex is designed for continuous particulate monitoring in BOF stack applications
                in compliance with ATEX requirements.
              </p>
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src="/products/zone_1_2.webp"
                alt="MARV 2Ex system overview"
                width={800}
                height={600}
                className={styles.image}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Process Characteristics */}
        <section className={styles.section}>
          <h2>2. Process Characteristics</h2>
          <div className={styles.horizontal}>
            <div className={styles.textContent}>
              <p>
                The BOF process is batch-based and highly fluctuating. Process parameters can change
                drastically within 40–50 minutes.
              </p>
              <p>
                For example, CO concentration may increase from 0% up to 50–60% during one batch
                cycle.
              </p>
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src="/applications/CO_concentration.webp"
                alt="CO concentration in % of volume during the day"
                width={800}
                height={600}
                className={styles.image}
              />
              <p className={styles.caption}>
                Pic 1. CO concentration in % of volume during the day
              </p>
            </div>
          </div>

          <div className={styles.specs}>
            <h4>Typical BOF exhaust gas composition and parameters</h4>
            <ul>
              <li>CO – 55–60 %</li>
              <li>CO₂ – 12–18 %</li>
              <li>O₂ – 0.1–0.3 %</li>
              <li>Balanced with N₂</li>
            </ul>
            <ul>
              <li>Gas temperature: ~60 °C (in flue)</li>
              <li>Gas velocity: 20–35 m/s</li>
              <li>Relative humidity: 100 % (wet gas)</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Main Application Challenges */}
        <section className={styles.section}>
          <h2>3. Main Application Challenges</h2>
          <p>BOF stack monitoring presents several critical challenges:</p>
          <ul className={styles.challengeList}>
            <li>High concentration of potentially explosive gases (CO)</li>
            <li>100 % dew point (wet gas after scrubber)</li>
            <li>Strongly fluctuating temperature</li>
            <li>Strongly fluctuating process flow</li>
          </ul>

          <div className={styles.horizontal}>
            <div className={styles.imageWrapper}>
              <Image
                src="/applications/day_flow.webp"
                alt="Flow during the day"
                width={800}
                height={600}
                className={styles.image}
              />
              <p className={styles.caption}>Pic 3. Flow during the day</p>
            </div>
          </div>

          <div className={styles.highlight}>
            <p>
              Most Ex-proof dust monitors are not suitable for wet gas. Most extractive dust
              monitors are not certified for explosive atmospheres.
            </p>
            <p>
              <strong>MARV 2Ex combines both capabilities.</strong>
            </p>
          </div>
        </section>

        {/* Section 4: Application Solution */}
        <section className={styles.section}>
          <h2>4. Application Solution – MARV 2Ex Configuration</h2>
          <div className={styles.horizontal}>
            <div className={styles.imageWrapper}>
              <Image
                src="/applications/marv_overview.webp"
                alt="MARV 2EX system overview"
                width={800}
                height={600}
                className={styles.image}
              />
              <p className={styles.caption}>Pic 4. MARV 2EX system overview</p>
            </div>
            <div className={styles.textContent}>
              <h3>For BOF stack applications MARV 2Ex operates with:</h3>
              <ul>
                <li>Nitrogen (N₂) heated sampling probe</li>
                <li>N₂ purged optical sensor module</li>
                <li>Positive pressure N₂ purged enclosure</li>
                <li>PLC-controlled isokinetic sampling</li>
              </ul>
            </div>
          </div>

          <div className={styles.specs}>
            <h4>This configuration ensures:</h4>
            <ul>
              <li>Safe operation in ATEX Zone 1 / Zone 2</li>
              <li>Sample heating above dew point at all conditions</li>
              <li>Prevention of CO/O₂ leakage into enclosure</li>
              <li>Accurate isokinetic sampling under fluctuating flow</li>
            </ul>
            <p>Dust measurement is based on optical forward scattering principle.</p>
          </div>
        </section>

        {/* Section 5: Typical Dust Levels */}
        <section className={styles.section}>
          <h2>5. Typical Dust Levels</h2>
          <div className={styles.horizontal}>
            <div className={styles.textContent}>
              <p>
                Continuous monitoring allows reliable tracking of dust concentration during batch
                cycles.
              </p>
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src="/applications/dust_concentration.webp"
                alt="Dust concentration"
                width={800}
                height={600}
                className={styles.image}
              />
              <p className={styles.caption}>Picture 5 – Dust concentration</p>
            </div>
          </div>
        </section>

        {/* Section 6: Calibration and Compliance */}
        <section className={styles.section}>
          <h2>6. Calibration and Compliance</h2>
          <p>
            MARV 2EX is calibrated against Standard Reference Method (SRM) according to EN
            13284-2:2004.
          </p>
          <p>All values are normalized to:</p>
          <ul className={styles.normalizedList}>
            <li>Temperature = 275.15 K</li>
            <li>Pressure = 1013 hPa</li>
          </ul>

          <div className={styles.horizontal}>
            <div className={styles.imageWrapper}>
              <Image
                src="/applications/parallel_measurement_1.webp"
                alt="Factory calibration"
                width={800}
                height={600}
                className={styles.image}
              />
              <p className={styles.caption}>
                Picture 6. Parallel measurements of the MARV 2EX and SRM. Factory calibration
              </p>
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src="/applications/parallel_measurement_2.webp"
                alt="Corrected calibration"
                width={800}
                height={600}
                className={styles.image}
              />
              <p className={styles.caption}>
                Picture 7. Parallel measurements of the MARV 2EX and SRM. Corrected calibration
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Other Suitable Applications */}
        <section className={styles.section}>
          <h2>7. Other Suitable Applications</h2>
          <p>In addition to BOF stack monitoring, MARV 2Ex can be used for:</p>
          <div className={styles.grid}>
            <div className={styles.gridItem}>
              <strong>Blast Furnace Gas Monitoring</strong>
            </div>
            <div className={styles.gridItem}>
              <strong>Electric Arc Furnace Gas Monitoring</strong>
            </div>
            <div className={styles.gridItem}>
              <strong>Other Wet and Potentially Explosive Gas Processes</strong>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
