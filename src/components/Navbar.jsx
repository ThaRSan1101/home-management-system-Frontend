import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Determine navbar class
  const isHome = location.pathname === '/';
  const navbarClass = isHome && !isScrolled ? 'navbar transparent' : 'navbar scrolled';

  return (
    <nav className={navbarClass}>
      <div className="navbar-inner">
        {/* Logo Left */}
        <div className="navbar-brand">
          <Link to="/" onClick={handleLinkClick} aria-label="Home" style={{display: 'flex', alignItems: 'center', gap: '0'}}>
            <Logo size="small" />
            <span className="navbar-title">ServiceHub</span>
          </Link>
        </div>

        {/* Nav Links Centered */}
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}> 
          <NavLink to="/" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} end onClick={handleLinkClick}>Home</NavLink>
          <NavLink to="/services" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={handleLinkClick}>Services</NavLink>
          <NavLink to="/how-it-works" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={handleLinkClick}>How It Works</NavLink>
          <NavLink to="/about" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={handleLinkClick}>About Us</NavLink>
          <NavLink to="/contact" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={handleLinkClick}>Contact Us</NavLink>
        </div>

        {/* Login/Register Buttons Right */}
        <div className="navbar-auth">
          <NavLink to="/login" className={({ isActive }) => 'login-btn' + (isActive ? ' active' : '')} onClick={handleLinkClick}>Login</NavLink>
          <NavLink to="/register" className={({ isActive }) => 'register-btn' + (isActive ? ' active' : '')} onClick={handleLinkClick}>Register</NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 