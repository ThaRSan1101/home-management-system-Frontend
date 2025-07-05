import React from 'react';
import './ServiceProviderDashboard.css';

const stats = [
  { label: 'Total Bookings', value: 24 },
  { label: 'Completed Jobs', value: 20 },
  { label: 'Earnings (LKR)', value: '120,000' },
  { label: 'Avg. Rating', value: '4.8/5' },
];

const newRequests = [
  { service: 'Plumbing', customer: 'Arun', date: 'Today, 2:00 PM', status: 'New' },
  { service: 'Electrical', customer: 'Meena', date: 'Tomorrow, 11:00 AM', status: 'New' },
];

const ServiceProviderDashboard = () => (
  <div className="provider-dashboard-home">
    <h2 className="provider-dashboard-title">Welcome, Provider!</h2>
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
        </div>
      ))}
    </div>
    <div className="provider-dashboard-section">
      <h3>Recent Bookings</h3>
      <div className="provider-booking-card">
        <div>
          <strong>Home Cleaning</strong> <span className="provider-booking-date">Mon, 10 June, 10:00 AM</span>
        </div>
        <div className="provider-booking-status confirmed">Confirmed</div>
      </div>
      <div className="provider-booking-card">
        <div>
          <strong>AC Service</strong> <span className="provider-booking-date">Wed, 12 June, 2:00 PM</span>
        </div>
        <div className="provider-booking-status pending">Pending</div>
      </div>
    </div>
  </div>
);

export default ServiceProviderDashboard; 