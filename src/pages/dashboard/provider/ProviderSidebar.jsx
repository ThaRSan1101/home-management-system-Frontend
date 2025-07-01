import React, { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './ProviderSidebar.css';

const navItems = [
  { label: 'Dashboard', path: '/provider/dashboard' },
  { label: 'Bookings', path: '/provider/bookings' },
  { label: 'Services', path: '/provider/services' },
  { label: 'Notifications', path: '/provider/notifications' },
  { label: 'Profile', path: '/provider/profile' },
];

const ProviderSidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    navigate('/login');
  };

  return (
    <aside className="provider-sidebar">
      <div className="sidebar-profile" ref={dropdownRef}>
        <FaUserCircle
          className="sidebar-avatar"
          size={44}
          onClick={() => setDropdownOpen((open) => !open)}
        />
        {dropdownOpen && (
          <div className="sidebar-dropdown">
            <button className="sidebar-logout-btn" onClick={handleLogout}>
              <FaSignOutAlt style={{ marginRight: 8 }} /> Logout
            </button>
          </div>
        )}
      </div>
      <div className="sidebar-logo">Provider Panel</div>
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
    </aside>
  );
};

export default ProviderSidebar; 