import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';
import logo from '../../../assets/Logo.png';

const navItems = [
  { label: 'Dashboard', path: 'home' },
  { label: 'Service', path: 'service' },
  { label: 'Activity', path: 'activity' },
  { label: 'Subscription', path: 'subscription' },
  { label: 'Feedback', path: 'feedback' },
  { label: 'How It Works', path: 'how-it-works' },
  { label: 'About Us', path: 'about' },
  { label: 'Contact Us', path: 'contact' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  // No sensitive data is stored in localStorage. userType is not used for authentication.
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside className="customer-sidebar">
      <div className="customer-sidebar-logo-container">
        <img src="/images/logo%20new.png" alt="Logo" className="customer-sidebar-logo-img" />
      </div>
      <nav className="customer-sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={`/customer/dashboard/${userId}/${item.path}`}
            className={({ isActive }) =>
              'customer-sidebar-link' + (isActive ? ' active' : '')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <button className="customer-sidebar-logout-btn-bottom" onClick={handleLogout}>
        <FaSignOutAlt style={{ marginRight: 8 }} /> Logout
      </button>
    </aside>
  );
};

export default Sidebar; 