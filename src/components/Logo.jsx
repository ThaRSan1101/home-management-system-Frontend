import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium', variant = 'default' }) => {
  return (
    <div className={`logo ${size} ${variant === 'auth' ? 'logo-auth' : ''}`}>
      <div className="logo-border">
        <img src="/images/logo neww.png" alt="Home Service Logo" className="logo-image" />
      </div>
    </div>
  );
};

export default Logo; 