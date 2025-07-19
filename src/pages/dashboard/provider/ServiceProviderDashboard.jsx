import React, { useEffect, useState } from 'react';
import './ServiceProviderDashboard.css';

const statLabels = [
  { key: 'bookings', label: 'Booking Request' },
  { key: 'subscriptions', label: 'Total Subscriptions' },
  { key: 'services', label: 'Total Services' },
  { key: 'feedback', label: 'Total Feedback' },
];

const ServiceProviderDashboard = () => {
  const [stats, setStats] = useState({
    bookings: 0,
    subscriptions: 0,
    feedback: 0,
    services: 0,
  });
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    setStats({
      bookings: Number(localStorage.getItem('provider_bookings') || 0),
      subscriptions: Number(localStorage.getItem('provider_subscriptions') || 0),
      feedback: Number(localStorage.getItem('provider_feedback') || 0),
      services: Number(localStorage.getItem('provider_services') || 0),
    });
    // Load bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem('provider_service_bookings') || '[]');
    setUpcoming(allBookings.filter(b => b.status === 'Pending' || b.status === 'Processing'));
  }, []);

  // Get provider name from localStorage
  const providerName = localStorage.getItem('provider_fullName') || '';

  return (
    <div className="provider-home">
      <div className="provider-dashboard-welcome-msg">
        <span>Welcome back</span>
        {providerName && <span className="provider-dashboard-welcome-username">{providerName} !</span>}
      </div>
      <div className="provider-dashboard-stats-grid">
        {statLabels.map((stat) => (
          <div className="provider-dashboard-stat-card" key={stat.key}>
            <div className="provider-stat-value">{stats[stat.key]}</div>
            <div className="provider-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="provider-dashboard-new-request">
        <h3>New Request</h3>
        <div className="provider-request-table-container">
          <table className="provider-request-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Plumbing</td>
                <td>Arun Kumar</td>
                <td>2024-07-10</td>
                <td>2:00 PM</td>
                <td>Colombo 03</td>
                <td>
                  <button className="provider-action-btn accept">Accept</button>
                  <button className="provider-action-btn decline">Decline</button>
                </td>
              </tr>
              <tr>
                <td>Electrical</td>
                <td>Meena Silva</td>
                <td>2024-07-11</td>
                <td>11:00 AM</td>
                <td>Dehiwala</td>
                <td>
                  <button className="provider-action-btn accept">Accept</button>
                  <button className="provider-action-btn decline">Decline</button>
                </td>
              </tr>
              <tr>
                <td>AC Service</td>
                <td>Raj Perera</td>
                <td>2024-07-12</td>
                <td>4:30 PM</td>
                <td>Mount Lavinia</td>
                <td>
                  <button className="provider-action-btn accept">Accept</button>
                  <button className="provider-action-btn decline">Decline</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDashboard; 