// src/components/UI/Button.js

import React from 'react';
import '../../styles/components.css';

const Button = ({ children, onClick, type = 'button', className = 'btn-primary' }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
