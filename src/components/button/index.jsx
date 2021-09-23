import React from 'react';
import * as styles from './button.module.scss';

const Button = ({
  type = 'button',
  name = 'transparent',
  classNames,
  children,
  ...props
}) => (
  <button
    {...props}
    className={`
      ${classNames}
      ${styles.button}
      ${styles[name]}
    `}
  >
    {children}
  </button>
);

export default Button;
