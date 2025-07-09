import React, { useState, useRef } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './AdminSidebar.css';

const navItems = [
  { label: 'Dashboard', path: 'dashboard' },
  { label: 'Service Providers', path: 'service-providers' },
  { label: 'Reports', path: 'reports' },
  { label: 'Settings', path: 'settings' },
  { label: 'Profile', path: 'profile' },
];

const AdminSidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { userId } = useParams();

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
    // No sensitive data is stored in localStorage. userType is not used for authentication.
    navigate('/login');
  };

  return (
    <aside className="admin-sidebar">
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
      <div className="sidebar-logout-bottom">
        <button className="sidebar-logout-btn-bottom" onClick={handleLogout}>
          <FaSignOutAlt style={{ marginRight: 8 }} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar; 