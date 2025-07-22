import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaHome, FaClipboardList, FaRegCreditCard, FaUsers, FaUserTie, FaCommentDots, FaLightbulb, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import './AdminSidebar.css';

const navItems = [
  { label: 'Dashboard', path: 'dashboard', icon: <FaHome /> },
  { label: 'Service Booking', path: 'service-booking', icon: <FaClipboardList /> },
  { label: 'Subscription Booking', path: 'subscription-booking', icon: <FaRegCreditCard /> },
  { label: 'Customer', path: 'customer', icon: <FaUsers /> },
  { label: 'Provider', path: 'provider', icon: <FaUserTie /> },
  { label: 'Feedback', path: 'feedback', icon: <FaCommentDots /> },
  { label: 'User Suggestion', path: 'user-suggestion', icon: <FaLightbulb /> },
  { label: 'Monitoring', path: 'monitoring', icon: <FaChartBar /> },
];

const AdminSidebar = () => {
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
            to={`/admin/dashboard/${userId}/${item.path}`}
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

export default AdminSidebar; 