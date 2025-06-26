import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, City, State 12345',
    bio: 'Homeowner looking for reliable and professional home services.',
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsUpdates: false,
      marketingEmails: false
    }
  });

  const [formData, setFormData] = useState(profileData);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  const stats = [
    {
      label: 'Total Bookings',
      value: '15',
      icon: '📅'
    },
    {
      label: 'Completed Services',
      value: '12',
      icon: '✅'
    },
    {
      label: 'Reviews Given',
      value: '8',
      icon: '⭐'
    },
    {
      label: 'Member Since',
      value: '2023',
      icon: '🎉'
    }
  ];

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Manage your account information and preferences</p>
      </div>

      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src="https://via.placeholder.com/120x120/667eea/ffffff?text=JD"
              alt="Profile Avatar"
            />
            {isEditing && (
              <button className="avatar-edit-btn">
                <FaEdit />
              </button>
            )}
          </div>
          <div className="profile-info">
            <h2>{profileData.firstName} {profileData.lastName}</h2>
            <p className="profile-email">{profileData.email}</p>
            <p className="profile-bio">{profileData.bio}</p>
          </div>
          <div className="profile-actions">
            {!isEditing ? (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                <FaEdit />
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSave}>
                  <FaSave />
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  <FaTimes />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Profile Form */}
        <div className="profile-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="firstName">
                  <FaUser />
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">
                  <FaUser />
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">
                  <FaPhone />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="address">
                  <FaMapMarkerAlt />
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows="3"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Notification Preferences</h3>
            <div className="preferences-grid">
              <label className="preference-item">
                <input
                  type="checkbox"
                  name="preferences.notifications"
                  checked={formData.preferences.notifications}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <span className="checkmark"></span>
                <div className="preference-info">
                  <h4>Push Notifications</h4>
                  <p>Receive notifications about your bookings and services</p>
                </div>
              </label>
              <label className="preference-item">
                <input
                  type="checkbox"
                  name="preferences.emailUpdates"
                  checked={formData.preferences.emailUpdates}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <span className="checkmark"></span>
                <div className="preference-info">
                  <h4>Email Updates</h4>
                  <p>Get important updates and confirmations via email</p>
                </div>
              </label>
              <label className="preference-item">
                <input
                  type="checkbox"
                  name="preferences.smsUpdates"
                  checked={formData.preferences.smsUpdates}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <span className="checkmark"></span>
                <div className="preference-info">
                  <h4>SMS Updates</h4>
                  <p>Receive text messages for urgent updates</p>
                </div>
              </label>
              <label className="preference-item">
                <input
                  type="checkbox"
                  name="preferences.marketingEmails"
                  checked={formData.preferences.marketingEmails}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <span className="checkmark"></span>
                <div className="preference-info">
                  <h4>Marketing Emails</h4>
                  <p>Receive promotional offers and newsletters</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 