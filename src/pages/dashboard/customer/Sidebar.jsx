import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';
import logo from '../../../assets/Logo.png';

const navItems = [
  { label: 'Dashboard', path: '/customer/home' },
  { label: 'Service', path: '/customer/service' },
  { label: 'Activity', path: '/customer/activity' },
  { label: 'Subscription', path: '/customer/subscription' },
  { label: 'Feedback', path: '/customer/feedback' },
  { label: 'How It Works', path: '/customer/how-it-works' },
  { label: 'About Us', path: '/customer/about' },
  { label: 'Contact Us', path: '/customer/contact' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userType');
    // Remove any other auth tokens if needed
    navigate('/login');
  };

  return (
    <aside className="customer-sidebar">
      <div className="sidebar-logo-container">
        <img src={logo} alt="Logo" className="sidebar-logo-img" />
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              'sidebar-link' + (isActive ? ' active' : '')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <button className="sidebar-logout-btn-bottom" onClick={handleLogout}>
        <FaSignOutAlt style={{ marginRight: 8 }} /> Logout
      </button>
    </aside>
  );
};

export default Sidebar; 