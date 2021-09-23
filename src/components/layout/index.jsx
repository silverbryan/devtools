import React from 'react';
import { Sidebar, Header } from '@components';
import * as styles from './layout.module.scss';

const Layout = ({ children }) => (
  <div className={styles.siteContainer}>
    <Header />
    <main className={styles.content}>{children}</main>
  </div>
);

export default Layout;
