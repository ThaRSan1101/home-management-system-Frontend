import React, { useState } from 'react';
import './Services.css';
import { FaInbox, FaSpinner, FaCheckCircle, FaTimesCircle, FaClipboardList } from 'react-icons/fa';
import Footer from '../../../components/Footer';

const STATUS_TABS = [
  { key: 'new', label: 'New', icon: <FaInbox /> },
  { key: 'processing', label: 'Processing', icon: <FaSpinner /> },
  { key: 'complete', label: 'Complete', icon: <FaCheckCircle /> },
  { key: 'cancel', label: 'Cancelled', icon: <FaTimesCircle /> },
];

const STATUS_TAB_EMOJIS = {
  new: '🆕',
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

const initialActivities = [
  // New
  { id: 1, service: 'Plumbing', customer: 'John Doe', date: '2024-07-01', time: '9:00 AM', status: 'new', details: 'Fix leaking sink in kitchen' },
  { id: 2, service: 'Window Cleaning', customer: 'Jane Smith', date: '2024-07-02', time: '11:00 AM', status: 'new', details: 'Clean all windows, 2nd floor' },
  { id: 3, service: 'AC Service', customer: 'Bob Lee', date: '2024-07-03', time: '2:00 PM', status: 'new', details: 'AC not cooling, needs inspection' },
  // Processing
  { id: 4, service: 'Electrical Repair', customer: 'Alice Brown', date: '2024-07-04', time: '10:30 AM', status: 'processing', details: 'Replace broken light switch' },
  { id: 5, service: 'Carpet Cleaning', customer: 'Tom Clark', date: '2024-07-05', time: '1:00 PM', status: 'processing', details: 'Deep clean living room carpet' },
  { id: 6, service: 'Plumbing', customer: 'Sara White', date: '2024-07-06', time: '3:30 PM', status: 'processing', details: 'Install new bathroom faucet' },
  // Complete
  { id: 7, service: 'Window Cleaning', customer: 'Mike Green', date: '2024-06-28', time: '9:00 AM', status: 'complete', details: 'Cleaned all windows', charge: '3500' },
  { id: 8, service: 'AC Service', customer: 'Linda Blue', date: '2024-06-27', time: '12:00 PM', status: 'complete', details: 'Replaced AC filter', charge: '2500' },
  { id: 9, service: 'Electrical Repair', customer: 'Chris Red', date: '2024-06-26', time: '4:00 PM', status: 'complete', details: 'Fixed power outlet', charge: '1800' },
  // Cancelled
  { id: 10, service: 'Carpet Cleaning', customer: 'Nina Violet', date: '2024-06-25', time: '10:00 AM', status: 'cancel', details: 'Customer unavailable', cancelReason: 'Customer not at home' },
  { id: 11, service: 'Plumbing', customer: 'Oscar Black', date: '2024-06-24', time: '2:00 PM', status: 'cancel', details: 'Job cancelled by provider', cancelReason: 'Emergency, unable to attend' },
  { id: 12, service: 'AC Service', customer: 'Pam Orange', date: '2024-06-23', time: '11:00 AM', status: 'cancel', details: 'Customer rescheduled', cancelReason: 'Rescheduled by customer' },
];

export default function ProviderActivity() {
  const [activeTab, setActiveTab] = useState('new');
  const [activities, setActivities] = useState(initialActivities);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [modalActivity, setModalActivity] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [completeCharge, setCompleteCharge] = useState('');
  const [completeServiceName, setCompleteServiceName] = useState('');

  const filteredActivities = activities.filter((activity) => activity.status === activeTab);

  const handleAccept = (id) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'processing' } : a))
    );
  };

  const handleDecline = (id) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  const openCancelModal = (activity) => {
    setModalActivity(activity);
    setCancelReason('');
    setShowCancelModal(true);
  };
  const openCompleteModal = (activity) => {
    setModalActivity(activity);
    setCompleteCharge('');
    setCompleteServiceName(activity.service);
    setShowCompleteModal(true);
  };
  const handleCancelSubmit = (e) => {
    e.preventDefault();
    setActivities((prev) =>
      prev.map((a) =>
        a.id === modalActivity.id
          ? { ...a, status: 'cancel', cancelReason }
          : a
      )
    );
    setShowCancelModal(false);
    setModalActivity(null);
  };
  const handleCompleteSubmit = (e) => {
    e.preventDefault();
    setActivities((prev) =>
      prev.map((a) =>
        a.id === modalActivity.id
          ? { ...a, status: 'complete', charge: completeCharge, completedService: completeServiceName }
          : a
      )
    );
    setShowCompleteModal(false);
    setModalActivity(null);
  };

  return (
    <div className="provider-activity-page activity-animate-in" style={{ marginTop: 0, width: '100%', maxWidth: '100%', paddingLeft: '2rem', paddingRight: '1rem' }}>
      <h1 style={{ color: 'rgb(26, 54, 101)', fontWeight: 900, fontSize: '2rem', margin: 0, letterSpacing: '0.5px', display: 'flex', alignItems: 'center' }}><FaClipboardList style={{marginRight:8}}/>Activity</h1>
      <p style={{ color: '#64748b', fontSize: '1.1rem', margin: 0, marginBottom: '1.5rem' }}>Manage and track all your service activities in one place.</p>
      <div className="activity-tabs">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            className={`activity-tab-btn${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className={`tab-emoji-badge tab-emoji-${tab.key}`}>{STATUS_TAB_EMOJIS[tab.key]}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="activity-table-container" style={{ width: '100%', maxWidth: '100%', marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0, overflowX: 'auto' }}>
        {filteredActivities.length === 0 ? (
          <div className="activity-empty-state">
            <FaInbox className="empty-icon" />
            <h3>No activities found for this status.</h3>
          </div>
        ) : (
          <table className="activity-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Details</th>
                {activeTab === 'new' && <th>Action</th>}
                {activeTab === 'processing' && <th>Action</th>}
                {activeTab === 'cancel' && <th>Reason</th>}
                {activeTab === 'complete' && <th>Charge</th>}
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity, idx) => (
                <tr key={activity.id} className="activity-row-animate" style={{ animationDelay: `${0.1 + idx * 0.07}s` }}>
                  <td>
                    <span className="service-emoji" style={{marginRight:6}}>{SERVICE_EMOJIS[activity.service] || '\ud83d\udd27'}</span>
                    {activity.service}
                  </td>
                  <td>{activity.customer}</td>
                  <td>{activity.date}</td>
                  <td>{activity.time}</td>
                  <td>
                    <span className={`activity-status-badge animated-badge ${activity.status}`}>
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </span>
                  </td>
                  <td>{activity.details}</td>
                  {activeTab === 'new' && (
                    <td>
                      <div className="activity-action-btn-group">
                        <button className="activity-accept-btn animated-btn" onClick={() => handleAccept(activity.id)}>
                          Accept
                        </button>
                        <button className="activity-decline-btn animated-btn" onClick={() => handleDecline(activity.id)}>
                          Decline
                        </button>
                      </div>
                    </td>
                  )}
                  {activeTab === 'processing' && (
                    <td>
                      <div className="activity-action-btn-group">
                        <button className="activity-cancel-btn animated-btn" onClick={() => openCancelModal(activity)}>
                          Cancel
                        </button>
                        <button className="activity-complete-btn animated-btn" onClick={() => openCompleteModal(activity)}>
                          Complete
                        </button>
                      </div>
                    </td>
                  )}
                  {activeTab === 'cancel' && (
                    <td>{activity.cancelReason || '-'}</td>
                  )}
                  {activeTab === 'complete' && (
                    <td>{activity.charge ? `LKR ${activity.charge}` : '-'}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
}