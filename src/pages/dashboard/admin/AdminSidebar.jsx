import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const [notificationCount, setNotificationCount] = useState(0);

  const handleLogout = () => {
    navigate('/login');
  };

  // Fetch admin notification count
  const fetchNotificationCount = async () => {
    try {
      const response = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/notification.php?action=get_admin_count');
      const data = await response.json();
      
      if (data.status === 'success') {
        setNotificationCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching notification count:', error);
    }
  };

  useEffect(() => {
    fetchNotificationCount();
    
    // Refresh notification count every 30 seconds
    const interval = setInterval(fetchNotificationCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Refresh notification count when route changes (especially when visiting customer page)
  useEffect(() => {
    fetchNotificationCount();
  }, [location.pathname]);

  return (
    <aside className="modern-sidebar">
      <div className="modern-sidebar-logo-container">
        <img src="/images/logo neww.png" alt="Logo" className="modern-sidebar-logo-img" />
      </div>
      <nav className="modern-sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={`/admin/dashboard/${item.path}`}
            className={({ isActive }) =>
              'modern-sidebar-link' + (isActive ? ' active' : '')
            }
            title={item.label}
          >
            {item.icon}
            {item.path === 'customer' && notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar; 