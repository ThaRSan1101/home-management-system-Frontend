import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: '👥'
    },
    {
      title: 'Service Providers',
      value: '456',
      change: '+8%',
      icon: '👨‍🔧'
    },
    {
      title: 'Active Services',
      value: '789',
      change: '+15%',
      icon: '🔧'
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+20%',
      icon: '💰'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'New Registration',
      user: 'John Doe',
      time: '5 minutes ago',
      icon: '📝'
    },
    {
      id: 2,
      type: 'Service Completed',
      provider: 'Mike Smith',
      service: 'Plumbing',
      time: '1 hour ago',
      icon: '✅'
    },
    {
      id: 3,
      type: 'Payment Received',
      amount: '$150',
      time: '2 hours ago',
      icon: '💳'
    },
    {
      id: 4,
      type: 'New Review',
      user: 'Sarah Johnson',
      rating: '5 stars',
      time: '3 hours ago',
      icon: '⭐'
    }
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-change positive">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="recent-activities">
          <h2>Recent Activities</h2>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-details">
                  <div className="activity-type">{activity.type}</div>
                  <div className="activity-info">
                    {activity.user && <span>{activity.user}</span>}
                    {activity.provider && <span>{activity.provider}</span>}
                    {activity.service && <span>{activity.service}</span>}
                    {activity.amount && <span>{activity.amount}</span>}
                    {activity.rating && <span>{activity.rating}</span>}
                  </div>
                </div>
                <div className="activity-time">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-btn">
              <span className="action-icon">👥</span>
              Manage Users
            </button>
            <button className="action-btn">
              <span className="action-icon">👨‍🔧</span>
              Manage Providers
            </button>
            <button className="action-btn">
              <span className="action-icon">🔧</span>
              Manage Services
            </button>
            <button className="action-btn">
              <span className="action-icon">📊</span>
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 