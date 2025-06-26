import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaStar } from 'react-icons/fa';
import './Bookings.css';

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('all');

  const bookings = [
    {
      id: 1,
      service: 'Plumbing Repair',
      provider: 'Mike Johnson',
      providerAvatar: 'https://via.placeholder.com/50x50/3B82F6/ffffff?text=MJ',
      date: '2024-01-15',
      time: '10:00 AM',
      address: '123 Main St, City, State',
      status: 'Scheduled',
      amount: '$120',
      rating: 4.8,
      phone: '+1 (555) 123-4567',
      email: 'mike@example.com'
    },
    {
      id: 2,
      service: 'House Cleaning',
      provider: 'Sarah Smith',
      providerAvatar: 'https://via.placeholder.com/50x50/10B981/ffffff?text=SS',
      date: '2024-01-12',
      time: '2:00 PM',
      address: '123 Main St, City, State',
      status: 'Completed',
      amount: '$80',
      rating: 4.9,
      phone: '+1 (555) 987-6543',
      email: 'sarah@example.com'
    },
    {
      id: 3,
      service: 'Electrical Work',
      provider: 'David Wilson',
      providerAvatar: 'https://via.placeholder.com/50x50/F59E0B/ffffff?text=DW',
      date: '2024-01-10',
      time: '9:00 AM',
      address: '123 Main St, City, State',
      status: 'Completed',
      amount: '$200',
      rating: 4.7,
      phone: '+1 (555) 456-7890',
      email: 'david@example.com'
    },
    {
      id: 4,
      service: 'HVAC Maintenance',
      provider: 'Emily Davis',
      providerAvatar: 'https://via.placeholder.com/50x50/8B5CF6/ffffff?text=ED',
      date: '2024-01-20',
      time: '11:00 AM',
      address: '123 Main St, City, State',
      status: 'Cancelled',
      amount: '$150',
      rating: 4.6,
      phone: '+1 (555) 321-6540',
      email: 'emily@example.com'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Bookings', count: bookings.length },
    { id: 'scheduled', label: 'Scheduled', count: bookings.filter(b => b.status === 'Scheduled').length },
    { id: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'Completed').length },
    { id: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'Cancelled').length }
  ];

  const filteredBookings = activeTab === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status.toLowerCase() === activeTab);

  return (
    <div className="bookings-page">
      <div className="page-header">
        <h1>My Bookings</h1>
        <p>Manage and track all your service bookings</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <span className="tab-count">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="bookings-container">
        {filteredBookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>No bookings found</h3>
            <p>You don't have any {activeTab} bookings at the moment.</p>
          </div>
        ) : (
          <div className="bookings-grid">
            {filteredBookings.map(booking => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <div className="booking-title">
                    <h3>{booking.service}</h3>
                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="booking-amount">{booking.amount}</div>
                </div>

                <div className="provider-info">
                  <img 
                    src={booking.providerAvatar} 
                    alt={booking.provider}
                    className="provider-avatar"
                  />
                  <div className="provider-details">
                    <h4>{booking.provider}</h4>
                    <div className="provider-rating">
                      <FaStar className="star-icon" />
                      <span>{booking.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="booking-details">
                  <div className="detail-item">
                    <FaCalendarAlt className="detail-icon" />
                    <span>{booking.date} at {booking.time}</span>
                  </div>
                  <div className="detail-item">
                    <FaMapMarkerAlt className="detail-icon" />
                    <span>{booking.address}</span>
                  </div>
                </div>

                <div className="booking-actions">
                  <button className="action-btn primary">
                    <FaPhone />
                    Call Provider
                  </button>
                  <button className="action-btn secondary">
                    <FaEnvelope />
                    Message
                  </button>
                  {booking.status === 'Completed' && (
                    <button className="action-btn review">
                      <FaStar />
                      Write Review
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings; 