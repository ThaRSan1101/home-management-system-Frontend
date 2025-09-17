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
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState(null);

  // Handler function for viewing appointment details
  const handleViewDetails = (appointmentId, appointmentType) => {
    // Navigate to the appropriate page based on appointment type
    if (appointmentType === 'subscription') {
      window.location.href = `/customer/dashboard/subscription?appointment=${appointmentId}`;
    } else {
      window.location.href = `/customer/dashboard/activity?appointment=${appointmentId}`;
    }
  };

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

        // Fetch upcoming appointments - get both service and subscription bookings
        setAppointmentsLoading(true);
        setAppointmentsError(null);
        
        try {
          // Fetch service bookings
          const serviceResponse = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/service_booking.php?status=pending&limit=3', {
            credentials: 'include',
          });
          
          // Fetch subscription bookings
          const subscriptionResponse = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/subscription_booking.php?status=pending&limit=3', {
            credentials: 'include',
          });
          
          const allAppointments = [];
          
          // Process service bookings
          if (serviceResponse.ok) {
            const serviceData = await serviceResponse.json();
            if (serviceData.status === 'success') {
              const serviceAppointments = (serviceData.data || []).map(item => ({
                id: item.service_book_id,
                service: item.service_name || `Service #${item.service_category_id}`,
                date: new Date(item.service_date).toLocaleDateString(),
                time: item.service_time,
                status: item.serbooking_status.charAt(0).toUpperCase() + item.serbooking_status.slice(1),
                address: item.service_address,
                provider: item.provider_name || 'Unassigned',
                amount: item.service_amount || item.amount,
                type: 'service'
              }));
              allAppointments.push(...serviceAppointments);
            }
          }
          
          // Process subscription bookings
          if (subscriptionResponse.ok) {
            const subscriptionData = await subscriptionResponse.json();
            if (subscriptionData.status === 'success') {
              const subscriptionAppointments = (subscriptionData.data || []).map(item => ({
                id: item.subbook_id,
                service: item.plan_name || item.category || `Subscription #${item.sub_id}`,
                date: new Date(item.sub_date).toLocaleDateString(),
                time: item.sub_time,
                status: item.subbooking_status.charAt(0).toUpperCase() + item.subbooking_status.slice(1),
                address: item.sub_address,
                provider: item.provider_name || 'Unassigned',
                amount: item.service_amount || item.amount,
                type: 'subscription'
              }));
              allAppointments.push(...subscriptionAppointments);
            }
          }
          
          // Sort by date and take the first 5
          allAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
          setUpcoming(allAppointments.slice(0, 5));
          
        } catch (err) {
          setAppointmentsError('Failed to fetch appointments');
        }
      } catch (err) {
        console.error('Dashboard error:', err);
        setError(err.message || 'Failed to load dashboard data');
        setAppointmentsError('Failed to load appointments');
      } finally {
        setLoading(false);
        setAppointmentsLoading(false);
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
        
        {appointmentsLoading ? (
          <div className="customer-appointment-card customer-loading-state">
            <div className="customer-loading-spinner"></div>
            <span>Loading appointments...</span>
          </div>
        ) : appointmentsError ? (
          <div className="customer-appointment-card customer-error-state">
            <div className="customer-error-icon">⚠️</div>
            <div className="customer-error-text">
              <strong>Failed to load appointments</strong>
              <p>{appointmentsError}</p>
              <button className="customer-btn customer-btn-secondary" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          </div>
        ) : upcoming.length === 0 ? (
          <div className="customer-appointment-card customer-empty-state">
            <div className="customer-empty-text">
              <strong>No upcoming appointments</strong>
              <p>You don't have any scheduled appointments at the moment.</p>
              <button className="customer-book-service-btn" onClick={() => window.location.href = '/customer/dashboard/service'}>
                Book a Service
              </button>
            </div>
          </div>
        ) : (
          upcoming.map((appointment) => (
            <div className="customer-appointment-card" key={appointment.id}>
              <div className="customer-appointment-main">
                <div className="customer-appointment-service">
                  <strong>{appointment.service}</strong>
                  <span className="customer-appointment-date">{appointment.date} at {appointment.time}</span>
                </div>
                <div className="customer-appointment-table">
                  <div className="customer-appointment-row">
                    <div className="customer-appointment-cell">
                      <span className="customer-detail-label">Provider:</span>
                      <span className="customer-detail-value">{appointment.provider}</span>
                    </div>
                    <div className="customer-appointment-cell">
                      <span className="customer-detail-label">Address:</span>
                      <span className="customer-detail-value">{appointment.address}</span>
                    </div>
                  </div>
                  <div className="customer-appointment-row">
                    <div className="customer-appointment-cell">
                      <span className="customer-detail-label">Status:</span>
                      <span className={`customer-detail-value ${appointment.status.toLowerCase() === 'pending' ? 'status-pending' : ''}`}>
                        {appointment.status}
                      </span>
                    </div>
                    {appointment.amount && (
                      <div className="customer-appointment-cell">
                        <span className="customer-detail-label">Amount:</span>
                        <span className="customer-detail-value">${appointment.amount}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="customer-appointment-actions">
                <div className="customer-appointment-buttons">
                  <button className="customer-btn customer-btn-primary" onClick={() => handleViewDetails(appointment.id, appointment.type)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;