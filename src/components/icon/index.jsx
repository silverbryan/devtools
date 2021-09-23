import React from 'react';
import * as Icons from '@components/_icons';

const Icon = ({ name = 'def', size = 25, visible = true, ...props }) => {
  const ComponentToRender = Icons[name];
  return (
    <i
      style={{
        ...props,
        display: visible ? 'inline-block' : 'none',
        width: size,
        height: size,
      }}
    >
      <ComponentToRender />
    </i>
  );
};

export default Icon;
