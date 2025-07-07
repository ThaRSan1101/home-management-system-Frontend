import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaStar, FaPhone, FaEnvelope, FaCheckCircle, FaTimesCircle, FaSpinner, FaInbox, FaChartLine, FaUsers, FaMoneyBillWave, FaTools } from 'react-icons/fa';
import './ServiceProviderDashboard.css';

const ServiceProviderDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

const stats = [
    { 
      label: 'Total Bookings', 
      value: 24, 
      change: '+12%', 
      changeType: 'positive',
      icon: <FaCalendarAlt />,
      color: '#a259e6'
    },
    { 
      label: 'Completed Jobs', 
      value: 20, 
      change: '+8%', 
      changeType: 'positive',
      icon: <FaCheckCircle />,
      color: '#10b981'
    },
    { 
      label: 'Earnings (LKR)', 
      value: '120,000', 
      change: '+15%', 
      changeType: 'positive',
      icon: <FaMoneyBillWave />,
      color: '#f59e0b'
    },
    { 
      label: 'Avg. Rating', 
      value: '4.8/5', 
      change: '+0.2', 
      changeType: 'positive',
      icon: <FaStar />,
      color: '#ef4444'
    },
];

const newRequests = [
    { 
      id: 1,
      service: 'Plumbing', 
      customer: 'Arun Kumar', 
      date: 'Today, 2:00 PM',
      location: 'Colombo 03',
      phone: '+94 71 234 5678',
      email: 'arun@email.com',
      status: 'New',
      priority: 'high'
    },
    { 
      id: 2,
      service: 'Electrical', 
      customer: 'Meena Silva', 
      date: 'Tomorrow, 11:00 AM',
      location: 'Dehiwala',
      phone: '+94 77 345 6789',
      email: 'meena@email.com',
      status: 'New',
      priority: 'medium'
    },
    { 
      id: 3,
      service: 'AC Service', 
      customer: 'Raj Perera', 
      date: 'Today, 4:30 PM',
      location: 'Mount Lavinia',
      phone: '+94 76 456 7890',
      email: 'raj@email.com',
      status: 'New',
      priority: 'low'
    },
  ];

  const recentBookings = [
    {
      id: 1,
      service: 'Home Cleaning',
      customer: 'Sarah Johnson',
      date: 'Mon, 10 June, 10:00 AM',
      location: 'Nugegoda',
      status: 'confirmed',
      amount: 'LKR 2,500'
    },
    {
      id: 2,
      service: 'AC Service',
      customer: 'David Wilson',
      date: 'Wed, 12 June, 2:00 PM',
      location: 'Battaramulla',
      status: 'pending',
      amount: 'LKR 3,200'
    },
    {
      id: 3,
      service: 'Plumbing',
      customer: 'Maria Garcia',
      date: 'Thu, 13 June, 9:00 AM',
      location: 'Maharagama',
      status: 'completed',
      amount: 'LKR 1,800'
    },
  ];

  const earningsData = [
    { day: 'Mon', amount: 2500 },
    { day: 'Tue', amount: 3200 },
    { day: 'Wed', amount: 1800 },
    { day: 'Thu', amount: 4200 },
    { day: 'Fri', amount: 3500 },
    { day: 'Sat', amount: 2800 },
    { day: 'Sun', amount: 2100 },
  ];

  const handleAcceptRequest = (requestId) => {
    // Handle accept logic
    console.log('Accepting request:', requestId);
  };

  const handleDeclineRequest = (requestId) => {
    // Handle decline logic
    console.log('Declining request:', requestId);
  };

  const handleViewDetails = (requestId) => {
    // Handle view details logic
    console.log('Viewing details for request:', requestId);
  };

  return (
  <div className="provider-dashboard-home">
    <div className="provider-dashboard-new-requests">
      <h3>New Requests</h3>
      {newRequests.length === 0 ? (
        <div className="provider-dashboard-no-requests">No new requests at the moment.</div>
      ) : (
        newRequests.map((req, idx) => (
          <div className="provider-dashboard-request-card" key={idx}>
            <div>
              <strong>{req.service}</strong> requested by <span className="provider-dashboard-request-customer">{req.customer}</span>
            </div>
            <div className="provider-dashboard-request-date">{req.date}</div>
            <div className="provider-dashboard-request-status">{req.status}</div>
          </div>
        ))
      )}
    </div>
    <div className="provider-dashboard-stats-grid">
      {stats.map((stat) => (
        <div className="provider-dashboard-stat-card" key={stat.label}>
          <div className="provider-stat-value">{stat.value}</div>
          <div className="provider-stat-label">{stat.label}</div>
          <div className="provider-dashboard-time">
            <div className="time-display">
              <span className="time">{currentTime.toLocaleTimeString()}</span>
              <span className="date">{currentTime.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Statistics Grid */}
    <div className="provider-dashboard-stats-grid">
      {stats.map((stat, index) => (
        <div className="provider-dashboard-stat-card" key={index}>
          <div className="stat-icon" style={{ color: stat.color }}>
            {stat.icon}
          </div>
          <div className="stat-content">
            <div className="provider-stat-value">{stat.value}</div>
            <div className="provider-stat-label">{stat.label}</div>
            <div className={`stat-change ${stat.changeType}`}>
              {stat.change} from last {selectedPeriod}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Main Content Grid */}
    <div className="provider-dashboard-content-grid">
      {/* New Requests Section */}
      <div className="provider-dashboard-section new-requests-section">
        <div className="section-header">
          <h3>New Service Requests</h3>
          <span className="request-count">{newRequests.length} new</span>
        </div>
        <div className="requests-container">
          {newRequests.length === 0 ? (
            <div className="provider-dashboard-no-requests">
              <FaInbox className="empty-icon" />
              <p>No new requests at the moment.</p>
            </div>
          ) : (
            newRequests.map((req) => (
              <div className="provider-dashboard-request-card" key={req.id}>
                <div className="request-header">
                  <div className="request-service">
                    <FaTools className="service-icon" />
                    <strong>{req.service}</strong>
                  </div>
                </div>
                <div className="request-customer">
                  <span className="customer-name">{req.customer}</span>
                </div>
                <div className="request-details">
                  <div className="detail-item">
                    <FaCalendarAlt className="detail-icon" />
                    <span>{req.date}</span>
                  </div>
                  <div className="detail-item">
                    <FaMapMarkerAlt className="detail-icon" />
                    <span>{req.location}</span>
                  </div>
                  <div className="detail-item">
                    <FaPhone className="detail-icon" />
                    <span>{req.phone}</span>
                  </div>
                </div>
                <div className="request-actions">
                  <button 
                    className="action-btn accept-btn"
                    onClick={() => handleAcceptRequest(req.id)}
                  >
                    Accept
                  </button>
                  <button 
                    className="action-btn decline-btn"
                    onClick={() => handleDeclineRequest(req.id)}
                  >
                    Decline
                  </button>
                  <button 
                    className="action-btn details-btn"
                    onClick={() => handleViewDetails(req.id)}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Bookings Section */}
      <div className="provider-dashboard-section recent-bookings-section">
        <div className="section-header">
          <h3>Recent Bookings</h3>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="bookings-container">
          {recentBookings.map((booking) => (
            <div className="provider-booking-card" key={booking.id}>
              <div className="booking-header">
                <div className="booking-service">
                  <strong>{booking.service}</strong>
                </div>
                <span className={`provider-booking-status ${booking.status}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
              <div className="booking-customer">{booking.customer}</div>
              <div className="booking-details">
                <div className="detail-item">
                  <FaCalendarAlt className="detail-icon" />
                  <span>{booking.date}</span>
                </div>
                <div className="detail-item">
                  <FaMapMarkerAlt className="detail-icon" />
                  <span>{booking.location}</span>
                </div>
              </div>
              <div className="booking-amount">{booking.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};

export default ServiceProviderDashboard; 