import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaStar, FaPhone, FaEnvelope, FaCheckCircle, FaTimesCircle, FaSpinner, FaInbox, FaChartLine, FaUsers, FaMoneyBillWave, FaTools, FaArrowUp, FaCheck, FaTimes, FaInfoCircle, FaSmile, FaCalendarCheck, FaBell, FaUser } from 'react-icons/fa';
import './ServiceProviderDashboard.css';
import ProviderTopbarContent from './ProviderTopbar';

const ServiceProviderDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2); // Example unread count

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

  const statCards = [
    {
      label: 'Total Bookings',
      value: 24,
      growth: '+12%',
      icon: <FaCalendarAlt />,
      growthColor: '#16a34a',
      emoji: '📅',
    },
    {
      label: 'Completed Jobs',
      value: 20,
      growth: '+8%',
      icon: <FaCheckCircle />,
      growthColor: '#16a34a',
      emoji: '✅',
    },
    {
      label: 'Earnings (LKR)',
      value: '120,000',
      growth: '+15%',
      icon: <FaMoneyBillWave />,
      growthColor: '#16a34a',
      emoji: '🔥',
    },
  ];

  const summaryMetrics = [
    {
      label: 'Satisfaction Rate',
      value: '98%',
      icon: <FaSmile />, 
      color: '#16a34a',
    },
    {
      label: 'Avg. Response Time',
      value: '2m 15s',
      icon: <FaClock />, 
      color: '#f59e0b',
    },
    {
      label: 'Jobs This Month',
      value: 18,
      icon: <FaCalendarCheck />, 
      color: '#3b82f6',
    },
    {
      label: 'Avg. Rating',
      value: '4.8',
      icon: <FaStar />, 
      color: '#fbbf24',
    },
  ];

  // Helper to get emoji and background class for each service type
  const getServiceEmoji = (service) => {
    switch (service) {
      case 'Plumbing':
        return { emoji: '🛠', bgClass: 'service-emoji-plumbing' };
      case 'Electrical':
        return { emoji: '⚡', bgClass: 'service-emoji-electrical' };
      case 'AC Service':
        return { emoji: '❄️', bgClass: 'service-emoji-ac' };
      case 'Home Cleaning':
        return { emoji: '🧼', bgClass: 'service-emoji-cleaning' };
      default:
        return { emoji: '🔧', bgClass: 'service-emoji-plumbing' };
    }
  };

  // Get provider name from localStorage
  const providerName = localStorage.getItem('provider_fullName') || '';

  return (
    <div className="provider-dashboard-main-bg">
      <div className="dashboard-topbar-row">
        <h1 className="dashboard-welcome-top">Welcome back {providerName && <span>{providerName} !</span>}</h1>

      </div>
      <div className="dashboard-stats-row">
        {statCards.map((stat, idx) => (
          <div className="dashboard-stat-card" key={stat.label}>
            <div className="stat-emoji-circle">
              <span className="stat-emoji" role="img" aria-label={stat.label + ' emoji'}>{stat.emoji}</span>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-growth" style={{ color: stat.growthColor }}>
              <FaArrowUp style={{ marginRight: 4 }} /> {stat.growth}
              <span className="stat-growth-period">from last week</span>
            </div>
          </div>
        ))}
      </div>
      <div className="dashboard-main-content">
        <div className="dashboard-left-col">
          <h3 className="section-title">New Service Requests</h3>
          {newRequests.length === 0 ? (
            <div className="no-requests">No new requests at the moment.</div>
          ) : (
            newRequests.map((req, idx) => {
              const { emoji, bgClass } = getServiceEmoji(req.service);
              return (
                <div
                  className="request-card"
                  key={req.id}
                  style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                >
                  <div className="request-header">
                    <div className="service-title-content">
                      <span className={`service-emoji-circle ${bgClass}`}>{emoji}</span>
                      <strong>{req.service}</strong>
                    </div>
                    <span className="request-new-tag">New</span>
                  </div>
                  <div className="request-customer">{req.customer}</div>
                  <div className="request-details">
                    <div><FaClock className="request-detail-icon" /> {req.date}</div>
                    <div><FaMapMarkerAlt className="request-detail-icon" /> {req.location}</div>
                    <div><FaPhone className="request-detail-icon" /> {req.phone}</div>
                  </div>
                  <div className="request-actions">
                    <button className="request-btn accept" onClick={() => handleAcceptRequest(req.id)}><FaCheck /> Accept</button>
                    <button className="request-btn decline" onClick={() => handleDeclineRequest(req.id)}><FaTimes /> Decline</button>
                    <button className="request-btn details" onClick={() => handleViewDetails(req.id)}><FaInfoCircle /> Details</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="dashboard-right-col">
          <h3 className="section-title">Recent Bookings</h3>
          {recentBookings.map((booking, idx) => {
            const { emoji, bgClass } = getServiceEmoji(booking.service);
            return (
              <div
                className="booking-card"
                key={booking.id}
                style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
              >
                <div className="booking-main-row">
                  <div className="service-title-content">
                    <span className={`service-emoji-circle ${bgClass}`}>{emoji}</span>
                    <strong>{booking.service}</strong>
                  </div>
                  <span className={`booking-status ${booking.status}`}>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                </div>
                <div className="booking-customer">{booking.customer}</div>
                <div className="booking-details-row">
                  <div><FaCalendarAlt className="booking-detail-icon" /> {booking.date}</div>
                  <div><FaMapMarkerAlt className="booking-detail-icon" /> {booking.location}</div>
                </div>
                <div className="booking-amount">{booking.amount}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="dashboard-summary-bar">
        {summaryMetrics.map((metric) => (
          <div className="summary-metric" key={metric.label}>
            <span className="summary-icon" style={{ color: metric.color }}>{metric.icon}</span>
            <span className="summary-value" style={{ color: metric.color }}>{metric.value}</span>
            <span className="summary-label">{metric.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProviderDashboard; 