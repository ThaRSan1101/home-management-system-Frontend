import React, { useState } from 'react';
import './Services.css';
import { FaInbox, FaSpinner, FaCheckCircle, FaTimesCircle, FaClipboardList } from 'react-icons/fa';
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

const SERVICE_TABS = [
  { key: 'processing', label: 'Processing' },
  { key: 'complete', label: 'Complete' },
  { key: 'cancel', label: 'Cancelled' },
];
const SUBSCRIPTION_TABS = [
  { key: 'processing', label: 'Processing' },
  { key: 'cancel', label: 'Cancelled' },
];

const initialServiceActivities = [
  { id: 4, service: 'Electrical Repair', customer: 'Alice Brown', date: '2024-07-04', time: '10:30 AM', location: 'Colombo 01', status: 'processing' },
  { id: 5, service: 'Carpet Cleaning', customer: 'Tom Clark', date: '2024-07-05', time: '1:00 PM', location: 'Colombo 02', status: 'processing' },
  { id: 6, service: 'Plumbing', customer: 'Sara White', date: '2024-07-06', time: '3:30 PM', location: 'Colombo 03', status: 'processing' },
  { id: 7, service: 'Window Cleaning', customer: 'Mike Green', date: '2024-06-28', time: '9:00 AM', location: 'Colombo 04', status: 'complete', charge: '3500' },
  { id: 8, service: 'AC Service', customer: 'Linda Blue', date: '2024-06-27', time: '12:00 PM', location: 'Colombo 05', status: 'complete', charge: '2500' },
  { id: 9, service: 'Electrical Repair', customer: 'Chris Red', date: '2024-06-26', time: '4:00 PM', location: 'Colombo 06', status: 'complete', charge: '1800' },
  { id: 10, service: 'Carpet Cleaning', customer: 'Nina Violet', date: '2024-06-25', time: '10:00 AM', location: 'Colombo 07', status: 'cancel', cancelReason: 'Customer not at home' },
  { id: 11, service: 'Plumbing', customer: 'Oscar Black', date: '2024-06-24', time: '2:00 PM', location: 'Colombo 08', status: 'cancel', cancelReason: 'Emergency, unable to attend' },
  { id: 12, service: 'AC Service', customer: 'Pam Orange', date: '2024-06-23', time: '11:00 AM', location: 'Colombo 09', status: 'cancel', cancelReason: 'Rescheduled by customer' },
];
const initialSubscriptionActivities = [
  { id: 1, service: 'Monthly Cleaning', customer: 'John Doe', date: '2024-07-10', time: '10:00 AM', location: 'Colombo 10', status: 'processing' },
  { id: 2, service: 'Weekly Gardening', customer: 'Jane Smith', date: '2024-07-11', time: '2:00 PM', location: 'Colombo 11', status: 'processing' },
  { id: 3, service: 'Monthly Cleaning', customer: 'Bob Lee', date: '2024-07-01', time: '9:00 AM', location: 'Colombo 12', status: 'cancel', cancelReason: 'Customer cancelled' },
];

export default function ProviderActivity() {
  const [topTab, setTopTab] = useState('service');
  const [activeTab, setActiveTab] = useState('processing');
  const [serviceActivities, setServiceActivities] = useState(initialServiceActivities);
  const [subscriptionActivities, setSubscriptionActivities] = useState(initialSubscriptionActivities);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [modalActivity, setModalActivity] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [completeCharge, setCompleteCharge] = useState('');
  const [completeServiceName, setCompleteServiceName] = useState('');
  const [waitingForCustomer, setWaitingForCustomer] = useState(false);
  const [pendingCompleteId, setPendingCompleteId] = useState(null);

  const TABS = topTab === 'service' ? SERVICE_TABS : SUBSCRIPTION_TABS;
  const activities = topTab === 'service' ? serviceActivities : subscriptionActivities;
  const filteredActivities = activities.filter((activity) => activity.status === activeTab);

  const handleAccept = (id) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'processing' } : a))
    );
  };

  const handleDecline = (id) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  // Cancel logic
  const openCancelModal = (activity) => {
    setModalActivity(activity);
    setShowCancelModal(true);
    setCancelReason('');
  };
  const handleCancelSubmit = () => {
    if (!cancelReason.trim()) return;
    if (topTab === 'service') {
      setServiceActivities((prev) =>
        prev.map((a) =>
          a.id === modalActivity.id ? { ...a, status: 'cancel', cancelReason } : a
        )
      );
    } else {
      setSubscriptionActivities((prev) =>
        prev.map((a) =>
          a.id === modalActivity.id ? { ...a, status: 'cancel', cancelReason } : a
        )
      );
    }
    setShowCancelModal(false);
    setModalActivity(null);
    setCancelReason('');
    setActiveTab('cancel');
  };

  // Complete logic
  const openCompleteModal = (activity) => {
    setModalActivity(activity);
    setShowCompleteModal(true);
    setCompleteServiceName(activity.service || '');
    setCompleteCharge('');
  };
  const handleCompleteSubmit = () => {
    if (!completeServiceName.trim() || !completeCharge.trim()) return;
    setShowCompleteModal(false);
    setWaitingForCustomer(true);
    setPendingCompleteId(modalActivity.id);
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
      <div className="provider-activity-top-tabs-bg">
        <div className="provider-activity-top-tabs">
          <button
            className={`provider-activity-top-tab-btn${topTab === 'service' ? ' active' : ''}`}
            onClick={() => { setTopTab('service'); setActiveTab('processing'); }}
          >
            Service
          </button>
          <button
            className={`provider-activity-top-tab-btn${topTab === 'subscription' ? ' active' : ''}`}
            onClick={() => { setTopTab('subscription'); setActiveTab('processing'); }}
          >
            Subscription
          </button>
        </div>
      </div>
      <div className="activity-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`activity-tab-btn${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
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
              filteredActivities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.service}</td>
                  <td>{activity.customer}</td>
                  <td>{activity.date}</td>
                  <td>{activity.time}</td>
                  <td>{activity.location || '-'}</td>
                  {activeTab === 'processing' && (
                    <td>
                      <div className="activity-action-btn-group">
                        <button className="activity-cancel-btn" onClick={() => openCancelModal(activity)}>
                          Cancel
                        </button>
                        {topTab === 'service' && (
                          <button className="activity-complete-btn" onClick={() => openCompleteModal(activity)}>
                            Complete
                          </button>
                        )}
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