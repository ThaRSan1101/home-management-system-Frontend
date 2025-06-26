import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium' }) => {
  return (
    <div className={`logo ${size}`}>
      <img src="/images/Logo.png" alt="Home Service Logo" className="logo-image" />
    </div>
  );
};

export default Logo; 