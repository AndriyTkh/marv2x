import Link from 'next/link';
import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  return (
    <section className={styles.finalCTA}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Let's discuss your measurement challenges</h2>
          <p className={styles.description}>
            Whether your priority is process optimization, emissions compliance, or operating in
            extreme conditions, Marvilon's experts help define the right measurement solution for
            your application.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/contacts" className={styles.ctaPrimary}>
              Talk to a measurement expert
            </Link>
            <Link href="/products" className={styles.ctaSecondary}>
              Request technical documentation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
