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
  const handleLogout = () => {
    localStorage.removeItem('userType');
    navigate('/login');
  };

  return (
    <aside className="provider-sidebar">
      <div className="sidebar-logo-container">
        <img src="/images/logo neww.png" alt="Logo" className="sidebar-logo-img" />
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/provider/dashboard/${userId}/${item.path}`}
              className={({ isActive }) =>
                'sidebar-link' + (isActive ? ' active' : '')
              }
            title={item.label}
            >
            {item.icon}
            </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default ProviderSidebar; 