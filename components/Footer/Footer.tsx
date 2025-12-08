import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      href: 'https://www.linkedin.com/in/marvilon-llc-37a153302/',
      label: 'LinkedIn',
      icon: <FaLinkedin />,
    },
    {
      href: 'https://www.youtube.com/watch?v=t4HkFY1hUdY',
      label: 'YouTube',
      icon: <FaYoutube />,
    },
  ];

  const legalLinks: Array<{ label: string; href: string }> = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ];

  const companyInfo = {
    email: 'sergtkh@gmail.com',
    phone: '+380501680880',
    address: 'Kyiv, Bogatyrska street, 1D',
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Row: Logo + Social */}
        <div className={styles.topRow}>
          <div className={styles.logoSection}>
            <Link href="/" className={styles.logoLink}>
              <Image src="/svg/marvilon_logo.svg" alt="Marvilon Logo" width={40} height={40} />
              <span className={styles.logoText}>MARVILON</span>
            </Link>
          </div>

          <div className={styles.social}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                title={link.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className={styles.contentGrid}>
          {/* Contact Info */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contact</h3>
            <div className={styles.contactInfo}>
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
              </p>
              <p>
                <strong>Phone:</strong> <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>
              </p>
              <p>
                <strong>Address:</strong> {companyInfo.address}
              </p>
            </div>
          </div>

          {/* Legal */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Legal</h3>
            <nav className={styles.nav}>
              {legalLinks.map((link) => (
                <Link key={link.label} href={link.href as any}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <hr className={styles.line} />

        {/* Copyright */}
        <p className={styles.copy}>© {year} Marvilon. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
