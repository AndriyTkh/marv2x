import styles from './page.module.css';

export const metadata = {
  title: 'Technology | Marvilon',
  description:
    "Discover Marvilon's cutting-edge optical measurement solutions for industrial process monitoring.",
  keywords:
    'optical measurement, industrial monitoring, gas composition, dust measurement, moisture detection',
};

export default function TechnologyPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Technology Overview</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Advanced Optical Measuring Systems</h2>
          <p className={styles.text}>
            Marvilon develops cutting-edge optical measurement solutions that enable real-time
            monitoring of industrial processes. Our systems are designed to provide accurate and
            reliable data in harsh environments, including metallurgical, petrochemical, oil, and
            fertilizer industries.
          </p>

          <div className={styles.features}>
            <h3 className={styles.featuresTitle}>Key Features:</h3>
            <ul className={styles.featureList}>
              <li>Simultaneous measurement of gas composition, dust, and moisture</li>
              <li>Modular integration of infrared (IR) and visible light optical sensors</li>
              <li>High reliability in wet, explosive, and high-temperature conditions</li>
            </ul>
          </div>

          <div className={styles.imagePlaceholder}>
            <p>Image placeholder: Illustration of the optical measuring cell or system diagram</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Integrated System Design</h2>
          <p className={styles.text}>
            Our technology combines several critical components into a single, compact system:
          </p>

          <ul className={styles.componentList}>
            <li>
              <strong>Optical Measurement Cell:</strong> Designed for precision detection of gases
              and particulates
            </li>
            <li>
              <strong>Sampling Probes:</strong> Engineered for stable operation in challenging
              process streams
            </li>
            <li>
              <strong>Embedded Control & Data Acquisition:</strong> Full remote access, monitoring,
              and data logging capabilities
            </li>
            <li>
              <strong>Robust Mechanical & Electrical Design:</strong> Ensures system stability and
              long-term operation
            </li>
          </ul>

          <div className={styles.imagePlaceholder}>
            <p>Image placeholder: CAD model or 3D rendering of the prototype system</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Prototype Development & Validation</h2>
          <p className={styles.text}>
            The Marvilon team has developed third-generation prototypes using advanced CAD modeling,
            3D printing, and flow simulation techniques. Each unit undergoes rigorous internal
            testing to ensure accuracy and stability before deployment in pilot sites.
          </p>

          <div className={styles.highlights}>
            <h3 className={styles.highlightsTitle}>Prototype Highlights:</h3>
            <ul className={styles.highlightList}>
              <li>Fully integrated system units for field testing</li>
              <li>Iterative calibration and lab validation using certified standards</li>
              <li>
                Optimized optical cell and sampling probe performance for real industrial conditions
              </li>
            </ul>
          </div>

          <div className={styles.imagePlaceholder}>
            <p>Image placeholder: Photo of assembled prototype or lab testing setup</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Field-Ready Deployment</h2>
          <p className={styles.text}>
            Our systems are designed for easy installation and reliable operation in industrial
            environments. Before pilot deployment, prototypes are configured with:
          </p>

          <ul className={styles.componentList}>
            <li>Detailed installation and user manuals</li>
            <li>Remote data acquisition and monitoring software</li>
            <li>Pre-calibrated sensors and safety measures for explosive zones</li>
          </ul>

          <div className={styles.benefits}>
            <h3 className={styles.benefitsTitle}>Benefits for Operators:</h3>
            <ul className={styles.benefitList}>
              <li>Quick deployment and minimal downtime</li>
              <li>Continuous, accurate monitoring of critical process parameters</li>
              <li>Actionable insights for process optimization and compliance</li>
            </ul>
          </div>

          <div className={styles.imagePlaceholder}>
            <p>Image placeholder: Field installation photo or industrial environment graphic</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Certification and Compliance</h2>
          <p className={styles.text}>
            Marvilon systems are engineered with compliance in mind, adhering to international
            standards for industrial safety and monitoring. Our approach ensures that each device
            meets strict performance and safety criteria required for industrial deployment.
          </p>

          <div className={styles.imagePlaceholder}>
            <p>Image placeholder: Certification or compliance icons</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Marvilon Technology?</h2>
          <ul className={styles.whyList}>
            <li>Comprehensive all-in-one solution for gas, dust, and moisture</li>
            <li>Modular, scalable design suitable for multiple industries</li>
            <li>Proven reliability through lab testing and field pilot studies</li>
            <li>Advanced data acquisition for actionable insights and process optimization</li>
          </ul>

          <div className={styles.imagePlaceholder}>
            <p>Image placeholder: Infographic summarizing system benefits</p>
          </div>
        </section>
      </div>
    </main>
  );
}
