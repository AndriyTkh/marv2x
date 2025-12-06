'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/history/company', label: 'History' },
    { href: '/contacts', label: 'Contacts' },
  ] as const;

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          🌿 EcoMeasure
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? styles.active : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`${styles.mobileMenuBtn} ${mobileMenuOpen ? styles.active : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? styles.active : ''}
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
