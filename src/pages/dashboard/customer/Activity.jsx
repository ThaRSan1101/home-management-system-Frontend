import React, { useState, useEffect } from 'react';
import './Activity.css';
import { FaClock, FaSpinner, FaCheckCircle, FaTimesCircle, FaStar } from 'react-icons/fa';

const STATUS_TABS = [
  { key: 'pending', label: 'Pending', icon: <FaClock /> },
  { key: 'processing', label: 'Processing', icon: <FaSpinner /> },
  { key: 'complete', label: 'Complete', icon: <FaCheckCircle /> },
  { key: 'cancel', label: 'Cancel', icon: <FaTimesCircle /> },
];

const sampleActivities = [
  { id: 1, service: 'House Cleaning', provider: 'CleanPro Services', charge: 2500, date: '2024-06-01', time: '10:00 AM', status: 'pending' },
  { id: 2, service: 'Plumbing', provider: 'PlumbRight Co.', charge: 1800, date: '2024-05-28', time: '2:00 PM', status: 'processing' },
  { id: 3, service: 'Electrical Repair', provider: 'ElectroFix Solutions', charge: 3200, date: '2024-05-20', time: '11:30 AM', status: 'complete' },
  { id: 4, service: 'Carpet Cleaning', provider: 'FreshCarpet Pro', charge: 2100, date: '2024-05-15', time: '9:00 AM', status: 'cancel' },
  { id: 5, service: 'Garden Maintenance', provider: 'GreenThumb Services', charge: 1500, date: '2024-06-02', time: '8:00 AM', status: 'pending' },
  { id: 6, service: 'AC Service', provider: 'CoolAir Experts', charge: 3500, date: '2024-05-30', time: '4:00 PM', status: 'processing' },
  { id: 7, service: 'Window Cleaning', provider: 'ShineBright', charge: 1200, date: '2024-06-10', time: '3:00 PM', status: 'complete' },
  { id: 8, service: 'Pest Control', provider: 'BugFree Co.', charge: 2800, date: '2024-06-12', time: '11:00 AM', status: 'complete' },
  { id: 9, service: 'Sofa Shampoo', provider: 'Upholstery Pros', charge: 2000, date: '2024-06-14', time: '1:30 PM', status: 'complete' },
  { id: 10, service: 'Deep Cleaning', provider: 'CleanPro Services', charge: 4000, date: '2024-06-16', time: '9:00 AM', status: 'complete' },
  { id: 11, service: 'Painting', provider: 'ColorSplash', charge: 5000, date: '2024-06-18', time: '10:00 AM', status: 'complete' },
  { id: 12, service: 'Curtain Washing', provider: 'FreshCurtains', charge: 900, date: '2024-06-20', time: '2:00 PM', status: 'complete' },
];

const FEEDBACK_KEY = 'customer_feedback_data';
function saveFeedback(feedback) {
  const prev = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || '[]');
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify([...prev, feedback]));
}
function getRatedServiceIds() {
  const feedbacks = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || '[]');
  return feedbacks.map(fb => fb.service + '_' + fb.date + '_' + fb.provider);
}

export default function Activity() {
  const [activeTab, setActiveTab] = useState('pending');
  const [activities, setActivities] = useState(sampleActivities);
  const [viewDetailsId, setViewDetailsId] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState({ rating: 0, comment: '' });
  const [currentBill, setCurrentBill] = useState(null);
  const [ratedServiceIds, setRatedServiceIds] = useState(getRatedServiceIds());

  useEffect(() => {
    setRatedServiceIds(getRatedServiceIds());
  }, []);

  const filteredActivities = activities.filter(
    (activity) => activity.status === activeTab
  );

  const handleCancel = (id) => {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: 'cancel' } : a
      )
    );
  };

  // Bill modal submit
  const handleBillSubmit = () => {
    const bill = activities.find(a => a.id === viewDetailsId);
    const uniqueId = bill.service + '_' + bill.date + '_' + bill.provider;
    if (!ratedServiceIds.includes(uniqueId)) {
      setCurrentBill(bill);
      setShowFeedbackModal(true);
    }
    setActivities((prev) =>
      prev.map((a) =>
        a.id === viewDetailsId ? { ...a, status: 'complete' } : a
      )
    );
    setViewDetailsId(null);
  };

  // Feedback modal submit
  const handleFeedbackSubmit = () => {
    if (!currentBill) return;
    const feedback = {
      id: Date.now(),
      provider: currentBill.provider,
      service: currentBill.service,
      amount: currentBill.charge,
      date: currentBill.date,
      rating: feedbackData.rating,
      comment: feedbackData.comment,
    };
    saveFeedback(feedback);
    setShowFeedbackModal(false);
    setFeedbackData({ rating: 0, comment: '' });
    setCurrentBill(null);
    // Update ratedServiceIds
    setRatedServiceIds(getRatedServiceIds());
  };

  const renderStars = (rating, setRating) => (
    <div className="star-rating">
      {[1,2,3,4,5].map((star) => (
        <FaStar
          key={star}
          className={star <= rating ? 'star filled' : 'star'}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );

  return (
    <div className="customer-dashboard-activity-super">
      <div className="customer-activity-tabs-bg">
        <div className="customer-activity-tabs">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              className={`customer-activity-tab-btn${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="customer-activity-content">
        {filteredActivities.length === 0 ? (
          <div className="customer-activity-empty">
            <span className="empty-icon">🗒️</span>
            <h3>No activities found for this status.</h3>
          </div>
        ) : (
          <div className="customer-activity-table-container">
            <div className="customer-activity-table-scroll">
              <table className="customer-activity-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    {activeTab === 'pending' && <th>Action</th>}
                    {activeTab === 'complete' && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredActivities.map((activity) => {
                    const uniqueId = activity.service + '_' + activity.date + '_' + activity.provider;
                    return (
                      <tr key={activity.id}>
                        <td>{activity.service}</td>
                        <td>{activity.date}</td>
                        <td>{activity.time}</td>
                        <td>
                          <span className={`customer-activity-status-badge ${activity.status}`}>
                            {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                          </span>
                        </td>
                        {activeTab === 'pending' && (
                          <td>
                            <button
                              className="customer-activity-cancel-btn"
                              onClick={() => handleCancel(activity.id)}
                            >
                              Cancel
                            </button>
                          </td>
                        )}
                        {activeTab === 'complete' && (
                          <td>
                            <button
                              className={`customer-activity-view-details-btn${ratedServiceIds.includes(uniqueId) ? ' rated' : ''}`}
                              onClick={() => setViewDetailsId(activity.id)}
                              title={ratedServiceIds.includes(uniqueId) ? 'You have already rated this service' : 'View Details'}
                            >
                              View Details
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Bill Modal */}
        {viewDetailsId && (
          <div className="customer-activity-modal-overlay">
            <div className="customer-activity-modal playful-modal bill-modal">
              <button type="button" className="customer-activity-modal-close-btn" onClick={() => setViewDetailsId(null)}>&times;</button>
              <h3>Service Bill</h3>
              {(() => {
                const activity = activities.find(a => a.id === viewDetailsId);
                if (!activity) return null;
                const uniqueId = activity.service + '_' + activity.date + '_' + activity.provider;
                return (
                  <div className="bill-details">
                    <div><b>Service Name:</b> {activity.service}</div>
                    <div><b>Provider Name:</b> {activity.provider}</div>
                    <div><b>Amount:</b> LKR {activity.charge}</div>
                    <div><b>Date & Time:</b> {activity.date} {activity.time}</div>
                    <div className="customer-activity-modal-actions">
                      {!ratedServiceIds.includes(uniqueId) && (
                        <button className="customer-activity-modal-submit-btn playful-btn" onClick={handleBillSubmit}>
                          Submit
                        </button>
                      )}
                    </div>
                    {ratedServiceIds.includes(uniqueId) && (
                      <div className="already-rated-msg">You have already rated this service.</div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
        {/* Feedback Modal */}
        {showFeedbackModal && currentBill && (
          <div className="customer-activity-modal-overlay">
            <div className="customer-activity-modal playful-modal feedback-modal">
              <h3>Rate Your Service</h3>
              <div className="feedback-details">
                <div><b>Provider Name:</b> {currentBill.provider}</div>
                <div><b>Service Name:</b> {currentBill.service}</div>
                <div><b>Amount:</b> LKR {currentBill.charge}</div>
              </div>
              <div className="feedback-rating-row">
                <span><b>Rating:</b></span>
                {renderStars(feedbackData.rating, (r) => setFeedbackData(fd => ({ ...fd, rating: r })))}
              </div>
              <textarea
                className="feedback-textarea"
                placeholder="Write your feedback..."
                value={feedbackData.comment}
                onChange={e => setFeedbackData(fd => ({ ...fd, comment: e.target.value }))}
                rows={3}
              />
              <div className="customer-activity-modal-actions">
                <button className="customer-activity-modal-submit-btn playful-btn" onClick={handleFeedbackSubmit} disabled={feedbackData.rating === 0 || !feedbackData.comment.trim()}>
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 