import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const statLabels = [
  { key: 'bookings', label: 'Upcoming Bookings' },
  { key: 'subscriptions', label: 'Active Subscriptions' },
  { key: 'feedback', label: 'Feedback Given' },
  { key: 'services', label: 'Total Services Used' },
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    bookings: 0,
    subscriptions: 0,
    feedback: 0,
    services: 0,
  });
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    setStats({
      bookings: Number(localStorage.getItem('customer_bookings') || 0),
      subscriptions: Number(localStorage.getItem('customer_subscriptions') || 0),
      feedback: Number(localStorage.getItem('customer_feedback') || 0),
      services: Number(localStorage.getItem('customer_services') || 0),
    });
    // Load bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem('customer_service_bookings') || '[]');
    setUpcoming(allBookings.filter(b => b.status === 'Pending' || b.status === 'Processing'));
  }, []);

  return (
    <div className="customer-home">
      <h2 className="customer-dashboard-title">Welcome back!</h2>
      <div className="customer-dashboard-stats-grid">
        {statLabels.map((stat) => (
          <div className="customer-dashboard-stat-card" key={stat.key}>
            <div className="customer-stat-value">{stats[stat.key]}</div>
            <div className="customer-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="customer-dashboard-appointments">
        <h3>Upcoming Appointments</h3>
        {upcoming.length === 0 ? (
          <div className="customer-appointment-card">No upcoming appointments.</div>
        ) : (
          upcoming.map((b) => (
            <div className="customer-appointment-card" key={b.id}>
              <div>
                <strong>{b.service}</strong> <span className="customer-appointment-date">{b.date}, {b.time}</span>
              </div>
              <div className={`customer-appointment-status customer-${b.status.toLowerCase()}`}>{b.status}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard; 