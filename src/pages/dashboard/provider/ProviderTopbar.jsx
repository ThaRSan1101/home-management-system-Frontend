import React, { useState, useRef, useEffect } from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import './ProviderTopbar.css';
import { toast } from 'sonner';

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
  const [profileData, setProfileData] = useState({
    ...provider,
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const profileRef = useRef();
  const notifRef = useRef();
  const [online, setOnline] = useState(localStorage.getItem('provider_online') === 'true');
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [pendingProfile, setPendingProfile] = useState(null);
  const [otp, setOtp] = useState('');

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
      const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/request_provider_profile_update.php', {
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
      const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/update_provider_profile.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
        credentials: 'include',
      });
      const result = await res.json();
      if (result.status === 'success') {
        localStorage.setItem('provider_fullName', pendingProfile.name);
        localStorage.setItem('provider_address', pendingProfile.address);
        localStorage.setItem('provider_phone', pendingProfile.phone_number);
        localStorage.setItem('provider_email', pendingProfile.email);
        setProfileData((prev) => ({
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
                <div
                  className={`provider-status-switch ${online ? 'online' : 'offline'}`}
                  onClick={handleToggleOnline}
                  style={{
                    marginLeft: '0.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                    position: 'relative',
                    width: 44,
                    height: 22,
                  }}
                >
                  <div
                    className="provider-status-switch-label"
                    style={{
                      background: online ? '#10b981' : '#d32f2f',
                      borderRadius: 999,
                      width: 44,
                      height: 22,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: online ? 'flex-end' : 'flex-start',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                      position: 'relative',
                      transition: 'background 0.3s',
                    }}
                  >
                    {/* No text, just the switch */}
                  </div>
                  <div
                    className="provider-status-switch-circle"
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: '#e5e5e5',
                      border: '3px solid #f3f3f3',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.10)',
                      position: 'absolute',
                      left: online ? 24 : 4,
                      top: 2,
                      transition: 'left 0.3s',
                      zIndex: 2,
                    }}
                  />
                </div>
              </div>
              <button className="profile-edit-btn" style={{marginTop: '0.7rem'}} onClick={() => setEditOpen(true)}>
                Edit Profile
              </button>
              <button className="provider-sidebar-logout-btn-bottom" style={{marginTop: '1.2rem'}} onClick={async () => {
                await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/logout.php', { method: 'POST', credentials: 'include' });
                localStorage.clear();
                window.location.href='/login';
              }}>
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
                <input name="email" type="email" value={editData.email} onChange={handleEditChange} required pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" autoComplete="email"/>
              </label>
              <div className="profile-edit-modal-actions">
                <button type="button" className="activity-modal-cancel-btn" onClick={() => setEditOpen(false)}>Cancel</button>
                <button type="submit" className="activity-modal-submit-btn">Save</button>
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

export default ProviderTopbarContent; 