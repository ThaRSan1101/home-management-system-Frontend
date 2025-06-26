import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Bookings from './provider/Bookings';
import Services from './provider/Services';
import Profile from './provider/Profile';
import Notifications from './provider/Notifications';
import './ServiceProviderDashboard.css';

const ServiceProviderDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/provider/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/provider/dashboard/bookings', label: 'Bookings', icon: '📅' },
    { path: '/provider/dashboard/services', label: 'Services', icon: '🔧' },
    { path: '/provider/dashboard/reviews', label: 'Reviews', icon: '⭐' },
    { path: '/provider/dashboard/notifications', label: 'Notifications', icon: '🔔' },
    { path: '/provider/dashboard/profile', label: 'Profile', icon: '👤' },
  ];

  const DashboardOverview = () => (
    <div className="dashboard-overview">
      <div className="overview-header">
        <h1>Service Provider Dashboard</h1>
        <p>Welcome back! Here's your business overview.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>Total Bookings</h3>
            <p className="stat-number">24</p>
            <p className="stat-change positive">+12% this month</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Revenue</h3>
            <p className="stat-number">$2,450</p>
            <p className="stat-change positive">+8% this month</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>Rating</h3>
            <p className="stat-number">4.8</p>
            <p className="stat-change positive">+0.2 this month</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Active Services</h3>
            <p className="stat-number">8</p>
            <p className="stat-change neutral">No change</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section-card">
          <h3>Recent Bookings</h3>
          <div className="recent-bookings">
            <div className="booking-item">
              <div className="booking-info">
                <h4>Plumbing Repair</h4>
                <p>John Smith • Today 2:30 PM</p>
              </div>
              <span className="status pending">Pending</span>
            </div>
            <div className="booking-item">
              <div className="booking-info">
                <h4>Electrical Installation</h4>
                <p>Sarah Johnson • Tomorrow 10:00 AM</p>
              </div>
              <span className="status confirmed">Confirmed</span>
            </div>
            <div className="booking-item">
              <div className="booking-info">
                <h4>HVAC Maintenance</h4>
                <p>Mike Wilson • Yesterday 4:15 PM</p>
              </div>
              <span className="status completed">Completed</span>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <button className="action-btn">
              <span className="action-icon">➕</span>
              Add New Service
            </button>
            <button className="action-btn">
              <span className="action-icon">📅</span>
              View Schedule
            </button>
            <button className="action-btn">
              <span className="action-icon">💰</span>
              View Earnings
            </button>
            <button className="action-btn">
              <span className="action-icon">📊</span>
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="service-provider-dashboard">
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Provider Panel</h2>
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
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
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
          <Route path="/services" element={<Services />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default ServiceProviderDashboard; 