import React, { useState, useRef, useEffect } from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import './ProviderTopbar.css';

const provider = {
  fullName: 'John Provider',
  address: '456 Service Rd, Colombo 00500',
  phone: '+94 77 987 6543',
  email: 'john.provider@email.com',
  joined: '2022-08-10',
  avatar: '/src/assets/man.png',
};

const notifications = [
  { 
    id: 1, 
    type: 'booking',
    message: 'New booking request for Plumbing service', 
    time: '1 hour ago',
    read: false
  },
  { 
    id: 2, 
    type: 'payment',
    message: 'Payment received for AC Service', 
    time: '2 hours ago',
    read: false
  },
  { 
    id: 3, 
    type: 'feedback',
    message: '5-star review from Sarah Johnson', 
    time: '1 day ago',
    read: true
  },
  { 
    id: 4, 
    type: 'system',
    message: 'Your subscription was renewed successfully', 
    time: '2 days ago',
    read: true
  },
];

const ProviderTopbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const profileRef = useRef();
  const notifRef = useRef();

  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, []);

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

  const handleNotificationClick = (notificationId) => {
    // Mark notification as read
    console.log('Marking notification as read:', notificationId);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'booking':
        return '📋';
      case 'payment':
        return '💰';
      case 'feedback':
        return '⭐';
      case 'system':
        return '⚙️';
      default:
        return '📢';
    }
  };

  return (
    <div className="provider-topbar">
      <div className="topbar-left">
        {/* Removed search-container and search-form */}
      </div>
      <div className="topbar-right">
        <div className="topbar-actions">
          <div className="notification-container" ref={notifRef}>
            <button 
              className="notification-btn"
              onClick={() => setNotifOpen(!notifOpen)}
            >
              <FaBell className="notification-icon" />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>
            {notifOpen && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>Notifications</h3>
                  <button className="mark-all-read">Mark all read</button>
                </div>
                <div className="notification-list">
                  {notifications.length === 0 ? (
                    <div className="notification-empty">
                      <span>🎉</span>
                      <p>No new notifications</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`notification-item ${!notif.read ? 'unread' : ''}`}
                        onClick={() => handleNotificationClick(notif.id)}
                      >
                        <div className="notification-icon">
                          {getNotificationIcon(notif.type)}
                        </div>
                        <div className="notification-content">
                          <div className="notification-message">{notif.message}</div>
                          <div className="notification-time">{notif.time}</div>
                        </div>
                        {!notif.read && <div className="unread-dot"></div>}
                      </div>
                    ))
                  )}
                </div>
                <div className="notification-footer">
                  <button className="view-all-notifications">View All</button>
                </div>
              </div>
            )}
          </div>
          <div className="profile-container" ref={profileRef}>
            <button 
              className="profile-btn"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <FaUser className="profile-avatar" />
            </button>
            {profileOpen && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <FaUser className="profile-dropdown-avatar" />
                  <div className="profile-info">
                    <h4>{provider.fullName}</h4>
                    <span>Service Provider</span>
                  </div>
                </div>
                <div className="profile-details">
                  <div className="profile-detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{provider.email}</span>
                  </div>
                  <div className="profile-detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{provider.phone}</span>
                  </div>
                  <div className="profile-detail-item">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">{provider.address}</span>
                  </div>
                  <div className="profile-detail-item">
                    <span className="detail-label">Joined:</span>
                    <span className="detail-value">{provider.joined}</span>
                  </div>
                </div>
                <div className="profile-actions">
                  <button className="profile-action-btn">Edit Profile</button>
                  <button className="profile-action-btn">View Settings</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderTopbar; 