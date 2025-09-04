import React, { useState, useRef, useEffect } from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import './AdminTopbar.css';



const AdminTopbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [newServiceBookingCount, setNewServiceBookingCount] = useState(0);
  const [canceledServiceBookingCount, setCanceledServiceBookingCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const profileRef = useRef();
  const notifRef = useRef();

  // Fetch counts and active notification details
  const fetchAdminNotifications = async () => {
    try {
      const [newRes, newSubRes, canceledRes, completedRes] = await Promise.all([
        fetch('http://localhost/project-root/backend/home-management-system-Backend/api/notification.php?action=get_new_service_booking_count'),
        fetch('http://localhost/project-root/backend/home-management-system-Backend/api/notification.php?action=get_new_subscription_booking_count'),
        fetch('http://localhost/project-root/backend/home-management-system-Backend/api/notification.php?action=get_admin_canceled_service_count'),
        fetch('http://localhost/project-root/backend/home-management-system-Backend/api/notification.php?action=get_admin_completed_service_count')
      ]);
      const newData = await newRes.json();
      const newSubData = await newSubRes.json();
      const canceledData = await canceledRes.json();
      const completedData = await completedRes.json();

      const newCount = (newData.status === 'success' ? newData.count : 0) + (newSubData.status === 'success' ? newSubData.count : 0);
      const canceledCount = canceledData.status === 'success' ? canceledData.count : 0;
      const completedCount = completedData.status === 'success' ? completedData.count : 0;
      setNewServiceBookingCount(newCount + completedCount);
      setCanceledServiceBookingCount(canceledCount);

      // Load actual active notification details for dropdown
      const detailRes = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/notification.php?action=get_admin_active_notifications');
      const detailData = await detailRes.json();
      if (detailData.status === 'success' && Array.isArray(detailData.data)) {
        const items = detailData.data.map(n => ({ id: n.notification_id, message: n.description }));
        setNotifications(items);
      } else {
        const items = [];
        for (let i = 0; i < newCount; i++) items.push({ id: `new-${i+1}`, message: 'New service booking' });
        for (let i = 0; i < canceledCount; i++) items.push({ id: `cancel-${i+1}`, message: 'Service booking is canceled' });
        setNotifications(items);
      }
    } catch (error) {
      console.error('Error fetching admin notifications:', error);
    }
  };


  useEffect(() => {
    fetchAdminNotifications();
    const interval = setInterval(fetchAdminNotifications, 30000);
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
      await fetch(`http://localhost/project-root/backend/home-management-system-Backend/api/notification.php?action=hide_notification_by_id&notification_id=${notificationId}&role=admin`, {
        method: 'GET',
        credentials: 'include',
      });
      // Refresh notifications after hiding one
      fetchAdminNotifications();
    } catch (error) {
      console.error('Error hiding admin notification:', error);
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
            {newServiceBookingCount + canceledServiceBookingCount > 0 && (
              <span className="notification-badge-topbar">{newServiceBookingCount + canceledServiceBookingCount}</span>
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