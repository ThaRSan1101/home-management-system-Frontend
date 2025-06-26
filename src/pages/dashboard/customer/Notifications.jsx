import React, { useState } from 'react';
import { FaBell, FaCheck, FaTimes, FaClock, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your plumbing service with Mike Johnson has been confirmed for tomorrow at 10:00 AM.',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Service Reminder',
      message: 'Don\'t forget! Your house cleaning service is scheduled for today at 2:00 PM.',
      time: '4 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'review',
      title: 'Review Request',
      message: 'How was your recent electrical service? Please take a moment to rate your experience.',
      time: '1 day ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'update',
      title: 'Service Update',
      message: 'Your HVAC maintenance appointment has been rescheduled to Friday at 11:00 AM.',
      time: '2 days ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'payment',
      title: 'Payment Successful',
      message: 'Your payment of $120 for the plumbing service has been processed successfully.',
      time: '3 days ago',
      read: true,
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'booking':
        return <FaCheck />;
      case 'reminder':
        return <FaClock />;
      case 'review':
        return <FaBell />;
      case 'update':
        return <FaInfoCircle />;
      case 'payment':
        return <FaCheck />;
      default:
        return <FaBell />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#e53e3e';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#38a169';
      default:
        return '#718096';
    }
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread' 
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-page">
      <div className="page-header">
        <h1>Notifications</h1>
        <p>Stay updated with your service bookings and important updates</p>
      </div>

      {/* Header Actions */}
      <div className="notifications-header">
        <div className="header-stats">
          <span className="total-count">{notifications.length} total</span>
          <span className="unread-count">{unreadCount} unread</span>
        </div>
        <div className="header-actions">
          <button 
            className="mark-all-read-btn"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="notification-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread
        </button>
        <button 
          className={`filter-btn ${filter === 'booking' ? 'active' : ''}`}
          onClick={() => setFilter('booking')}
        >
          Bookings
        </button>
        <button 
          className={`filter-btn ${filter === 'reminder' ? 'active' : ''}`}
          onClick={() => setFilter('reminder')}
        >
          Reminders
        </button>
        <button 
          className={`filter-btn ${filter === 'review' ? 'active' : ''}`}
          onClick={() => setFilter('review')}
        >
          Reviews
        </button>
      </div>

      {/* Notifications List */}
      <div className="notifications-container">
        {filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔔</div>
            <h3>No notifications</h3>
            <p>You're all caught up! No {filter} notifications at the moment.</p>
          </div>
        ) : (
          <div className="notifications-list">
            {filteredNotifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
              >
                <div className="notification-icon" style={{ color: getPriorityColor(notification.priority) }}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="notification-content">
                  <div className="notification-header">
                    <h4>{notification.title}</h4>
                    <div className="notification-actions">
                      {!notification.read && (
                        <button 
                          className="action-btn read-btn"
                          onClick={() => markAsRead(notification.id)}
                          title="Mark as read"
                        >
                          <FaCheck />
                        </button>
                      )}
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => deleteNotification(notification.id)}
                        title="Delete notification"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                  
                  <p className="notification-message">{notification.message}</p>
                  
                  <div className="notification-footer">
                    <span className="notification-time">{notification.time}</span>
                    <span 
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(notification.priority) }}
                    >
                      {notification.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications; 