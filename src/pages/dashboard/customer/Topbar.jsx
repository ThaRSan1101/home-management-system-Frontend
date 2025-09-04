import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaBell } from 'react-icons/fa';
import './Topbar.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Example customer data (replace with real data as needed)
const customer = {
  fullName: 'Jane Doe',
  address: '123 Main St, Colombo 00400',
  phone: '+94 77 123 4567',
  email: 'jane.doe@email.com',
  joined: '2023-01-15',
};

// Dynamic notifications from backend

const Topbar = ({ currentUser }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
  });
  const [customerData, setCustomerData] = useState({
    fullName: (currentUser && currentUser.fullName) || '',
    address: (currentUser && currentUser.address) || '',
    phone: (currentUser && currentUser.phone) || '',
    email: (currentUser && currentUser.email) || '',
    joined: (currentUser && currentUser.joined) || '',
  });
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [pendingProfile, setPendingProfile] = useState(null);
  const [otp, setOtp] = useState('');
  const profileRef = useRef();
  const notifRef = useRef();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const handleLogout = async () => {
    await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/logout.php', { 
      method: 'POST',
      credentials: 'include' });
    navigate('/login');
  };
  // Fetch canceled service booking notifications for this customer
  const fetchCanceledNotifications = async () => {
    const userId = currentUser?.user_id;
    if (!userId) return;
    try {
      const [countCancelRes, countCompletedRes, detailRes] = await Promise.all([
        fetch(`http://localhost/project-root/backend/home-management-system-Backend/api/notification.php?action=get_customer_canceled_service_count&user_id=${userId}`),
        fetch(`http://localhost/project-root/backend/home-management-system-Backend/api/notification.php?action=get_customer_completed_service_count&user_id=${userId}`),
        fetch(`http://localhost/project-root/backend/home-management-system-Backend/api/notification.php?action=get_customer_active_notifications&user_id=${userId}`)
      ]);
      const countCancelData = await countCancelRes.json();
      const countCompletedData = await countCompletedRes.json();
      const detailData = await detailRes.json();
      const count = (countCancelData.status === 'success' ? countCancelData.count : 0) + (countCompletedData.status === 'success' ? countCompletedData.count : 0);
      setNotificationCount(count);
      if (detailData.status === 'success' && Array.isArray(detailData.data)) {
        const items = detailData.data.map(n => ({ id: n.notification_id, message: n.description }));
        setNotifications(items);
      } else {
        const items = Array(count).fill(null).map((_, idx) => ({ id: `cancel-${idx+1}`, message: 'Service booking is canceled' }));
        setNotifications(items);
      }
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    fetchCanceledNotifications();
    const interval = setInterval(fetchCanceledNotifications, 30000);
    return () => clearInterval(interval);
  }, [currentUser]);

  const handleNotificationItemClick = async (notificationId) => {
    const userId = currentUser?.user_id;
    if (!userId) return;
    try {
      await fetch(`http://localhost/project-root/backend/home-management-system-Backend/api/notification.php?action=hide_notification_by_id&notification_id=${notificationId}&role=customer`, { method: 'GET', credentials: 'include' });
      fetchCanceledNotifications();
    } catch (e) {
      // ignore
    }
  };

  const handleEditProfile = () => {
    setEditData({
      fullName: customerData.fullName,
      address: customerData.address,
      phone: customerData.phone,
      email: customerData.email,
    });
    setEditOpen(true);
    setProfileOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      // Only allow numbers
      const numeric = value.replace(/[^0-9]/g, '');
      setEditData((prev) => ({ ...prev, [name]: numeric }));
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: editData.fullName,
      email: editData.email,
      phone_number: editData.phone,
      address: editData.address,
    };
    try {
      const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/request_customer_profile_update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
      const result = await res.json();
      if (result.status === 'success') {
        setPendingProfile(payload);
        setOtpModalOpen(true);
        setEditOpen(false);
        toast.success('OTP sent to your email. Please enter it to confirm.');
      } else {
        toast.error(result.message || 'Failed to request profile update.');
      }
    } catch (err) {
      toast.error(err.message || 'Unknown error occurred.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!pendingProfile) return;
    try {
      const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/update_customer_profile.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
        credentials: 'include',
      });
      const result = await res.json();
      if (result.status === 'success') {
        setCustomerData((prev) => ({
          ...prev,
          fullName: pendingProfile.name,
          address: pendingProfile.address,
          phone: pendingProfile.phone_number,
          email: pendingProfile.email,
        }));
        setOtpModalOpen(false);
        setOtp('');
        setPendingProfile(null);
        toast.success('Your profile was updated successfully.');
      } else {
        toast.error(result.message || 'Failed to verify OTP.');
      }
    } catch (err) {
      toast.error(err.message || 'Unknown error occurred.');
    }
  };

  // Update customerData state if currentUser prop changes
  useEffect(() => {
    if (currentUser) {
      setCustomerData(prev => ({
        ...prev,
        fullName: currentUser.fullName || '',
        address: currentUser.address || '',
        phone: currentUser.phone || '',
        email: currentUser.email || '',
        joined: currentUser.joined || '',
      }));
    }
  }, [currentUser]);

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
          <div className="notification-icon-container">
            <FaBell className="topbar-notification-icon" size={26} onClick={() => setNotifOpen((o) => !o)} />
            {notificationCount > 0 && (
              <span className="notification-badge-topbar">{notificationCount}</span>
            )}
          </div>
          {notifOpen && (
            <div className="notification-dropdown">
              <div className="notification-header">Notifications</div>
              {notifications.length === 0 ? (
                <div className="notification-empty">No new notifications</div>
              ) : (
                notifications.map((notif) => (
                  <div className="notification-item" key={notif.id} onClick={() => handleNotificationItemClick(notif.id)} style={{ cursor: 'pointer' }}>
                    <div className="notification-message">{notif.message}</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <div className="topbar-profile-section" ref={profileRef}>
          <FaUser className="topbar-profile-icon solid" size={38} onClick={() => setProfileOpen((o) => !o)} />
          {profileOpen && (
            <div className="profile-card-dropdown">
              <div className="profile-card-header">Customer Profile</div>
              <div className="profile-card-row"><span>Full Name:</span> {customerData.fullName}</div>
              <div className="profile-card-row"><span>Address:</span> {customerData.address}</div>
              <div className="profile-card-row"><span>Phone:</span> {customerData.phone}</div>
              <div className="profile-card-row"><span>Email:</span> {customerData.email}</div>
          
              <div className="profile-card-row"><span>Joined:</span> {customerData.joined}</div>
              <button className="customer-sidebar-edit-btn" onClick={handleEditProfile}>
                Edit Profile
              </button>
              <button className="customer-sidebar-logout-btn-bottom" style={{marginTop: '1.2rem'}} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      {editOpen && (
        <div className="customer-edit-modal-overlay">
          <div className="customer-edit-modal">
            <h3>Edit Profile</h3>
            <form onSubmit={handleEditSubmit} className="customer-edit-form">
              <label>Full Name
                <input name="fullName" value={editData.fullName} onChange={handleEditChange} required />
              </label>
              <label>Address
                <input name="address" value={editData.address} onChange={handleEditChange} required />
              </label>
              <label>Phone
                <input name="phone" value={editData.phone} onChange={handleEditChange} required />
              </label>
              <label>Email
                <input name="email" type="email" value={editData.email} onChange={handleEditChange} required pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" autoComplete="email"/>
              </label>
              <div className="customer-edit-modal-actions">
                <button type="button" className="customer-edit-cancel-btn" onClick={() => setEditOpen(false)}>Cancel</button>
                <button type="submit" className="customer-edit-save-btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {otpModalOpen && (
        <div className="otp-modal-overlay themed">
          <div className="otp-modal-card themed">
            <h3 className="otp-modal-title themed">Verify Profile Update</h3>
            <p className="otp-modal-desc themed">Enter the 6-digit OTP sent to your email to confirm your profile changes.</p>
            <form onSubmit={handleOtpSubmit} className="otp-modal-form themed">
              <input
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                maxLength={6}
                required
                autoFocus
                className="otp-input themed"
                placeholder="Enter OTP"
              />
              <div className="otp-modal-actions themed">
                <button type="submit" className="otp-submit-btn themed">Verify</button>
                <button type="button" className="otp-cancel-btn themed" onClick={() => setOtpModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar; 