import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './AdminSidebar.css';

const navItems = [
  { label: 'Dashboard', path: 'dashboard' },
  { label: 'Service Booking', path: 'service-booking' },
  { label: 'Subscription Booking', path: 'subscription-booking' },
  { label: 'Customer', path: 'customer' },
  { label: 'Provider', path: 'provider' },
  { label: 'Feedback', path: 'feedback' },
  { label: 'User Suggestion', path: 'user-suggestion' },
  { label: 'Monitoring', path: 'monitoring' },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">Admin Panel</div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={`/admin/dashboard/${userId}/${item.path}`}
            className={({ isActive }) =>
              'sidebar-link' + (isActive ? ' active' : '')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar; 