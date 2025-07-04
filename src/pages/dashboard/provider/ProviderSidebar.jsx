import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import './ProviderSidebar.css';

const navItems = [
  { label: 'Dashboard', path: '/provider/dashboard' },
  { label: 'Activity', path: '/provider/activity/services' },
  { label: 'Feedback', path: '/provider/feedback' },
  { label: 'Contact Us', path: '/provider/contact' },
];

const ProviderSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userType');
    navigate('/login');
  };

  return (
    <aside className="provider-sidebar">
      <div className="sidebar-logo-container">
        <div className="sidebar-logo-round">
          <img src="/images/logo%20new.png" alt="Logo" className="sidebar-logo-img" />
        </div>
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
      <div className="sidebar-logout-bottom">
        <button className="sidebar-logout-btn-bottom" onClick={handleLogout}>
          <FaSignOutAlt style={{ marginRight: 8 }} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default ProviderSidebar; 