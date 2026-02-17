import styles from './Compliance.module.css';

export default function Compliance() {
  const complianceFeatures = [
    {
      title: 'Continuous emissions data without gaps',
      description: 'Uninterrupted monitoring ensures complete regulatory compliance records',
    },
    {
      title: 'High reliability in wet dust and harsh conditions',
      description: 'Proven performance where conventional analyzers fail',
    },
    {
      title: 'Automated calibration',
      description:
        'Automated reference measurement and field calibration using certified optical filters, scheduled hourly for guaranteed accuracy.',
    },
    {
      title: 'Supports audit readiness and regulatory confidence',
      description: 'Comprehensive data logging and reporting capabilities',
    },
  ];

  return (
    <section className={styles.compliance}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Reliable data for confident compliance</h2>
          <p className={styles.subtitle}>
            Accurate and continuous measurement is essential for meeting regulatory requirements.
            Marvilon's system is designed to support emissions monitoring and compliance reporting
            in hazardous and regulated environments.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {complianceFeatures.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <span className={styles.checkmark}>✓</span>
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
