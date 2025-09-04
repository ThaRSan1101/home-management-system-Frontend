import React, { useState, useRef, useEffect } from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import './AdminTopbar.css';



const AdminTopbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [newServiceBookingCount, setNewServiceBookingCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const profileRef = useRef();
  const notifRef = useRef();

  // Fetch new service booking notifications
  const fetchNewServiceBookingNotifications = async () => {
    try {
      const response = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/notification.php?action=get_new_service_booking_count');
      const data = await response.json();
      
      if (data.status === 'success') {
        setNewServiceBookingCount(data.count);
        
        // Create notification items for display
        if (data.count > 0) {
          const notificationItems = Array(data.count).fill(null).map((_, index) => ({
            id: index + 1,
            message: 'New service booking'
          }));
          setNotifications(notificationItems);
        } else {
          setNotifications([]);
        }
      }
    } catch (error) {
      console.error('Error fetching new service booking notifications:', error);
    }
  };


  useEffect(() => {
    fetchNewServiceBookingNotifications();
    
    // Refresh notifications every 30 seconds
    const interval = setInterval(fetchNewServiceBookingNotifications, 30000);
    
    return () => clearInterval(interval);
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

  // Handle individual notification click - hide specific notification
  const handleNotificationItemClick = async (notificationId) => {
    try {
      await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/notification.php?action=mark_single_service_booking_hidden', {
        method: 'GET',
        credentials: 'include',
      });
      // Refresh notifications after hiding one
      fetchNewServiceBookingNotifications();
    } catch (error) {
      console.error('Error hiding service booking notification:', error);
    }
  };


  // Get admin email from backend or props/context (default fallback shown)
  const adminEmail = 'admin@servicehub.com';
  const adminRole = 'Admin';

  return (
    <div className="admin-topbar">
      <div className="admin-topbar-actions">
        <div className="admin-topbar-notification-section" ref={notifRef}>
          <div className="notification-icon-container">
            <FaBell className="admin-topbar-icon" size={26} onClick={() => setNotifOpen((o) => !o)} />
            {newServiceBookingCount > 0 && (
              <span className="notification-badge-topbar">{newServiceBookingCount}</span>
            )}
          </div>
          {notifOpen && (
            <div className="admin-notification-dropdown">
              <div className="admin-notification-header">Notifications</div>
              {notifications.length === 0 ? (
                <div className="admin-notification-empty">No new notifications</div>
              ) : (
                notifications.map((notif) => (
                  <div 
                    className="admin-notification-item" 
                    key={notif.id}
                    onClick={() => handleNotificationItemClick(notif.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="admin-notification-message">{notif.message}</div>
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