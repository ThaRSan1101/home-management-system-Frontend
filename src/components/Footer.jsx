import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer-new">
      <div className="footer-new-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/images/Logo.png" alt="Home Service Logo" />
            <span>HomeService</span>
          </div>
          <p className="footer-desc">Your trusted partner for professional home services.</p>
        </div>
        <nav className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
        <div className="footer-contact">
          <div><FaPhone /> <a href="tel:+15551234567">+1 (555) 123-4567</a></div>
          <div><FaEnvelope /> <a href="mailto:hello@homeservice.com">hello@homeservice.com</a></div>
          <div><FaMapMarkerAlt /> <span>123 Service Street, City, State</span></div>
        </div>
        <div className="footer-social">
          <a href="#" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
        </div>
      </div>
      <div className="footer-copyright">
        &copy; {currentYear} HomeService. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer; 