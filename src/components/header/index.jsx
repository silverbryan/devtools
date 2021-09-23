import React, { useState } from 'react';
import Icon from '@components/icon';
import Logo from '@components/logo';
import Button from '@components/button';
import * as styles from './header.module.scss';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleOnClick = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.container}>
      <nav className={styles.nav}>
        <a className={styles.logo} href='http://yourdevtools.com'>
          <Logo />
        </a>
        <div className={styles.menuButtons}>
          <ButtonSearch />
          <ButtonMenu isActive={menuOpen} onClick={handleOnClick} />
        </div>
      </nav>
    </header>
  );
};

const ButtonMenu = ({ isActive, ...props }) => (
  <Button {...props}>
    <div
      {...props}
      className={`
      ${styles.button} 
      ${isActive ? styles.active : ''}
    `}
    >
      <div className={`${styles.line}`} />
      <div className={`${styles.line}`} />
      <div className={`${styles.line}`} />
    </div>
  </Button>
);

const ButtonSearch = () => (
  <Button style={{ marginRight: '5px' }}>
    <Icon name='search' size={20} />
  </Button>
);
export default Header;
