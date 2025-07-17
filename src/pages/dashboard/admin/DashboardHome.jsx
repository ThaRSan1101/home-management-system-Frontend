import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardHome.css';

const DashboardHome = () => {
  const navigate = useNavigate();

  // Placeholder data
  const customers = Array.from({ length: 10 }, (_, i) => ({ name: `Customer ${i + 1}` }));
  const providers = Array.from({ length: 10 }, (_, i) => ({ name: `Provider ${i + 1}` }));
  const bookings = Array.from({ length: 10 }, (_, i) => ({ detail: `Booking #${i + 1}` }));

  return (
    <div className="dashboard-home-wrapper">
      <h2 className="dashboard-overview-heading">Overview</h2>
      <div className="dashboard-stats-row">
        <div className="dashboard-stat-box">Customers<br /><span className="dashboard-stat-count">--</span></div>
        <div className="dashboard-stat-box">Service Providers<br /><span className="dashboard-stat-count">--</span></div>
        <div className="dashboard-stat-box">Successful Services and Subscriptions<br /><span className="dashboard-stat-count">--</span></div>
        <div className="dashboard-stat-box">Total Income<br /><span className="dashboard-stat-count">--</span></div>
      </div>
      <div className="dashboard-fullwidth-row">
        <div className="dashboard-fullwidth-box">
          <div className="dashboard-fullwidth-title">New Customers</div>
          <ul className="dashboard-list">
            {customers.map((c, i) => (
              <li key={i} className="dashboard-list-item">
                <span>{c.name}</span>
                <button className="dashboard-view-btn" onClick={() => navigate('/admin/dashboard/:userId/customer')}>View</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard-fullwidth-box">
          <div className="dashboard-fullwidth-title">New Service Providers</div>
          <ul className="dashboard-list">
            {providers.map((p, i) => (
              <li key={i} className="dashboard-list-item">
                <span>{p.name}</span>
                <button className="dashboard-view-btn" onClick={() => navigate('/admin/dashboard/:userId/provider')}>View</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard-fullwidth-box">
          <div className="dashboard-fullwidth-title">Latest Service Bookings</div>
          <ul className="dashboard-list">
            {bookings.map((b, i) => (
              <li key={i} className="dashboard-list-item">
                <span>{b.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 