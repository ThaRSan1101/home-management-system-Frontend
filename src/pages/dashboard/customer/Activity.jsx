import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import './Activity.css';
import { FaClock, FaSpinner, FaCheckCircle, FaTimesCircle, FaStar } from 'react-icons/fa';

const STATUS_TABS = [
  { key: 'pending', label: 'Pending', icon: <FaClock /> },
  { key: 'processing', label: 'Processing', icon: <FaSpinner /> },
  { key: 'complete', label: 'Complete', icon: <FaCheckCircle /> },
  { key: 'cancel', label: 'Cancel', icon: <FaTimesCircle /> },
];



// Feedback and rated services are managed in React state only
function getRatedServiceIdsFromState(feedbacks) {
  return feedbacks.map(fb => fb.service + '_' + fb.date + '_' + fb.provider);
}

export default function Activity({ currentUser }) {
  // State hooks
  const [activeTab, setActiveTab] = useState('pending');
  const [activities, setActivities] = useState([]);
  const [viewDetailsId, setViewDetailsId] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState({ rating: 0, comment: '' });
  const [currentBill, setCurrentBill] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [ratedServiceIds, setRatedServiceIds] = useState([]);
  const [cancelModalId, setCancelModalId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  // Fetch bookings from backend on mount or when dependencies change
  useEffect(() => {
    async function fetchBookings() {
      if (!currentUser?.user_id) return;
      const apiUrl = `http://localhost/project-root/backend/home-management-system-Backend/api/service_booking.php?user_id=${currentUser.user_id}&status=${activeTab}`;
      try {
        const res = await fetch(apiUrl, { credentials: 'include' });
        const data = await res.json();
        if (data.status === 'success') {
          // Service categoryId to title mapping (copy from Service.jsx)
      const SERVICE_CATEGORY_MAP = {
        1: 'Plumbing Services',
        2: 'Carpentry Services',
        3: 'Electrical Services',
        4: 'Painting Services',
        5: 'Electronic Services',
        6: 'Cleaning Service',
      };
      const mapped = (data.data || []).map(b => ({
        id: b.service_book_id,
        serviceName: SERVICE_CATEGORY_MAP[b.service_category_id] || `Service #${b.service_category_id}`,
        date: b.service_date,
        time: b.service_time,
        status: b.serbooking_status ? b.serbooking_status.toLowerCase() : '',
      }));
          setActivities(mapped);
        } else {
          toast.error(data.message || 'Failed to fetch bookings.');
        }
      } catch (err) {
        toast.error('Network error.');
      }
    }
    fetchBookings();
  }, [currentUser, activeTab]);

  // Update ratedServiceIds when feedbacks change
  useEffect(() => {
    setRatedServiceIds(getRatedServiceIdsFromState(feedbacks));
  }, [feedbacks]);

  const filteredActivities = activities.filter(
    (activity) => activity.status === activeTab
  );

  const handleCancel = (id) => {
    setCancelModalId(id);
    setCancelReason('');
  };
  const handleCancelSubmit = async () => {
  if (!cancelModalId || !cancelReason.trim()) return;
  try {
    const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/service_booking.php', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service_book_id: cancelModalId, cancel_reason: cancelReason }),
      credentials: 'include',
    });
    const data = await res.json();
    if (data.status === 'success') {
      toast.success('Booking cancelled successfully.');
      setCancelModalId(null);
      setCancelReason('');
      // Refetch bookings to update UI
      if (typeof fetchBookings === 'function') fetchBookings();
      else window.location.reload();
    } else {
      toast.error(data.message || 'Failed to cancel booking.');
    }
  } catch (e) {
    toast.error('Network error.');
  }
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
    if (feedbackData.rating === 0 || !feedbackData.comment.trim()) return;
    const uniqueId = currentBill.service + '_' + currentBill.date + '_' + currentBill.provider;
    setFeedbacks(prev => [...prev, { ...currentBill, ...feedbackData }]);
    setShowFeedbackModal(false);
    setFeedbackData({ rating: 0, comment: '' });
    setCurrentBill(null);
    setRatedServiceIds(getRatedServiceIdsFromState([...feedbacks, { ...currentBill, ...feedbackData }]));
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
                    <th>Service Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    {activeTab === 'pending' && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.serviceName}</td>
                      <td>{activity.date}</td>
                      <td>{activity.time}</td>
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
                    </tr>
                  ))}
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
                return (
                  <div className="bill-details">
                    <div><b>Category ID:</b> {activity.categoryId}</div>
                    <div><b>Customer:</b> {activity.customer}</div>
                    <div><b>Address:</b> {activity.address}</div>
                    <div><b>Amount:</b> LKR {activity.charge}</div>
                    <div><b>Date & Time:</b> {activity.date} {activity.time}</div>
                    <div className="customer-activity-modal-actions">
                      <button className="customer-activity-modal-submit-btn playful-btn" onClick={handleBillSubmit}>
                        Submit
                      </button>
                    </div>
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
        {/* Cancel Modal */}
        {cancelModalId && (
          <div className="customer-activity-modal-overlay">
            <div className="customer-activity-modal playful-modal cancel-modal">
              <h3>Cancel Service</h3>
              <textarea
                className="cancel-reason-textarea"
                placeholder="Enter reason for cancellation..."
                value={cancelReason}
                onChange={e => setCancelReason(e.target.value)}
                rows={3}
                style={{width:'100%',marginBottom:'1.2rem',borderRadius:'8px',padding:'1rem',border:'1.5px solid #bfc8e2',fontSize:'1.08rem',background:'#f5f8fd'}}
              />
              <div className="customer-activity-modal-actions">
                <button className="customer-activity-modal-cancel-btn" style={{background:'#f5f8fd',color:'#1a3665',border:'none',borderRadius:'8px',padding:'0.7rem 2.2rem',fontWeight:600,fontSize:'1.08rem',marginRight:'1rem'}} onClick={()=>setCancelModalId(null)}>
                  Close
                </button>
                <button className="customer-activity-modal-submit-btn" style={{background:'#16305a',color:'#fff',border:'none',borderRadius:'8px',padding:'0.7rem 2.2rem',fontWeight:600,fontSize:'1.08rem'}} onClick={handleCancelSubmit} disabled={!cancelReason.trim()}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 