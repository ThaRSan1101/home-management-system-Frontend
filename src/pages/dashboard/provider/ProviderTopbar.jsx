import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaBell } from 'react-icons/fa';
import './ProviderTopbar.css';

const provider = {
  fullName: 'Provider Name',
  address: '456 Service Rd, Colombo 00500',
  phone: '+94 77 987 6543',
  email: 'provider@email.com',
  joined: '2022-08-10',
};

const notifications = [
  { id: 1, message: 'You received a new booking request.', time: '1 hour ago' },
  { id: 2, message: 'Your subscription was renewed.', time: '2 days ago' },
  { id: 3, message: 'Feedback received from a customer.', time: '4 days ago' },
];

const ProviderTopbar = () => {
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
    <div className="provider-topbar-actions">
      <div className="provider-topbar-notification-section" ref={notifRef}>
        <FaBell className="provider-topbar-notification-icon" onClick={() => setNotifOpen((o) => !o)} />
        {notifOpen && (
          <div className="provider-notification-dropdown">
            <div className="provider-notification-header">Notifications</div>
            {notifications.length === 0 ? (
              <div className="provider-notification-empty">No new notifications</div>
            ) : (
              notifications.map((notif) => (
                <div className="provider-notification-item" key={notif.id}>
                  <div className="provider-notification-message">{notif.message}</div>
                  <div className="provider-notification-time">{notif.time}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="provider-topbar-profile-section" ref={profileRef}>
        <FaUserCircle className="provider-topbar-profile-icon" onClick={() => setProfileOpen((o) => !o)} />
        {profileOpen && (
          <div className="provider-profile-card-dropdown">
            <div className="provider-profile-card-header">Provider Profile</div>
            <div className="provider-profile-card-row"><span>Full Name:</span> {provider.fullName}</div>
            <div className="provider-profile-card-row"><span>Address:</span> {provider.address}</div>
            <div className="provider-profile-card-row"><span>Phone:</span> {provider.phone}</div>
            <div className="provider-profile-card-row"><span>Email:</span> {provider.email}</div>
            <div className="provider-profile-card-row"><span>Joined:</span> {provider.joined}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderTopbar; 