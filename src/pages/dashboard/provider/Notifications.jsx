import React, { useState } from 'react';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      title: 'New Booking Request',
      message: 'John Smith has requested your Plumbing Repair service for March 20, 2024.',
      timestamp: '2024-03-15T10:30:00',
      read: false,
      icon: '📅'
    },
    {
      id: 2,
      type: 'review',
      title: 'New Review Received',
      message: 'Sarah Johnson has left a 5-star review for your House Cleaning service.',
      timestamp: '2024-03-14T15:45:00',
      read: true,
      icon: '⭐'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of $150 has been received for Electrical Installation service.',
      timestamp: '2024-03-14T09:15:00',
      read: false,
      icon: '💰'
    },
    {
      id: 4,
      type: 'system',
      title: 'Profile Update Required',
      message: 'Please update your service availability for the upcoming week.',
      timestamp: '2024-03-13T14:20:00',
      read: true,
      icon: '⚙️'
    }
  ]);

  const [selectedType, setSelectedType] = useState('all');

  const handleTypeFilter = (e) => {
    setSelectedType(e.target.value);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const filteredNotifications = selectedType === 'all'
    ? notifications
    : notifications.filter(notification => notification.type === selectedType);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return diffInHours === 0
        ? 'Just now'
        : `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1>Notifications</h1>
        <div className="header-actions">
          <select
            value={selectedType}
            onChange={handleTypeFilter}
            className="type-filter"
          >
            <option value="all">All Types</option>
            <option value="booking">Bookings</option>
            <option value="review">Reviews</option>
            <option value="payment">Payments</option>
            <option value="system">System</option>
          </select>
          <button
            className="mark-all-read-btn"
            onClick={markAllAsRead}
          >
            Mark All as Read
          </button>
        </div>
      </div>

      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="no-notifications">
            <p>No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
            >
              <div className="notification-icon">
                {notification.icon}
              </div>
              <div className="notification-content">
                <div className="notification-header">
                  <h3>{notification.title}</h3>
                  <span className="timestamp">
                    {formatTimestamp(notification.timestamp)}
                  </span>
                </div>
                <p className="message">{notification.message}</p>
              </div>
              <div className="notification-actions">
                {!notification.read && (
                  <button
                    className="mark-read-btn"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  className="delete-btn"
                  onClick={() => deleteNotification(notification.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications; 