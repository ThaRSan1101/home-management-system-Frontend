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
    // Use static placeholder data for now
    setStats({
      bookings: 2,
      subscriptions: 1,
      feedback: 3,
      services: 4,
    });
    setUpcoming([
      { id: 1, service: 'Plumbing', date: '2025-08-05', time: '10:00 AM', status: 'Pending' },
      { id: 2, service: 'Cleaning', date: '2025-08-07', time: '2:00 PM', status: 'Confirmed' }
    ]);
  }, []);

  return (
    <div className="customer-home">
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