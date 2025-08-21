import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Globe3D from '../components/visualizations/Globe3D';
import DataStories from '../components/visualizations/DataStories';
import styles from '../styles/Visualizations.module.css';

const Visualizations = () => {
  const [activeSection, setActiveSection] = useState('globe');
  const [isLoading, setIsLoading] = useState(true);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setWebGLSupported(!!gl);
    
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const navigationItems = [
    { id: 'globe', label: '3D Visualization', icon: '🌍' },
    { id: 'stories', label: 'Data Stories', icon: '📊' }
  ];

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <motion.div 
          className={styles.loadingSpinner}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          🌍
        </motion.div>
        <p>Loading Environmental Visualizations...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Environmental Visualizations - EcoShield</title>
        <meta name="description" content="Interactive 3D environmental data visualization and animated data stories" />
      </Head>

      <div className={styles.container}>
        {/* Navigation Header */}
        <motion.header 
          className={styles.header}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Environmental Visualizations</h1>
            <p className={styles.subtitle}>Explore our planet's environmental data through immersive 3D experiences</p>
          </div>
          
          <nav className={styles.navigation}>
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                className={`${styles.navButton} ${activeSection === item.id ? styles.active : ''}`}
                onClick={() => setActiveSection(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </motion.header>

        {/* Main Content */}
        <main className={styles.main}>
          <AnimatePresence mode="wait">
            {activeSection === 'globe' && (
              <motion.div
                key="globe"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={styles.sectionContainer}
              >
                {webGLSupported ? (
                  <Globe3D />
                ) : (
                  <div className={styles.fallback}>
                    <h3>WebGL Not Supported</h3>
                    <p>Your browser doesn't support WebGL. Please use a modern browser to view 3D visualizations.</p>
                    <div className={styles.fallbackChart}>
                      {/* Static environmental data chart */}
                      <img src="/api/placeholder/600/400" alt="Environmental data chart" />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeSection === 'stories' && (
              <motion.div
                key="stories"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={styles.sectionContainer}
              >
                <DataStories />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer Info */}
        <motion.footer 
          className={styles.footer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p>Data sources: NASA, EPA, NOAA | Updated in real-time</p>
        </motion.footer>
      </div>
    </>
  );
};

export default Visualizations;
