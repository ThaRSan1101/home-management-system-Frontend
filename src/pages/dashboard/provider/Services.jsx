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

const initialActivities = [
  { id: 10, service: 'Window Cleaning', date: '2024-07-01', time: '9:00 AM', status: 'new' },
  { id: 2, service: 'Plumbing', date: '2024-05-28', time: '2:00 PM', status: 'processing' },
  { id: 3, service: 'Electrical Repair', date: '2024-05-20', time: '11:30 AM', status: 'complete' },
  { id: 4, service: 'Carpet Cleaning', date: '2024-05-15', time: '9:00 AM', status: 'cancel' },
  { id: 6, service: 'AC Service', date: '2024-05-30', time: '4:00 PM', status: 'processing' },
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
    <div className="provider-activity-page">
      <div className="activity-header">
        <h1><FaClipboardList style={{marginRight:8}}/>Activity</h1>
        <p>Manage and track all your service activities in one place.</p>
      </div>
      <div className="activity-tabs">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            className={`activity-tab-btn${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="activity-table-container">
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
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                {activeTab === 'new' && <th>Action</th>}
                {activeTab === 'processing' && <th>Action</th>}
                {activeTab === 'cancel' && <th>Reason</th>}
                {activeTab === 'complete' && <th>Charge</th>}
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.service}</td>
                  <td>{activity.date}</td>
                  <td>{activity.time}</td>
                  <td>
                    <span className={`activity-status-badge ${activity.status}`}>
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </span>
                  </td>
                  {activeTab === 'new' && (
                    <td>
                      <button className="activity-accept-btn" onClick={() => handleAccept(activity.id)}>Accept</button>
                      <button className="activity-decline-btn" onClick={() => handleDecline(activity.id)}>Decline</button>
                    </td>
                  )}
                  {activeTab === 'processing' && (
                    <td>
                      <button className="activity-cancel-btn" onClick={() => openCancelModal(activity)}>Cancel</button>
                      <button className="activity-complete-btn" onClick={() => openCompleteModal(activity)}>Complete</button>
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
      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="activity-modal-overlay">
          <div className="activity-modal">
            <div className="activity-modal-icon cancel">
              <FaTimesCircle size={44} />
            </div>
            <button type="button" className="activity-modal-close-btn" onClick={() => setShowCancelModal(false)}>&times;</button>
            <h3>Cancel Service</h3>
            <form onSubmit={handleCancelSubmit}>
              <label>
                Reason for cancellation:
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  required
                  placeholder="Enter reason..."
                  className="activity-modal-textarea"
                />
              </label>
              <div className="activity-modal-actions">
                <button type="button" onClick={() => setShowCancelModal(false)} className="activity-modal-cancel-btn">Close</button>
                <button type="submit" className="activity-modal-submit-btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Complete Modal */}
      {showCompleteModal && (
        <div className="activity-modal-overlay">
          <div className="activity-modal">
            <div className="activity-modal-icon complete">
              <FaCheckCircle size={44} />
            </div>
            <button type="button" className="activity-modal-close-btn" onClick={() => setShowCompleteModal(false)}>&times;</button>
            <h3>Complete Service</h3>
            <form onSubmit={handleCompleteSubmit}>
              <label>
                Service Name:
                <input
                  type="text"
                  value={completeServiceName}
                  onChange={(e) => setCompleteServiceName(e.target.value)}
                  required
                  className="activity-modal-input"
                />
              </label>
              <label>
                Service Charge (LKR):
                <input
                  type="number"
                  min="0"
                  value={completeCharge}
                  onChange={(e) => setCompleteCharge(e.target.value)}
                  required
                  className="activity-modal-input"
                />
              </label>
              <div className="activity-modal-actions">
                <button type="button" onClick={() => setShowCompleteModal(false)} className="activity-modal-cancel-btn">Close</button>
                <button type="submit" className="activity-modal-submit-btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
} 