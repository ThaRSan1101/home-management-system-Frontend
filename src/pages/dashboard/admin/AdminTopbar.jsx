import React, { useState, useRef, useEffect } from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import './AdminTopbar.css';

const notifications = [
  { id: 1, message: 'New user registered.', time: '2 hours ago' },
  { id: 2, message: 'System update completed.', time: '1 day ago' },
  { id: 3, message: 'Feedback received.', time: '3 days ago' },
];

const AdminTopbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef();
  const notifRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get admin email from backend or props/context (default fallback shown)
  const adminEmail = 'admin@servicehub.com';
  const adminRole = 'Admin';

  return (
    <div className="admin-topbar">
      <div className="admin-topbar-actions">
        <div className="admin-topbar-notification-section" ref={notifRef}>
          <FaBell className="admin-topbar-icon" size={26} onClick={() => setNotifOpen((o) => !o)} />
          {notifOpen && (
            <div className="admin-notification-dropdown">
              <div className="admin-notification-header">Notifications</div>
              {notifications.length === 0 ? (
                <div className="admin-notification-empty">No new notifications</div>
              ) : (
                notifications.map((notif) => (
                  <div className="admin-notification-item" key={notif.id}>
                    <div className="admin-notification-message">{notif.message}</div>
                    <div className="admin-notification-time">{notif.time}</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <div className="admin-topbar-profile-section" ref={profileRef}>
          <FaUser className="admin-topbar-icon solid" size={38} onClick={() => setProfileOpen((o) => !o)} />
        {profileOpen && (
            <div className="admin-profile-dropdown">
              <div className="admin-profile-header">Admin Profile</div>
              <div className="admin-profile-row"><span>Role:</span> {adminRole}</div>
              <div className="admin-profile-row"><span>Email:</span> {adminEmail}</div>
              <button className="admin-profile-logout-btn" style={{marginTop: '1.2rem'}} onClick={async () => { await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/logout.php', { method: 'POST', credentials: 'include' }); window.location.href='/login'; }}> Logout</button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar; 