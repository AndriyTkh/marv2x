import styles from './TrustBar.module.css';

export default function TrustBar() {
  const trustItems = [
    'ATEX Zone 1 & 2 certified',
    'Designed for hazardous and wet dust environments',
    'Engineered for high pressure and high temperature',
    'Continuous industrial operation',
  ];

  return (
    <section className={styles.trustBar}>
      <div className={styles.container}>
        <div className={styles.items}>
          {trustItems.map((item, index) => (
            <div key={index} className={styles.item}>
              <span className={styles.checkmark}>✓</span>
              <span className={styles.text}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
