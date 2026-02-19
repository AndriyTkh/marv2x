import Image from 'next/image';
import styles from './page.module.css';
import type { Metadata } from 'next';
import ImageGallery from '@/components/ImageGallery/ImageGallery';

export const metadata: Metadata = {
  title: 'Technology & Innovation',
  description:
    'Advanced optical measurement systems for continuous industrial process monitoring with simultaneous gas, dust, and moisture detection. NDIR, UV/Vis, and laser photometry.',
  keywords: [
    'optical measurement technology',
    'NDIR gas analysis',
    'industrial monitoring systems',
    'gas composition analysis',
    'particulate matter detection',
    'ATEX technology',
    'emissions monitoring',
    'isokinetic sampling',
    'laser photometry',
    'UV Vis absorption',
  ],
  openGraph: {
    title: 'Marvilon Technology — Multi-Parameter Optical Measurement',
    description:
      'Simultaneous measurement of CO, CO₂, NO, SO₂, NH₃, CH₄, particulate matter, and moisture using advanced optical technologies for harsh industrial environments.',
    url: 'https://marvilon.com/history/tech',
    type: 'website',
    images: [
      {
        url: '/tech/marv2x_front_view.jpg',
        width: 1200,
        height: 630,
        alt: 'Marvilon Optical Measurement Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marvilon Technology — Advanced Optical Measurement',
    description:
      'Multi-parameter monitoring: gases, dust, and moisture in one system. NDIR, UV/Vis, and laser photometry.',
    images: ['/tech/marv2x_front_view.jpg'],
  },
};

export default function TechnologyPage() {
  return (
    <main className={styles.main}>
      <div className="container">
        <h1 className={styles.title}>Marvilon Technology: Advanced Optical Measurement Systems</h1>

        {/* S-1: Overview - Text left, Image right */}
        <section className={styles.section}>
          <div className={styles.horizontal}>
            <div className={styles.textContent}>
              <h2>Overview</h2>
              <p>
                Marvilon develops integrated optical measuring systems for continuous industrial
                process monitoring. Unlike conventional solutions that measure only gas composition,
                dust, or moisture, our system simultaneously tracks all essential parameters in
                real-time, enabling precise process control and regulatory compliance.
              </p>
            </div>
            <div className={styles.imageWrapper}>
              <ImageGallery
                images={[
                  '/applications/detector_module_1.webp',
                  '/applications/detector_module_2.webp',
                  '/products/dust_monitor.webp',
                ]}
                productName={'Detection module'}
              />
            </div>
          </div>
        </section>

        {/* S-2: Optical Measurement Cell left, Detection limits right */}
        <section className={styles.section}>
          <div className={styles.horizontal}>
            <div className={styles.textContent}>
              <h2>Core Technology Components</h2>
              <h3>1. Optical Measurement Cell</h3>
              <ul>
                <li>
                  <strong>Measures multiple gas species:</strong> CO, CO₂, NO, NO₂, NH₃, CH₄
                </li>
                <li>
                  <strong>Detects particulate matter:</strong> PM1, PM2.5, PM10
                </li>
                <li>
                  <strong>Measures moisture content</strong> in flue gas streams
                </li>
                <li>
                  <strong>Measurement method:</strong> Non-dispersive IR (NDIR) for gases; UV/Vis
                  absorption for reactive species; forward-scattering laser photometry for dust
                </li>
              </ul>
            </div>
            <div className={styles.specs}>
              <h4>Detection limits:</h4>
              <ul>
                <li>Dust (PM): up to 300 mg/m³</li>
                <li>Moisture: up to 40%</li>
                <li>CO: up to 70%</li>
                <li>CO₂: up to 30%</li>
                <li>CH₄: up to 10%</li>
                <li>Other gases: on request</li>
              </ul>

              <p>Optimized optical path for high sensitivity and minimal cross-sensitivity</p>
            </div>
          </div>
        </section>

        {/* S-3: Video centered */}
        <section className={styles.section}>
          <div className={styles.horizontal}>
            <div className={styles.videoWrapper}>
              <video controls className={styles.video}>
                <source src="/video/TechLoop.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <h3>2. Automated calibration</h3>
              <p>
                Automated reference measurement and field calibration with the use of certified
                optical filters scheduled from 1 hour period for 100% guarantee of true
                measurementss
              </p>
            </div>
          </div>
        </section>

        {/* S-4: Image left, Sampling System + Embedded Control right */}
        <section className={styles.section}>
          <div className={styles.horizontal}>
            <div className={styles.textContent}>
              <h3>3. Sampling System</h3>
              <ul>
                <li>
                  High-efficiency isokinetic probes to capture representative samples in high-dust
                  and high-moisture flue gas streams
                </li>
                <li>Purge-controlled channels prevent condensation and optical fouling</li>
                <li>Configured for ATEX Zone 1 & 2 hazardous environments</li>
                <li>
                  <strong>Temperature handling:</strong> -20°C to 200°C; <strong>pressure:</strong>{' '}
                  0.5 – 2 bar
                </li>
              </ul>
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src="/products/zone_1_2.webp"
                alt="Marvilon 3D system render"
                width={800}
                height={600}
                className={styles.image}
              />
            </div>
          </div>
        </section>

        {/* Prototype Development - Horizontal layout */}
        <section className={styles.section}>
          <h2>Prototype Development & Validation</h2>
          <div className={styles.horizontal}>
            <div className={styles.textContent}>
              <h3>Design & Engineering</h3>
              <ul>
                <li>
                  3rd-generation optical cell developed using CAD and computational fluid dynamics
                  (CFD) to optimize flow and minimize particle deposition
                </li>
                <li>
                  Electrical schematics designed for embedded control of sensors, pumps, and purge
                  valves
                </li>
                <li>Modular IR/Vis optical modules for rapid upgrades and maintenance</li>
                <li>Six fully integrated prototypes produced for lab and field testing</li>
              </ul>
            </div>
            <div className={styles.textContent}>
              <h3>Laboratory Testing</h3>
              <ul>
                <li>
                  Conducted using certified gas mixtures and NIST-traceable particulate standards
                </li>
                <li>Calibrated across operational ranges with linear regression verification</li>
                <li>
                  <strong>Environmental tests:</strong> humidity 0–100%, temperature -20°C to 200°C,
                  particulate load up to 500 mg/m³
                </li>
                <li>Validation against DSTU EN 15267:2024 standards for air quality monitoring</li>
              </ul>
            </div>
          </div>
          <div className={styles.horizontal}>
            <div className={styles.textContent}>
              <h3>Embedded Control & Data Acquisition</h3>
              <ul>
                <li>Real-time acquisition of 6 gas species + particulate matter + moisture</li>
                <li>
                  <strong>Sampling frequency:</strong> 1 Hz (1 measurement per second)
                </li>
                <li>
                  Data storage with timestamped logs and remote monitoring via secure web interface
                </li>
                <li>
                  Built-in calibration routines using certified gas standards and optical references
                </li>
              </ul>
            </div>
            <div className={styles.textContent}>
              <h3>Field Deployment</h3>
              <ul>
                <li>Embedded software enables remote acquisition, monitoring, and calibration</li>
                <li>Pilot installations in metallurgical and petrochemical plants</li>
                <li>
                  Continuous operation validated with uptime &gt;99% over 3-month trial period
                </li>
                <li>Rapid fault detection with automated alerts</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why the Technology Works - Horizontal grid */}
        <section className={styles.section}>
          <h2>Why the Technology Works</h2>
          <div className={styles.grid}>
            <div className={styles.gridItem}>
              <strong>Simultaneous Multi-Parameter Measurement</strong>
              <p>Captures all critical emissions and process parameters in one system.</p>
            </div>
            <div className={styles.gridItem}>
              <strong>High Sensitivity & Accuracy</strong>
              <p>
                Detects trace levels of gases and fine particulates with precision suitable for
                regulatory compliance.
              </p>
            </div>
            <div className={styles.gridItem}>
              <strong>Industrial Robustness</strong>
              <p>Designed to operate reliably in explosive, wet, and high-dust environments.</p>
            </div>
            <div className={styles.gridItem}>
              <strong>Modular & Upgradable</strong>
              <p>
                Optical and sampling modules can be swapped or upgraded without redesigning the
                whole system.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
