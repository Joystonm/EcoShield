import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import styles from '../styles/Navigation.module.css';

const Navigation = () => {
  const router = useRouter();

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/visualizations', label: 'Visualizations', icon: '🌍' },
    { href: '/chat', label: 'AI Assistant', icon: '🤖' },
    { href: '/community', label: 'Community', icon: '👥' }
  ];

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.logoContent}
          >
            <span className={styles.logoIcon}>🛡️</span>
            <span className={styles.logoText}>EcoShield</span>
          </motion.div>
        </Link>

        {/* Navigation Items */}
        <div className={styles.navItems}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={`${styles.navItem} ${
                  router.pathname === item.href ? styles.active : ''
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
                {router.pathname === item.href && (
                  <motion.div
                    className={styles.activeIndicator}
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className={styles.mobileMenuButton}
          whileTap={{ scale: 0.95 }}
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.button>
      </div>
    </nav>
  );
};

export default Navigation;
