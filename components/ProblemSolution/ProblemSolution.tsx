import Link from 'next/link';
import Image from 'next/image';
import styles from './ProblemSolution.module.css';

export default function ProblemSolution() {
  return (
    <section className={styles.problemSolution}>
      <div className={styles.container}>
        {/* Problem Section */}
        <div className={styles.problemSection}>
          <h2 className={styles.sectionTitle}>Why conventional measurement solutions fall short</h2>

          <div className={styles.whyContainer}>
            <p className={styles.problemDescription}>
              Most industrial measurement solutions on the market are designed to monitor only one
              parameter at a time, such as gas composition, dust, or moisture. To achieve full
              process visibility, operators are forced to install multiple separate analyzers—each
              with its own cost, maintenance requirements, and limitations.
            </p>

            <div className={styles.problemList}>
              <h3 className={styles.listTitle}>This fragmented approach results in:</h3>
              <ul className={styles.list}>
                <li>Higher capital and lifecycle costs</li>
                <li>Increased maintenance effort and downtime</li>
                <li>Complex system integration</li>
                <li>Limited performance in hazardous or wet dust applications</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Solution Section */}
        <div className={styles.solutionSection}>
          <h2 className={styles.sectionTitle}>A new approach to industrial measurement</h2>
          <p className={styles.solutionDescription}>
            Marvilon offers a patent-pending, all-in-one optical measuring system that replaces
            multiple standalone instruments with a single integrated solution.
          </p>
          <p className={styles.solutionDescription}>
            By combining gas, dust, and moisture measurement in one ATEX-compliant system, Marvilon
            significantly reduces total cost of ownership—eliminating the need for multiple devices,
            duplicated maintenance, and complex installations. The solution is specifically designed
            for wet dust and hazardous environments, where conventional analyzers often fail.
          </p>
        </div>

        {/* Marvilon Solution Highlight */}
        <div className={styles.highlight}>
          <h2 className={styles.highlightTitle}>
            One integrated optical system. Complete process insight.
          </h2>
          <div className={styles.highlightContainer}>
            <div className={styles.dustMonitorImage}>
              <Image
                src="/products/dust_monitor.webp"
                alt="Marvilon dust monitor system"
                width={1200}
                height={800}
                className={styles.productImage}
              />
            </div>
            <div>
              <p className={styles.highlightDescription}>
                Marvilon delivers integrated optical measurement that brings all critical process
                and emissions parameters into a single system.{' '}
                <strong>
                  By simultaneously measuring gases, particulate matter, and moisture within the
                  process itself,
                </strong>{' '}
                the solution provides continuous, real-time visibility without compromise.
              </p>
              <p className={styles.highlightDescription}>
                Unlike conventional analyzers, Marvilon’s system performs{' '}
                <strong>
                  true multi-parameter measurement — tracking dust, gases, and humidity at the same
                  time in one unified platform.
                </strong>{' '}
                This enables precise process control, improved efficiency, and reliable compliance
                monitoring.
              </p>
            </div>
          </div>

          <Link href="/history/tech" className={styles.cta}>
            See how it works →
          </Link>
        </div>
      </div>
    </section>
  );
}
