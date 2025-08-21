import React from 'react';
import Navigation from './Navigation';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
