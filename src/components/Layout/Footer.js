// src/components/Layout/Footer.js

import React from 'react';
import '../../styles/components.css';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Food Delight. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
