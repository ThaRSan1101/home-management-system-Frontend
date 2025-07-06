import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaBell } from 'react-icons/fa';
import './Topbar.css';

// Example customer data (replace with real data as needed)
const customer = {
  fullName: 'Jane Doe',
  address: '123 Main St, Colombo 00400',
  phone: '+94 77 123 4567',
  email: 'jane.doe@email.com',
  joined: '2023-01-15',
};

const notifications = [
  { id: 1, message: 'Your booking for Home Cleaning is confirmed.', time: '2 hours ago' },
  { id: 2, message: 'Subscription payment received.', time: '1 day ago' },
  { id: 3, message: 'Plumbing service completed.', time: '3 days ago' },
];

const Topbar = () => {
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

  return (
    <div className="customer-topbar">
      <div className="topbar-actions">
        <div className="topbar-notification-section" ref={notifRef}>
          <FaBell className="topbar-notification-icon" size={26} onClick={() => setNotifOpen((o) => !o)} />
          {notifOpen && (
            <div className="notification-dropdown">
              <div className="notification-header">Notifications</div>
              {notifications.length === 0 ? (
                <div className="notification-empty">No new notifications</div>
              ) : (
                notifications.map((notif) => (
                  <div className="notification-item" key={notif.id}>
                    <div className="notification-message">{notif.message}</div>
                    <div className="notification-time">{notif.time}</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <div className="topbar-profile-section" ref={profileRef}>
          <FaUserCircle className="topbar-profile-icon" size={38} onClick={() => setProfileOpen((o) => !o)} />
          {profileOpen && (
            <div className="profile-card-dropdown">
              <div className="profile-card-header">Customer Profile</div>
              <div className="profile-card-row"><span>Full Name:</span> {customer.fullName}</div>
              <div className="profile-card-row"><span>Address:</span> {customer.address}</div>
              <div className="profile-card-row"><span>Phone:</span> {customer.phone}</div>
              <div className="profile-card-row"><span>Email:</span> {customer.email}</div>
              <div className="profile-card-row"><span>Joined:</span> {customer.joined}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar; 