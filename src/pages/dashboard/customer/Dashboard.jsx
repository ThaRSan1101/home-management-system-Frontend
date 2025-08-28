import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const statLabels = [
  { 
    key: 'bookings', 
    label: 'Upcoming Bookings'
  },
  { 
    key: 'subscriptions', 
    label: 'Active Subscriptions'
  },
  { 
    key: 'feedback', 
    label: 'Feedback Given'
  },
  { 
    key: 'services', 
    label: 'Total Services Used'
  },
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    bookings: 0,
    subscriptions: 0,
    feedback: 0,
    services: 0,
  });
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch dashboard statistics
        const statsResponse = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/customer_dashboard.php', {
          credentials: 'include',
        });
        
        if (!statsResponse.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const statsData = await statsResponse.json();
        
        if (statsData.status === 'success') {
          setStats({
            bookings: statsData.data.upcoming_bookings,
            subscriptions: statsData.data.active_subscriptions,
            feedback: statsData.data.feedback_given,
            services: statsData.data.total_services_used,
          });
        } else {
          throw new Error(statsData.message || 'Failed to load statistics');
        }

        // Fetch upcoming appointments (you might want to add an API endpoint for this as well)
        const upcomingResponse = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/service_booking.php?status=pending,waiting,process&limit=5', {
          credentials: 'include',
        });
        
        if (upcomingResponse.ok) {
          const upcomingData = await upcomingResponse.json();
          if (upcomingData.status === 'success') {
            const mappedAppointments = (upcomingData.data || []).map(item => ({
              id: item.service_book_id,
              service: item.service_name || `Service #${item.service_category_id}`,
              date: new Date(item.service_date).toLocaleDateString(),
              time: item.service_time,
              status: item.serbooking_status.charAt(0).toUpperCase() + item.serbooking_status.slice(1)
            }));
            setUpcoming(mappedAppointments);
          }
        }
      } catch (err) {
        console.error('Dashboard error:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="customer-home">
        <div className="loading-spinner">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="customer-home">
        <div className="error-message">{error}</div>
      </div>
    );
  }

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