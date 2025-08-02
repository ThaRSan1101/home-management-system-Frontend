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

const ServiceProviderDashboard = ({ providerName = '' }) => {
  const [providerId, setProviderId] = useState(null);
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    bookings: 0,
    subscriptions: 0,
    feedback: 0,
    services: 0,
  });

// Fetch provider_id on mount
useEffect(() => {
  fetch('http://localhost/project-root/backend/home-management-system-Backend/api/provider_profile.php', {
    credentials: 'include',
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        setProviderId(data.provider_id);
      } else {
        console.error('Provider profile fetch error:', data.message);
      }
    })
    .catch(err => {
      console.error('Provider profile fetch error:', err);
    });
}, []);

// Fetch new requests for this provider
useEffect(() => {
  if (!providerId) return;
  fetch(`http://localhost/project-root/backend/home-management-system-Backend/api/service_booking.php?provider_requests=1&provider_id=${providerId}`, {
    credentials: 'include',
  })
    .then(async res => {
      let text = await res.text();
      try {
        const data = JSON.parse(text);
        if (data.status === 'success') {
          const mapped = (data.data || []).map(b => ({
            id: b.service_book_id,
            service: b.category_name || 'Service',
            customer: b.customer_name || '',
            date: b.service_date,
            time: b.service_time,
            location: b.service_address,
          }));
          setRequests(mapped);
        } else {
          console.error('Provider Requests API Error:', data.message);
        }
      } catch (e) {
        console.error('Provider Requests API Invalid JSON:', text);
      }
    })
    .catch(err => {
      console.error('Provider Requests API Fetch Error:', err);
    });
}, [providerId]);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [declineRequest, setDeclineRequest] = useState(null);

  useEffect(() => {
    // Fetch stats from backend API here
    // Example:
    // fetch('/api/provider_dashboard.php', { credentials: 'include' })
    //   .then(res => res.json())
    //   .then(data => setStats(data.stats));
    // For now, use default values
    setStats({ bookings: 0, subscriptions: 0, feedback: 0, services: 0 });
  }, []);

  const handleAccept = async (req) => {
    try {
      const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/service_booking.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'accept', service_book_id: req.id, provider_id: providerId })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setRequests(requests.filter(r => r.id !== req.id));
      } else {
        alert(data.message || 'Failed to accept request');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const handleDecline = (req) => {
    setDeclineRequest(req);
    setShowDeclineModal(true);
    setDeclineReason('');
  };

  const handleDeclineSubmit = async () => {
    if (!declineRequest) return;
    try {
      const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/service_booking.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'decline', service_book_id: declineRequest.id, provider_id: providerId })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setRequests(requests.filter(r => r.id !== declineRequest.id));
        setShowDeclineModal(false);
        setDeclineRequest(null);
        setDeclineReason('');
      } else {
        alert(data.message || 'Failed to decline request');
      }
    } catch (err) {
      alert('Network error');
    }
    setRequests(updatedRequests);
    // Optionally, update backend or context with new requests/activities
    // setRequests and setActivities only, no localStorage
    setShowDeclineModal(false);
    setDeclineRequest(null);
    setDeclineReason('');
  };

  // Optionally, sync requests to backend if needed
  // useEffect(() => {
  //   // sync requests to backend
  // }, [requests]);

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