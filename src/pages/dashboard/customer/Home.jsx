import React from 'react';
import './Home.css';

const stats = [
  { label: 'Upcoming Bookings', value: 3 },
  { label: 'Active Subscriptions', value: 1 },
  { label: 'Feedback Given', value: 2 },
  { label: 'Total Services Used', value: 7 },
];

const Home = () => (
  <div className="customer-home">
    <h2 className="dashboard-title">Welcome back!</h2>
    <div className="dashboard-stats-grid">
      {stats.map((stat) => (
        <div className="dashboard-stat-card" key={stat.label}>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
    <div className="dashboard-appointments">
      <h3>Upcoming Appointments</h3>
      <div className="appointment-card">
        <div>
          <strong>Cleaning Service</strong> <span className="appointment-date">Mon, 10 June, 10:00 AM</span>
        </div>
        <div className="appointment-status confirmed">Confirmed</div>
      </div>
      <div className="appointment-card">
        <div>
          <strong>Plumbing Repair</strong> <span className="appointment-date">Wed, 12 June, 2:00 PM</span>
        </div>
        <div className="appointment-status pending">Pending</div>
      </div>
    </div>
  </div>
);

export default Home; 