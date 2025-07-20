import React, { useEffect, useState } from 'react';
import './ServiceProviderDashboard.css';

const statLabels = [
  { key: 'bookings', label: 'Booking Request' },
  { key: 'subscriptions', label: 'Total Subscriptions' },
  { key: 'services', label: 'Total Services' },
  { key: 'feedback', label: 'Total Feedback' },
];

const initialRequests = [
  { id: 1, service: 'Plumbing', customer: 'Arun Kumar', date: '2024-07-10', time: '2:00 PM', location: 'Colombo 03' },
  { id: 2, service: 'Electrical', customer: 'Meena Silva', date: '2024-07-11', time: '11:00 AM', location: 'Dehiwala' },
  { id: 3, service: 'AC Service', customer: 'Raj Perera', date: '2024-07-12', time: '4:30 PM', location: 'Mount Lavinia' },
];

const ServiceProviderDashboard = () => {
  const [stats, setStats] = useState({
    bookings: 0,
    subscriptions: 0,
    feedback: 0,
    services: 0,
  });
  const [requests, setRequests] = useState(() => {
    const stored = localStorage.getItem('provider_new_requests');
    return stored ? JSON.parse(stored) : initialRequests;
  });
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [declineRequest, setDeclineRequest] = useState(null);

  useEffect(() => {
    setStats({
      bookings: Number(localStorage.getItem('provider_bookings') || 0),
      subscriptions: Number(localStorage.getItem('provider_subscriptions') || 0),
      feedback: Number(localStorage.getItem('provider_feedback') || 0),
      services: Number(localStorage.getItem('provider_services') || 0),
    });
  }, []);

  // Get provider name from localStorage
  const providerName = localStorage.getItem('provider_fullName') || '';

  const handleAccept = (req) => {
    // Remove from new requests
    const updatedRequests = requests.filter(r => r.id !== req.id);
    setRequests(updatedRequests);
    localStorage.setItem('provider_new_requests', JSON.stringify(updatedRequests));
    // Add to processing in activity page
    const activities = JSON.parse(localStorage.getItem('provider_service_activities') || '[]');
    activities.push({ ...req, status: 'processing' });
    localStorage.setItem('provider_service_activities', JSON.stringify(activities));
  };

  const handleDecline = (req) => {
    setDeclineRequest(req);
    setShowDeclineModal(true);
    setDeclineReason('');
  };

  const handleDeclineSubmit = () => {
    if (!declineReason.trim()) return;
    // Remove from new requests
    const updatedRequests = requests.filter(r => r.id !== declineRequest.id);
    setRequests(updatedRequests);
    localStorage.setItem('provider_new_requests', JSON.stringify(updatedRequests));
    // Add to cancel in activity page
    const activities = JSON.parse(localStorage.getItem('provider_service_activities') || '[]');
    activities.push({ ...declineRequest, status: 'cancel', cancelReason: declineReason });
    localStorage.setItem('provider_service_activities', JSON.stringify(activities));
    setShowDeclineModal(false);
    setDeclineRequest(null);
    setDeclineReason('');
  };

  useEffect(() => {
    localStorage.setItem('provider_new_requests', JSON.stringify(requests));
  }, [requests]);

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
              {requests.length === 0 ? (
                <tr><td colSpan={6} style={{textAlign:'center',color:'#888',padding:'2rem 0'}}>No new requests.</td></tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id}>
                    <td>{req.service}</td>
                    <td>{req.customer}</td>
                    <td>{req.date}</td>
                    <td>{req.time}</td>
                    <td>{req.location}</td>
                    <td>
                      <button className="provider-action-btn accept" onClick={() => handleAccept(req)}>Accept</button>
                      <button className="provider-action-btn decline" onClick={() => handleDecline(req)}>Decline</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showDeclineModal && (
        <div className="activity-modal-overlay">
          <div className="activity-modal">
            <h3>Cancel Service</h3>
            <textarea
              className="activity-modal-textarea"
              placeholder="Enter reason for cancellation..."
              value={declineReason}
              onChange={e => setDeclineReason(e.target.value)}
              rows={3}
            />
            <div className="activity-modal-actions">
              <button className="activity-modal-cancel-btn" onClick={() => setShowDeclineModal(false)}>Close</button>
              <button className="activity-modal-submit-btn" onClick={handleDeclineSubmit} disabled={!declineReason.trim()}>Submit</button>
            </div>
          </div>
      </div>
      )}
    </div>
  );
};

export default ServiceProviderDashboard; 