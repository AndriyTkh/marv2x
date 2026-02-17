import Link from 'next/link';
import styles from './Applications.module.css';

export default function Applications() {
  const industries = [
    {
      name: 'Power generation',
      icon: '⚡',
    },
    {
      name: 'Cement and mineral processing',
      icon: '🏭',
    },
    {
      name: 'Chemical and petrochemical industries',
      icon: '⚗️',
    },
    {
      name: 'Metals and steel production',
      icon: '🔩',
    },
    {
      name: 'Waste-to-energy and thermal processes',
      icon: '♻️',
    },
    {
      name: 'Industrial combustion systems',
      icon: '🔥',
    },
  ];

  return (
    <section className={styles.applications}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Designed for demanding industrial applications</h2>
          <p className={styles.subtitle}>
            Marvilon's integrated optical measuring systems are ideal for industries where process
            stability, safety, and emissions compliance are critical:
          </p>
        </div>

        <div className={styles.industriesGrid}>
          {industries.map((industry, index) => (
            <div key={index} className={styles.industryCard}>
              <div className={styles.industryIcon}>{industry.icon}</div>
              <h3 className={styles.industryName}>{industry.name}</h3>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <Link href="/applications" className={styles.ctaButton}>
            View applications →
          </Link>
        </div>
      </div>
    </section>
  );
}
