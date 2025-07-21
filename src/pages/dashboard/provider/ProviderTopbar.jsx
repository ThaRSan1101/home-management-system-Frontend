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
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    fullName: provider.fullName,
    address: provider.address,
    phone: provider.phone,
    email: provider.email,
  });
  const [profileData, setProfileData] = useState(provider);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const profileRef = useRef();
  const notifRef = useRef();
  const [online, setOnline] = useState(localStorage.getItem('provider_online') === 'true');

  // Ensure profile data is loaded from localStorage on mount (fixes missing details after login)
  useEffect(() => {
    setProfileData({
      fullName: localStorage.getItem('provider_fullName') || '',
      address: localStorage.getItem('provider_address') || '',
      phone: localStorage.getItem('provider_phone') || '',
      email: localStorage.getItem('provider_email') || '',
      joined: localStorage.getItem('provider_joined') || '',
      avatar: '/src/assets/man.png',
    });
    setEditData({
      fullName: localStorage.getItem('provider_fullName') || '',
      address: localStorage.getItem('provider_address') || '',
      phone: localStorage.getItem('provider_phone') || '',
      email: localStorage.getItem('provider_email') || '',
    });
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

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('provider_fullName', editData.fullName);
    localStorage.setItem('provider_address', editData.address);
    localStorage.setItem('provider_phone', editData.phone);
    localStorage.setItem('provider_email', editData.email);
    setProfileData({ ...profileData, ...editData });
    setEditOpen(false);
  };

  const handleToggleOnline = () => {
    const newStatus = !online;
    setOnline(newStatus);
    localStorage.setItem('provider_online', newStatus);
  };

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
              <div className="profile-card-row"><span>Full Name:</span> {profileData.fullName}</div>
              <div className="profile-card-row"><span>Address:</span> {profileData.address}</div>
              <div className="profile-card-row"><span>Phone:</span> {profileData.phone}</div>
              <div className="profile-card-row"><span>Email:</span> {profileData.email}</div>
              <div className="profile-card-row"><span>Joined:</span> {profileData.joined}</div>
              <div className="profile-card-row" style={{marginTop: '0.7rem', marginBottom: '0.7rem'}}>
                <span>Status:</span>
                <button
                  className={`provider-status-toggle ${online ? 'online' : 'offline'}`}
                  onClick={handleToggleOnline}
                  style={{marginLeft: '0.7rem', padding: '0.3rem 1.2rem', borderRadius: '18px', border: 'none', fontWeight: 600, background: online ? '#007a65' : '#640f1c', color: '#fff', cursor: 'pointer', transition: 'background 0.2s'}}
                >
                  {online ? 'Online' : 'Offline'}
                </button>
              </div>
              <button className="profile-edit-btn" style={{marginTop: '0.7rem'}} onClick={() => setEditOpen(true)}>
                Edit Profile
              </button>
              <button className="provider-sidebar-logout-btn-bottom" style={{marginTop: '1.2rem'}} onClick={() => { localStorage.clear(); window.location.href='/login'; }}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      {editOpen && (
        <div className="profile-edit-modal-overlay">
          <div className="profile-edit-modal">
            <h3>Edit Profile</h3>
            <form onSubmit={handleEditSubmit} className="profile-edit-form">
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
                <input name="email" value={editData.email} onChange={handleEditChange} required type="email" />
              </label>
              <div className="profile-edit-modal-actions">
                <button type="button" className="activity-modal-cancel-btn" onClick={() => setEditOpen(false)}>Cancel</button>
                <button type="submit" className="activity-modal-submit-btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderTopbarContent; 