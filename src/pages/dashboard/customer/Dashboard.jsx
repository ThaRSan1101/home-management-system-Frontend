import React from 'react';
import './Dashboard.css';

const stats = [
  { label: 'Upcoming Bookings', value: 3 },
  { label: 'Active Subscriptions', value: 1 },
  { label: 'Feedback Given', value: 2 },
  { label: 'Total Services Used', value: 7 },
];

const Dashboard = () => (
  <div className="customer-home">
    <h2 className="customer-dashboard-title">Welcome back!</h2>
    <div className="customer-dashboard-stats-grid">
      {stats.map((stat) => (
        <div className="customer-dashboard-stat-card" key={stat.label}>
          <div className="customer-stat-value">{stat.value}</div>
          <div className="customer-stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
    <div className="customer-dashboard-appointments">
      <h3>Upcoming Appointments</h3>
      <div className="customer-appointment-card">
        <div>
          <strong>Cleaning Service</strong> <span className="customer-appointment-date">Mon, 10 June, 10:00 AM</span>
        </div>
        <div className="customer-appointment-status customer-confirmed">Confirmed</div>
      </div>
      <div className="customer-appointment-card">
        <div>
          <strong>Plumbing Repair</strong> <span className="customer-appointment-date">Wed, 12 June, 2:00 PM</span>
        </div>
        <div className="customer-appointment-status customer-pending">Pending</div>
      </div>
    </div>
  </div>
);

export default Dashboard; 