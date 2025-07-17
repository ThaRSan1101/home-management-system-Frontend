import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AdminTopbar.css';

const adminDetails = {
  fullName: 'Jane Doe',
  address: '123 Main St, Colombo 00400',
  phone: '+94 77 123 4567',
  email: 'jane.doe@email.com',
  joined: '2023-01-15',
};

const AdminTopbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="admin-topbar">
      <FaBell className="admin-topbar-bell" title="Notifications" />
      <div ref={profileRef} className="admin-topbar-profile-wrapper">
        <FaUserCircle
          className="admin-topbar-avatar"
          onClick={() => setProfileOpen((open) => !open)}
          title="Profile"
        />
        {profileOpen && (
          <div className="admin-topbar-dropdown">
            <div className="admin-topbar-name">{adminDetails.fullName}</div>
            <div className="admin-topbar-detail"><b>Address:</b> {adminDetails.address}</div>
            <div className="admin-topbar-detail"><b>Phone:</b> {adminDetails.phone}</div>
            <div className="admin-topbar-detail"><b>Email:</b> {adminDetails.email}</div>
            <div className="admin-topbar-detail"><b>Joined:</b> {adminDetails.joined}</div>
            <button onClick={handleLogout} className="admin-topbar-logout-btn">
              <FaSignOutAlt style={{ marginRight: 8 }} /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTopbar; 