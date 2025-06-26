import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 234 567 8900',
    location: 'New York, USA',
    bio: 'Professional plumber with 10+ years of experience. Specialized in residential and commercial plumbing services.',
    services: ['Plumbing', 'Water Heater Installation', 'Pipe Repair'],
    experience: '10+ years',
    rating: 4.8,
    totalReviews: 156,
    completedJobs: 342
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="provider-profile">
      <div className="profile-header">
        <h1>Profile</h1>
        {!isEditing ? (
          <button className="edit-btn" onClick={handleEdit}>
            Edit Profile
          </button>
        ) : (
          <div className="edit-actions">
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <div className="profile-image">
            <div className="image-placeholder">
              {profile.name.charAt(0)}
            </div>
            {isEditing && (
              <button className="change-photo-btn">
                Change Photo
              </button>
            )}
          </div>

          <div className="profile-info">
            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editedProfile.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editedProfile.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={editedProfile.bio}
                    onChange={handleChange}
                    rows="4"
                  />
                </div>
              </div>
            ) : (
              <>
                <h2>{profile.name}</h2>
                <p className="email">{profile.email}</p>
                <p className="phone">{profile.phone}</p>
                <p className="location">{profile.location}</p>
                <p className="bio">{profile.bio}</p>
              </>
            )}
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <h3>Rating</h3>
            <div className="stat-value">{profile.rating}</div>
            <div className="stat-label">out of 5</div>
          </div>
          <div className="stat-card">
            <h3>Reviews</h3>
            <div className="stat-value">{profile.totalReviews}</div>
            <div className="stat-label">total reviews</div>
          </div>
          <div className="stat-card">
            <h3>Experience</h3>
            <div className="stat-value">{profile.experience}</div>
            <div className="stat-label">years</div>
          </div>
          <div className="stat-card">
            <h3>Completed Jobs</h3>
            <div className="stat-value">{profile.completedJobs}</div>
            <div className="stat-label">total jobs</div>
          </div>
        </div>

        <div className="services-section">
          <h2>Services Offered</h2>
          <div className="services-list">
            {profile.services.map((service, index) => (
              <div key={index} className="service-tag">
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 