import React, { useState, useEffect } from 'react';
import './Services.css';
import { FaInbox, FaSpinner, FaCheckCircle, FaTimesCircle, FaClipboardList, FaTools, FaRegCalendarAlt } from 'react-icons/fa';
import Footer from '../../../components/Footer';

const STATUS_TABS = [
  { key: 'processing', label: 'Processing', icon: <FaSpinner /> },
  { key: 'complete', label: 'Complete', icon: <FaCheckCircle /> },
  { key: 'cancel', label: 'Cancelled', icon: <FaTimesCircle /> },
];

const STATUS_TAB_EMOJIS = {
  processing: '🔄',
  complete: '✅',
  cancel: '❌',
};
const SERVICE_EMOJIS = {
  'Window Cleaning': '🪟',
  'Plumbing': '🛠',
  'Electrical Repair': '💡',
  'Carpet Cleaning': '🧼',
  'AC Service': '❄️',
};

function getTabIcon(tab, isActive) {
  const color = isActive ? '#fff' : '#222';
  switch(tab.key) {
    case 'processing':
      return <FaSpinner style={{marginRight:'8px', color}} />;
    case 'complete':
      return <FaCheckCircle style={{marginRight:'8px', color}} />;
    case 'cancel':
      return <FaTimesCircle style={{marginRight:'8px', color}} />;
    default:
      return null;
  }
}

const SERVICE_TABS = [
  { key: 'processing', label: 'Processing' },
  { key: 'request', label: 'Request' },
  { key: 'complete', label: 'Complete' },
  { key: 'cancel', label: 'Cancel' },
];
const SUBSCRIPTION_TABS = [
  { key: 'processing', label: 'Processing' },
  { key: 'cancel', label: 'Cancel' },
];

const initialServiceActivities = [
  { id: 4, service: 'Electrical Repair', customer: 'Alice Brown', date: '2024-07-04', time: '10:30 AM', location: 'Colombo 01', status: 'processing' },
  { id: 5, service: 'Carpet Cleaning', customer: 'Tom Clark', date: '2024-07-05', time: '1:00 PM', location: 'Colombo 02', status: 'processing' },
  { id: 6, service: 'Plumbing', customer: 'Sara White', date: '2024-07-06', time: '3:30 PM', location: 'Colombo 03', status: 'processing' },
];
const initialSubscriptionActivities = [
  { id: 1, service: 'Monthly Cleaning', customer: 'John Doe', date: '2024-07-10', time: '10:00 AM', location: 'Colombo 10', status: 'processing' },
  { id: 2, service: 'Weekly Gardening', customer: 'Jane Smith', date: '2024-07-11', time: '2:00 PM', location: 'Colombo 11', status: 'processing' },
  { id: 3, service: 'Monthly Cleaning', customer: 'Bob Lee', date: '2024-07-01', time: '9:00 AM', location: 'Colombo 12', status: 'cancel', cancelReason: 'Customer cancelled' },
];

export default function ProviderActivity() {
  const [topTab, setTopTab] = useState('service');
  const [activeTab, setActiveTab] = useState('processing');
  const [serviceActivities, setServiceActivities] = useState({
  processing: [],
  complete: [],
  cancel: []
});
  const [subscriptionActivities, setSubscriptionActivities] = useState(initialSubscriptionActivities);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [modalActivity, setModalActivity] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [completeCharge, setCompleteCharge] = useState('');
  const [completeServiceName, setCompleteServiceName] = useState('');
  const [waitingForCustomer, setWaitingForCustomer] = useState(false);
  const [pendingCompleteId, setPendingCompleteId] = useState(null);
  const [providerId, setProviderId] = useState(null);
  const [loadingProcessing, setLoadingProcessing] = useState(false);
  const [processingError, setProcessingError] = useState(null);

  const TABS = topTab === 'service' ? SERVICE_TABS : SUBSCRIPTION_TABS;

  // Fetch providerId and processing bookings on mount
  useEffect(() => {
    // Fetch providerId
    fetch('http://localhost/project-root/backend/home-management-system-Backend/api/provider_profile.php', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProviderId(data.provider_id);
        }
      });
  }, []);

  // Fetch bookings for each status tab when providerId or activeTab changes
  useEffect(() => {
    if (!providerId || topTab !== 'service') return;
    const statusKey = activeTab;
    let backendStatus = statusKey;
    if (statusKey === 'processing') backendStatus = 'process';
    // For 'complete', 'cancel', use as is
    setLoadingProcessing(true);
    setProcessingError(null);
    fetch(`http://localhost/project-root/backend/home-management-system-Backend/api/service_booking.php?provider_requests=1&provider_id=${providerId}&status=${backendStatus}`,
      { credentials: 'include' }
    )
      .then(res => res.json())
      .then(data => {
        let bookingsArr = [];
        if (Array.isArray(data)) {
          bookingsArr = data;
        } else if (data && data.status === 'success' && Array.isArray(data.data)) {
          bookingsArr = data.data;
        }
        const mapped = bookingsArr.map(b => ({
          id: b.service_book_id || b.id,
          service: b.service_name || b.service, // fallback
          customer: b.customer_name || b.customer,
          date: b.service_date || b.date,
          time: b.service_time || b.time,
          location: b.service_address || b.location,
          status: statusKey,
          charge: b.service_amount || b.charge || b.amount,
          cancelReason: b.cancel_reason || b.cancelReason
        }));
        setServiceActivities(prev => ({
          ...prev,
          [statusKey]: mapped
        }));
        setLoadingProcessing(false);
      })
      .catch(err => {
        setProcessingError('Failed to fetch bookings.');
        setLoadingProcessing(false);
      });
  }, [providerId, topTab, activeTab]);

  const activities = topTab === 'service' ? serviceActivities[activeTab] || [] : subscriptionActivities.filter((activity) => activity.status === activeTab);
  const filteredActivities = activities;

  const activityTabs = [
    { key: 'service', label: 'Service', icon: FaTools },
    { key: 'subscription', label: 'Subscription', icon: FaRegCalendarAlt },
  ];

  // Cancel logic
  const openCancelModal = (activity) => {
    setModalActivity(activity);
    setShowCancelModal(true);
    setCancelReason('');
  };
  const handleCancelSubmit = async () => {
    if (!cancelReason.trim()) return;
    if (!modalActivity?.id) return;
    try {
      const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/service_booking.php', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          service_book_id: modalActivity.id,
          cancel_reason: cancelReason
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setShowCancelModal(false);
        setModalActivity(null);
        setCancelReason('');
        setActiveTab('cancel'); // Switch to cancel tab, which will trigger bookings reload
      } else {
        alert(data.message || 'Failed to cancel booking.');
      }
    } catch (err) {
      alert('Network error.');
    }
  };

  // Complete logic
  const openCompleteModal = (activity) => {
    setModalActivity(activity);
    setShowCompleteModal(true);
    setCompleteServiceName(activity.service || '');
    setCompleteCharge('');
  };
  const handleCompleteSubmit = async () => {
    if (!completeServiceName.trim() || !completeCharge.trim()) return;
    setShowCompleteModal(false);
    setWaitingForCustomer(true);
    setPendingCompleteId(modalActivity.id);

    // PATCH API call to backend
    try {
      const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/service_booking.php', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          action: 'provider_complete',
          service_book_id: modalActivity.id,
          service_amount: completeCharge
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setActiveTab('request');
      } else {
        alert(data.message || 'Failed to complete service.');
      }
    } catch (err) {
      alert('Network error.');
    }
  };

  const handleCustomerAccept = () => {
    setServiceActivities((prev) =>
      prev.map((a) =>
        a.id === pendingCompleteId
          ? { ...a, status: 'complete', charge: completeCharge, service: completeServiceName }
          : a
      )
    );
    setWaitingForCustomer(false);
    setPendingCompleteId(null);
    setModalActivity(null);
    setCompleteServiceName('');
    setCompleteCharge('');
    setActiveTab('complete');
  };

  return (
    <div className="provider-activity-page activity-animate-in" style={{ marginTop: 0, width: '100%', maxWidth: '100%', paddingLeft: '2rem', paddingRight: '1rem' }}>
      <div className="activity-large-icon-tabs">
        {activityTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = topTab === tab.key;
          return (
            <button
              key={tab.key}
              className={`activity-large-icon-tab${isActive ? ' active' : ''}`}
              onClick={() => { setTopTab(tab.key); setActiveTab('processing'); }}
              type="button"
            >
              <span className="activity-large-icon-tab-icon">
                <Icon />
              </span>
              <span className="activity-large-icon-tab-label">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className={`activity-status-tabs-bg${topTab === 'subscription' ? ' subscription' : ''}`}>
      <div className="activity-tabs">
          {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`activity-tab-btn${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
              <span style={{display:'flex',alignItems:'center',gap:'6px'}}>
                {getTabIcon(tab, activeTab === tab.key)}
            <span className="tab-label">{tab.label}</span>
              </span>
          </button>
        ))}
      </div>
          </div>
      <div className="user-suggestion-table-container">
        <table className="user-suggestion-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
              <th>Location</th>
                {activeTab === 'processing' && <th>Action</th>}
                {activeTab === 'cancel' && <th>Reason</th>}
              {activeTab === 'complete' && topTab === 'service' && <th>Charge</th>}
              </tr>
            </thead>
            <tbody>
            {filteredActivities.length === 0 ? (
              <tr>
                <td colSpan={5 + (activeTab === 'processing' ? 1 : 0) + (activeTab === 'cancel' ? 1 : 0) + (activeTab === 'complete' && topTab === 'service' ? 1 : 0)} style={{ textAlign: 'center', color: '#888', padding: '2rem 0' }}>
                  No activities found for this status.
                  </td>
              </tr>
            ) : (
              filteredActivities.map((activity, idx) => (
                <tr key={activity.id || idx}>
                  <td>{activity.service}</td>
                  <td>{activity.customer}</td>
                  <td>{activity.date}</td>
                  <td>{activity.time}</td>
                  <td>{activity.location || '-'}</td>
                  {activeTab === 'processing' && (
                    <td>
                      <div className="activity-action-btn-group">
                        {topTab === 'service' && (
                          <button className="activity-complete-btn" onClick={() => openCompleteModal(activity)}>
                            Complete
                          </button>
                        )}
                        <button className="activity-cancel-btn" onClick={() => openCancelModal(activity)}>
                          Cancel
                        </button>
                      </div>
                    </td>
                  )}
                  {activeTab === 'cancel' && (
                    <td>{activity.cancelReason || '-'}</td>
                  )}
                  {activeTab === 'complete' && topTab === 'service' && (
                    <td>{activity.charge ? `LKR ${activity.charge}` : '-'}</td>
                  )}
                </tr>
              ))
            )}
            </tbody>
          </table>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="activity-modal-overlay">
          <div className="activity-modal">
            <h3>Cancel Service</h3>
            <textarea
              className="activity-modal-textarea"
              placeholder="Enter reason for cancellation..."
              value={cancelReason}
              onChange={e => setCancelReason(e.target.value)}
              rows={3}
            />
            <div className="activity-modal-actions">
              <button className="activity-modal-cancel-btn" onClick={() => setShowCancelModal(false)}>Close</button>
              <button className="activity-modal-submit-btn" onClick={handleCancelSubmit} disabled={!cancelReason.trim()}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Modal */}
      {showCompleteModal && (
        <div className="activity-modal-overlay">
          <div className="activity-modal">
            <h3>Complete Service</h3>
            <input
              className="activity-modal-input"
              placeholder="Service Name"
              value={completeServiceName}
              onChange={e => setCompleteServiceName(e.target.value)}
            />
            <input
              className="activity-modal-input"
              placeholder="Amount (LKR)"
              type="number"
              value={completeCharge}
              onChange={e => setCompleteCharge(e.target.value)}
            />
            <div className="activity-modal-actions">
              <button className="activity-modal-cancel-btn" onClick={() => setShowCompleteModal(false)}>Close</button>
              <button className="activity-modal-submit-btn" onClick={handleCompleteSubmit} disabled={!completeServiceName.trim() || !completeCharge.trim()}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Waiting for Customer Acceptance Popup */}
      {waitingForCustomer && (
        <div className="activity-modal-overlay">
          <div className="activity-modal">
            <h3>Waiting for Customer Acceptance</h3>
            <p>The customer has been notified. Please wait for their confirmation.</p>
            {/* Button removed as per user request */}
          </div>
        </div>
      )}
    </div>
  );
}