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
            <img src="/images/logo new.png" alt="ServiceHub Logo" className="footer-logo-img" />
          </div>
          <p className="footer-desc">Your trusted partner for professional home services.</p>
        </div>
        <nav className="footer-nav">
          <Link to="/" onClick={e => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}>Home</Link>
          <Link to="/services" onClick={e => {
            if (window.location.pathname === '/services') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}>Services</Link>
          <Link to="/how-it-works" onClick={e => {
            if (window.location.pathname === '/how-it-works') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}>How It Works</Link>
          <Link to="/contact" onClick={e => {
            if (window.location.pathname === '/contact') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}>Contact Us</Link>
          <Link to="/about" onClick={e => {
            if (window.location.pathname === '/about') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}>About Us</Link>
        </nav>
        <div className="footer-contact">
          <div><FaPhone /> <a href="tel:+94778200752">+94 778 200 752 </a></div>
          <div><FaEnvelope /> <a href="mailto:hello@homeservice.com">ServiceHub@gmail.com</a></div>
          <div><FaMapMarkerAlt /> <span>07,Main Street Road,Jaffna</span></div>
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