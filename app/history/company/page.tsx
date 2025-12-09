import Image from 'next/image';
import styles from './page.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company History',
  description:
    'MARVILON LLC history: from optical component development to complete industrial measurement systems for hazardous environments. Founded in Kyiv, Ukraine.',
  keywords: [
    'MARVILON history',
    'industrial measurement company',
    'optical technology development',
    'ATEX systems',
    'gas analysis history',
    'dust measurement innovation',
    'Ukrainian engineering',
  ],
  openGraph: {
    title: 'Marvilon Company History — From Components to Complete Systems',
    description:
      'Discover how MARVILON evolved from optical component development to building complete measurement systems for wet gas and explosive environments.',
    url: 'https://marvilon.com/history/company',
    type: 'website',
    images: [
      {
        url: '/company/workplace-stock.jpg',
        width: 1200,
        height: 630,
        alt: 'Marvilon Engineering Workplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marvilon Company History',
    description:
      'From optical components to complete industrial measurement systems for hazardous environments.',
    images: ['/company/workplace-stock.jpg'],
  },
};

export default function CompanyHistoryPage() {
  return (
    <main className={styles.main}>
      <div className="container">
        <h1 className={styles.title}>Company History</h1>

        {/* S-1: Foundation - Text left, Image right */}
        <section className={styles.section}>
          <div className={styles.horizontal}>
            <div className={styles.textContent}>
              <h2>Foundation</h2>
              <p>
                MARVILON LLC was founded in Kyiv, Ukraine, with a clear engineering goal: to design
                industrial measurement systems capable of operating where existing solutions fail —
                in high-moisture, high-dust, and hazardous gas environments. From the beginning, the
                company focused on optical technologies and the creation of robust sampling systems
                for continuous process monitoring.
              </p>
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src="/company/workplace-stock.jpg"
                alt="Engineering workplace"
                width={800}
                height={600}
                className={styles.image}
              />
            </div>
          </div>
        </section>

        {/* S-2: Early Development - Image left, Text right */}
        <section className={styles.section}>
          <div className={styles.horizontal}>
            <div className={styles.imageWrapper}>
              <Image
                src="/company/electronics-stock.jpg"
                alt="Electronics development"
                width={800}
                height={600}
                className={styles.image}
              />
            </div>
            <div className={styles.textContent}>
              <h2>Early Development</h2>
              <p>
                The company started by developing optical components and software for gas analysis
                in heavy industry. The early prototypes demonstrated high measurement stability in
                conditions with fluctuating temperature, humidity, and dust loads — a challenge that
                made many commercial analyzers unreliable.
              </p>
            </div>
          </div>
        </section>

        {/* S-3: Expansion - Text left, Image right */}
        <section className={styles.section}>
          <div className={styles.horizontal}>
            <div className={styles.textContent}>
              <h2>Expansion Into Full Measurement Systems</h2>
              <p>
                As customer requests grew, the company transitioned from component development to
                building complete measurement systems. This included:
              </p>
              <ul>
                <li>custom optical cells,</li>
                <li>isokinetic sampling probes,</li>
                <li>signal processing electronics,</li>
                <li>embedded software for real-time data acquisition.</li>
              </ul>
              <p>
                This step allowed MARVILON to deliver fully integrated solutions rather than
                individual modules.
              </p>
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src="/company/welding-stock.jpg"
                alt="Industrial manufacturing"
                width={800}
                height={600}
                className={styles.image}
              />
            </div>
          </div>
        </section>

        {/* S-4: Breakthrough - Full width */}
        <section className={styles.section}>
          <h2>Breakthrough in Wet-Gas and Explosive Environments</h2>
          <p>
            A major milestone was the development of systems capable of stable measurements in wet
            gas environments and ATEX Zone 1/2 atmospheres. Industry partners from metallurgy and
            petrochemicals provided real-world conditions for testing, and the system demonstrated
            reliable results where traditional in-situ devices could not operate.
          </p>
          <p>This led to the creation of the company's flagship technology for:</p>
          <div className={styles.grid}>
            <div className={styles.gridItem}>
              <strong>Dust Measurement</strong>
              <p>in wet, saturated gas flows</p>
            </div>
            <div className={styles.gridItem}>
              <strong>Continuous Monitoring</strong>
              <p>under explosive conditions</p>
            </div>
            <div className={styles.gridItem}>
              <strong>Combined Measurement</strong>
              <p>of particulate matter, moisture, and gas composition</p>
            </div>
          </div>
        </section>

        {/* S-5: Modern Era - Full width */}
        <section className={styles.section}>
          <h2>Modern Era</h2>
          <p>
            Today, MARVILON focuses on industrial optical metrology, advanced sampling systems, and
            integrated monitoring solutions for high-risk and high-load technological processes. The
            company continues to expand its R&D capabilities and build specialized equipment for
            customers in metallurgy, petrochemistry, fertilizer production, and energy sectors.
          </p>
        </section>
      </div>
    </main>
  );
}
