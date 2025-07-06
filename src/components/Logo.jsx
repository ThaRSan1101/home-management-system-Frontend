import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium' }) => {
  return (
    <div className={`logo ${size}`}>
      <div className="logo-border">
        <img src="/images/logo new.png" alt="Home Service Logo" className="logo-image" />
      </div>
    </div>
  );
};

export default Logo; 