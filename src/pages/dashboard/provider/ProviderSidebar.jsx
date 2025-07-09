import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaSignOutAlt, FaHome, FaClipboardList, FaComments, FaEnvelope } from 'react-icons/fa';
import './ProviderSidebar.css';

const navItems = [
  { label: 'Dashboard', path: 'dashboard', icon: <FaHome /> },
  { label: 'Activity', path: 'activity/services', icon: <FaClipboardList /> },
  { label: 'Feedback', path: 'feedback', icon: <FaComments /> },
  { label: 'Contact Us', path: 'contact', icon: <FaEnvelope /> },
];

const ProviderSidebar = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  // No sensitive data is stored in localStorage. userType is not used for authentication.
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
        <div className="sidebar-brand">
          <h3>ServiceHub</h3>
          <span>Provider Portal</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={`/provider/dashboard/${userId}/${item.path}`}
            className={({ isActive }) =>
              'sidebar-link' + (isActive ? ' active' : '')
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <button className="sidebar-logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="logout-icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default ProviderSidebar; 