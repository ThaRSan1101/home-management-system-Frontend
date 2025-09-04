import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaClipboardList, FaRegCreditCard, FaUsers, FaUserTie, FaCommentDots, FaLightbulb, FaChartBar } from 'react-icons/fa';
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
  const location = useLocation();
  const [customerRegistrationCount, setCustomerRegistrationCount] = useState(0);
  const [pendingServiceCount, setPendingServiceCount] = useState(0);
  const [pendingSubscriptionCount, setPendingSubscriptionCount] = useState(0);

  const handleLogout = () => {
    navigate('/login');
  };

  // Fetch customer registration notification count
  const fetchCustomerRegistrationCount = async () => {
    try {
      const response = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/notification.php?action=get_customer_registration_count');
      const data = await response.json();
      
      if (data.status === 'success') {
        setCustomerRegistrationCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching customer registration count:', error);
    }
  };

  // Fetch pending service booking count
  const fetchPendingServiceCount = async () => {
    try {
      const response = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/notification.php?action=get_pending_service_count');
      const data = await response.json();
      
      if (data.status === 'success') {
        setPendingServiceCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching pending service count:', error);
    }
  };

  // Fetch pending subscription booking count
  const fetchPendingSubscriptionCount = async () => {
    try {
      const response = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/notification.php?action=get_pending_subscription_count');
      const data = await response.json();
      
      if (data.status === 'success') {
        setPendingSubscriptionCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching pending subscription count:', error);
    }
  };

  useEffect(() => {
    fetchCustomerRegistrationCount();
    fetchPendingServiceCount();
    fetchPendingSubscriptionCount();
    
    // Refresh counts every 30 seconds
    const interval = setInterval(() => {
      fetchCustomerRegistrationCount();
      fetchPendingServiceCount();
      fetchPendingSubscriptionCount();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Refresh counts when route changes
  useEffect(() => {
    fetchCustomerRegistrationCount();
    fetchPendingServiceCount();
    fetchPendingSubscriptionCount();
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
            {item.path === 'customer' && customerRegistrationCount > 0 && (
              <span className="notification-badge">{customerRegistrationCount}</span>
            )}
            {item.path === 'service-booking' && pendingServiceCount > 0 && (
              <span className="notification-badge">{pendingServiceCount}</span>
            )}
            {item.path === 'subscription-booking' && pendingSubscriptionCount > 0 && (
              <span className="notification-badge">{pendingSubscriptionCount}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar; 