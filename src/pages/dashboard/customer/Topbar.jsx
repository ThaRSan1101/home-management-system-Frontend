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

const notifications = [
  { id: 1, message: 'Your booking for Home Cleaning is confirmed.', time: '2 hours ago' },
  { id: 2, message: 'Subscription payment received.', time: '1 day ago' },
  { id: 3, message: 'Plumbing service completed.', time: '3 days ago' },
];

const Topbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    nic: '',
  });
  const [customerData, setCustomerData] = useState({
    fullName: localStorage.getItem('customer_fullName') || '',
    address: localStorage.getItem('customer_address') || '',
    phone: localStorage.getItem('customer_phone') || '',
    email: localStorage.getItem('customer_email') || '',
    joined: localStorage.getItem('customer_joined') || '',
    nic: localStorage.getItem('customer_nic') || '',
  });
  const profileRef = useRef();
  const notifRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleEditProfile = () => {
    setEditData({
      fullName: customerData.fullName,
      address: customerData.address,
      phone: customerData.phone,
      email: customerData.email,
      nic: customerData.nic,
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
    const user_id = localStorage.getItem('customer_user_id');
    if (!user_id) {
      toast.error('User ID not found. Please log in again.');
      return;
    }
    const payload = {
      user_id,
      name: editData.fullName,
      email: editData.email,
      phone_number: editData.phone,
      address: editData.address,
      nic: editData.nic,
    };
    try {
      const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/update_customer_profile.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (result.status === 'success') {
        localStorage.setItem('customer_fullName', editData.fullName);
        localStorage.setItem('customer_address', editData.address);
        localStorage.setItem('customer_phone', editData.phone);
        localStorage.setItem('customer_email', editData.email);
        localStorage.setItem('customer_nic', editData.nic);
        setCustomerData((prev) => ({ ...prev, ...editData }));
        setEditOpen(false);
        toast.success('Your profile was updated successfully.');
      } else {
        toast.error(result.message || 'Failed to update profile.');
      }
    } catch (err) {
      toast.error(err.message || 'Unknown error occurred.');
    }
  };

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
          <FaUser className="topbar-profile-icon solid" size={38} onClick={() => setProfileOpen((o) => !o)} />
          {profileOpen && (
            <div className="profile-card-dropdown">
              <div className="profile-card-header">Customer Profile</div>
              <div className="profile-card-row"><span>Full Name:</span> {customerData.fullName}</div>
              <div className="profile-card-row"><span>Address:</span> {customerData.address}</div>
              <div className="profile-card-row"><span>Phone:</span> {customerData.phone}</div>
              <div className="profile-card-row"><span>Email:</span> {customerData.email}</div>
              <div className="profile-card-row"><span>Joined:</span> {customerData.joined}</div>
              <div className="profile-card-row"><span>NIC:</span> {customerData.nic}</div>
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
                <input name="email" value={editData.email} onChange={handleEditChange} required type="email" />
              </label>
              <label>NIC
                <input name="nic" value={editData.nic} onChange={handleEditChange} required />
              </label>
              <div className="customer-edit-modal-actions">
                <button type="button" className="customer-edit-cancel-btn" onClick={() => setEditOpen(false)}>Cancel</button>
                <button type="submit" className="customer-edit-save-btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar; 