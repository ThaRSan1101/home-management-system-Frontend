import React, { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const navItems = [
  { label: 'Home', path: '/customer/home' },
  { label: 'Service', path: '/customer/service' },
  { label: 'Activity', path: '/customer/activity' },
  { label: 'Subscription Service Booking', path: '/customer/subscription' },
  { label: 'Feedback', path: '/customer/feedback' },
  { label: 'Profile', path: '/customer/profile' },
  { label: 'How It Works', path: '/customer/how-it-works' },
  { label: 'About Us', path: '/customer/about' },
  { label: 'Contact Us', path: '/customer/contact' },
];

const Sidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
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
    // Remove any other auth tokens if needed
    navigate('/login');
  };

  return (
    <aside className="customer-sidebar">
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
      <div className="sidebar-logo">HomeService</div>
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

export default Sidebar; 