import React from 'react';
import * as styles from './sidebar.module.css';

const Sidebar = () => (
  <aside className={styles.container}>
    <a className={styles.logo} href='https://yourdevtools.com'>
      <span>YourDevTools</span>
    </a>
  </aside>
);

export default Sidebar;
