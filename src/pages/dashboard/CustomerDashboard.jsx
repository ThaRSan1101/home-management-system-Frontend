import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaBell, FaUser, FaStar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './CustomerDashboard.css';

// Import dashboard components
import Bookings from './customer/Bookings';
import Notifications from './customer/Notifications';
import Profile from './customer/Profile';

const CustomerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/customer/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/customer/dashboard/bookings', label: 'Bookings', icon: '📅' },
    { path: '/customer/dashboard/notifications', label: 'Notifications', icon: '🔔' },
    { path: '/customer/dashboard/profile', label: 'Profile', icon: '👤' },
  ];

  const isActiveRoute = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="customer-dashboard">
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Customer Panel</h2>
          <button 
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActiveRoute(item.path, item.exact) ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {isSidebarOpen && <span className="nav-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <span className="logout-icon">🚪</span>
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = () => {
  const stats = [
    {
      title: 'Active Bookings',
      value: '3',
      icon: '📅',
      color: '#3B82F6'
    },
    {
      title: 'Completed Services',
      value: '12',
      icon: '✅',
      color: '#10B981'
    },
    {
      title: 'Total Spent',
      value: '$450',
      icon: '💰',
      color: '#F59E0B'
    },
    {
      title: 'Reviews Given',
      value: '8',
      icon: '⭐',
      color: '#8B5CF6'
    }
  ];

  const recentBookings = [
    {
      id: 1,
      service: 'Plumbing Repair',
      provider: 'Mike Johnson',
      date: '2024-01-15',
      status: 'Scheduled',
      amount: '$120'
    },
    {
      id: 2,
      service: 'House Cleaning',
      provider: 'Sarah Smith',
      date: '2024-01-12',
      status: 'Completed',
      amount: '$80'
    },
    {
      id: 3,
      service: 'Electrical Work',
      provider: 'David Wilson',
      date: '2024-01-10',
      status: 'Completed',
      amount: '$200'
    }
  ];

  return (
    <div className="dashboard-overview">
      <div className="overview-header">
        <h1>Customer Dashboard</h1>
        <p>Welcome back! Here's your service overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">
              <span>{stat.icon}</span>
            </div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <p className="stat-number">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        {/* Recent Bookings */}
        <div className="section-card">
          <h3>Recent Bookings</h3>
          <div className="recent-bookings">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="booking-item">
                <div className="booking-info">
                  <h4>{booking.service}</h4>
                  <p>{booking.provider} • {booking.date}</p>
                </div>
                <div className="booking-status">
                  <span className={`status ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                  <p className="booking-amount">{booking.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="section-card">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <Link to="/services" className="action-btn">
              <span className="action-icon">🔧</span>
              Book a Service
            </Link>
            <Link to="/customer/dashboard/profile" className="action-btn">
              <span className="action-icon">👤</span>
              Update Profile
            </Link>
            <Link to="/contact" className="action-btn">
              <span className="action-icon">📞</span>
              Get Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings Component
const Settings = () => {
  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <p>Settings page content will be implemented here.</p>
    </div>
  );
};

export default CustomerDashboard; 