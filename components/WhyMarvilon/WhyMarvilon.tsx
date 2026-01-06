import styles from './WhyMarvilon.module.css';

export default function WhyMarvilon() {
  const reasons = [
    {
      title: 'True multi-parameter measurement',
      description: 'Gas, dust, and moisture measured simultaneously in one system',
      icon: '🔬',
    },
    {
      title: 'Designed for extreme environments',
      description: 'High pressure, high temperature, and hazardous areas',
      icon: '🛡️',
    },
    {
      title: 'Lower total cost of ownership',
      description: 'Fewer instruments, reduced maintenance, simplified integration',
      icon: '💰',
    },
    {
      title: 'Engineering-driven innovation',
      description: 'Patent-pending technology developed for real industrial challenges',
      icon: '⚙️',
    },
  ];

  return (
    <section className={styles.whyMarvilon}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why industrial leaders choose Marvilon</h2>
        </div>

        <div className={styles.reasonsGrid}>
          {reasons.map((reason, index) => (
            <div key={index} className={styles.reasonCard}>
              <div className={styles.reasonIcon}>{reason.icon}</div>
              <h3 className={styles.reasonTitle}>{reason.title}</h3>
              <p className={styles.reasonDescription}>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
