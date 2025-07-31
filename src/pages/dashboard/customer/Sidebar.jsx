import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaSignOutAlt, FaHome, FaTools, FaHistory, FaRegCreditCard, FaCommentDots, FaQuestionCircle, FaInfoCircle, FaPhoneAlt, FaUserCircle } from 'react-icons/fa';
import './Sidebar.css';

const navItems = [
  { label: 'Dashboard', path: 'home', icon: <FaHome /> },
  { label: 'Service', path: 'service', icon: <FaTools /> },
  { label: 'Activity', path: 'activity', icon: <FaHistory /> },
  { label: 'Subscription', path: 'subscription', icon: <FaRegCreditCard /> },
  { label: 'Feedback', path: 'feedback', icon: <FaCommentDots /> },
  { label: 'How It Works', path: 'how-it-works', icon: <FaQuestionCircle /> },
  { label: 'About Us', path: 'about', icon: <FaInfoCircle /> },
  { label: 'Contact Us', path: 'contact', icon: <FaPhoneAlt /> },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside className="modern-sidebar">
      <div className="modern-sidebar-logo-container">
        <img src="/images/logo neww.png" alt="Logo" className="modern-sidebar-logo-img" />
      </div>
      <nav className="modern-sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={`/customer/dashboard/${item.path}`}
            className={({ isActive }) =>
              'modern-sidebar-link' + (isActive ? ' active' : '')
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

export default Sidebar; 