import Link from 'next/link';
import Image from 'next/image';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'High-pressure optical cell',
      description:
        'At the core of the system is a robust high-pressure optical cell engineered for high temperature, high pressure, and high sample flow rates.',
    },
    {
      number: '2',
      title: 'UV/Vis and infrared spectroscopy',
      description:
        'By combining UV/Vis and non-dispersive infrared (NDIR) absorption, the system measures across visible and infrared ranges within a single optical path.',
    },
    {
      number: '3',
      title: 'Simultaneous multi-parameter detection',
      description:
        'This enables concurrent measurement of CO, CO₂, NO, NO₂, SO₂, NH₃, CH₄, particulate matter, and moisture — without switching instruments or sampling delays.',
    },
    {
      number: '4',
      title: 'Real-time data and remote monitoring',
      description:
        'Measurement data is available continuously and in real time, supporting process control, optimization, and emissions compliance, locally and remotely.',
    },
  ];

  return (
    <section className={styles.howItWorks}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Optical measurement designed for extreme industrial conditions
          </h2>
        </div>

        <div className={styles.content}>
          <div className={styles.stepsContainer}>
            {steps.map((step, index) => (
              <div key={index} className={styles.step}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.imageContainer}>
            <Image
              src="/products/zone_1_3.png"
              alt="Marvilon optical measurement system technical diagram"
              width={600}
              height={450}
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.cta}>
          <Link href="/history/tech" className={styles.ctaButton}>
            Explore the technology in detail
          </Link>
        </div>
      </div>
    </section>
  );
}
