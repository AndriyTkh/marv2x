import Image from 'next/image';
import styles from './TechnicalVisual.module.css';

export default function TechnicalVisual() {
  return (
    <section className={styles.technicalVisual}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Measurement transparency by design</h2>
        </div>

        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <Image
              src="/tech/marv2x_front_view.jpg"
              alt="Marvilon optical cell design showing UV/Vis and IR measurement paths"
              width={800}
              height={600}
              className={styles.image}
            />
            <div className={styles.imageOverlay}>
              <div className={styles.annotation}>
                <span className={styles.annotationDot}></span>
                <span className={styles.annotationText}>UV/Vis Path</span>
              </div>
              <div className={styles.annotation}>
                <span className={styles.annotationDot}></span>
                <span className={styles.annotationText}>IR Path</span>
              </div>
            </div>
          </div>

          <div className={styles.description}>
            <p className={styles.supportingText}>
              Marvilon's optical cell design enables precise, simultaneous measurement directly in
              the process—delivering reliable data where it matters most.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
