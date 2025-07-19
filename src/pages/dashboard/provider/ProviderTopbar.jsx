import React, { useState, useRef, useEffect } from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import './ProviderTopbar.css';

const provider = {
  fullName: localStorage.getItem('provider_fullName') || '',
  address: localStorage.getItem('provider_address') || '',
  phone: localStorage.getItem('provider_phone') || '',
  email: localStorage.getItem('provider_email') || '',
  joined: localStorage.getItem('provider_joined') || '',
  avatar: '/src/assets/man.png',
};

const notifications = [
  { id: 1, type: 'booking', message: 'New booking request for Plumbing service', time: '1 hour ago', read: false },
  { id: 2, type: 'payment', message: 'Payment received for AC Service', time: '2 hours ago', read: false },
  { id: 3, type: 'feedback', message: '5-star review from Sarah Johnson', time: '1 day ago', read: true },
  { id: 4, type: 'system', message: 'Your subscription was renewed successfully', time: '2 days ago', read: true },
];

const ProviderTopbarContent = () => {
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
    <div className="provider-topbar">
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
          <FaUser className="topbar-profile-icon" size={38} onClick={() => setProfileOpen((o) => !o)} />
          {profileOpen && (
            <div className="profile-card-dropdown">
              <div className="profile-card-header">Provider Profile</div>
              <div className="profile-card-row"><span>Full Name:</span> {provider.fullName}</div>
              <div className="profile-card-row"><span>Address:</span> {provider.address}</div>
              <div className="profile-card-row"><span>Phone:</span> {provider.phone}</div>
              <div className="profile-card-row"><span>Email:</span> {provider.email}</div>
              <div className="profile-card-row"><span>Joined:</span> {provider.joined}</div>
              <button className="provider-sidebar-logout-btn-bottom" style={{marginTop: '1.2rem'}} onClick={() => { localStorage.clear(); window.location.href='/login'; }}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderTopbarContent; 