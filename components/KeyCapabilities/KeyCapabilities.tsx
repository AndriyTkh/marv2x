import styles from './KeyCapabilities.module.css';

export default function KeyCapabilities() {
  const measuredComponents = [
    'CO, CO₂',
    'NO, NO₂',
    'SO₂',
    'NH₃',
    'CH₄',
    'Particulate matter (PM)',
    'Moisture',
  ];

  const systemCapabilities = [
    'Integrated UV/Vis and NDIR absorption technology',
    'High-pressure optical cell for harsh conditions',
    'ATEX Zone 1 & 2 certified',
    'Continuous, real-time measurement',
    'Remote monitoring and data acquisition',
  ];

  return (
    <section className={styles.keyCapabilities}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>What the system measures</h2>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Measured components:</h3>
            <div className={styles.componentGrid}>
              {measuredComponents.map((component, index) => (
                <div key={index} className={styles.component}>
                  <span className={styles.componentIcon}>⚗️</span>
                  <span className={styles.componentText}>{component}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>System capabilities:</h3>
            <ul className={styles.capabilityList}>
              {systemCapabilities.map((capability, index) => (
                <li key={index} className={styles.capability}>
                  <span className={styles.checkmark}>✓</span>
                  <span className={styles.capabilityText}>{capability}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
