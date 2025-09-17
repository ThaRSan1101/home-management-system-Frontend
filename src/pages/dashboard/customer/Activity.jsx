import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import './Activity.css';
import { FaClock, FaSpinner, FaCheckCircle, FaTimesCircle, FaStar } from 'react-icons/fa';

const STATUS_TABS = [
  { key: 'pending', label: 'Pending', icon: <FaClock /> },
  { key: 'process', label: 'Processing', icon: <FaSpinner /> },
  { key: 'request', label: 'Request', icon: <FaSpinner /> },
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
  const [showSubModal, setShowSubModal] = useState(false);
  const [subForm, setSubForm] = useState({ plan: '', name: '', address: '', phone: '', date: '', time: '' });
  const [subErrors, setSubErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [viewDetailsId, setViewDetailsId] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState({ rating: 0, comment: '' });
  const [currentBill, setCurrentBill] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [ratedServiceIds, setRatedServiceIds] = useState([]);
  const [cancelModalId, setCancelModalId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  // Track whether a completed booking already has a review
  const [reviewedByBookingId, setReviewedByBookingId] = useState({});

  // For Accept Bill modal in 'request' tab
  const [showBillModal, setShowBillModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleAccept = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowBillModal(true);
  };
  const closeBillModal = () => {
    setShowBillModal(false);
    setSelectedBookingId(null);
  };

  // Confirm Accept: Customer accepts bill, PATCH API call
  const confirmAccept = async (bookingId) => {
    try {
      const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/service_booking.php', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          action: 'customer_accept',
          service_book_id: bookingId
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        // Find the activity for this booking
        const activity = activities.find(a => a.id === bookingId);
        setCurrentBill(activity);
        setShowFeedbackModal(true);
        closeBillModal();
        setActiveTab('complete');
      } else {
        alert(data.message || 'Failed to accept bill.');
      }
    } catch (err) {
      alert('Network error.');
    }
  };


  // Fetch bookings from backend on mount or when dependencies change
  useEffect(() => {
    async function fetchBookings() {
      if (!currentUser?.user_id) return;
      
      let apiUrl;
      let allActivities = [];
      
      if (activeTab === 'pending') {
        // For pending tab, fetch both 'pending' and 'waiting' services
        try {
          // Fetch pending services
          const pendingUrl = `http://localhost/project-root/backend/home-management-system-Backend/api/service_booking.php?user_id=${currentUser.user_id}&status=pending`;
          const pendingRes = await fetch(pendingUrl, { credentials: 'include' });
          const pendingData = await pendingRes.json();
          
          // Fetch waiting services
          const waitingUrl = `http://localhost/project-root/backend/home-management-system-Backend/api/service_booking.php?user_id=${currentUser.user_id}&status=waiting`;
          const waitingRes = await fetch(waitingUrl, { credentials: 'include' });
          const waitingData = await waitingRes.json();
          
          // Combine both datasets
          const pendingServices = pendingData.status === 'success' ? pendingData.data || [] : [];
          const waitingServices = waitingData.status === 'success' ? waitingData.data || [] : [];
          
          allActivities = [...pendingServices, ...waitingServices];
        } catch (err) {
          toast.error('Network error.');
          return;
        }
      } else {
        // For other tabs, fetch normally
        apiUrl = `http://localhost/project-root/backend/home-management-system-Backend/api/service_booking.php?user_id=${currentUser.user_id}&status=${activeTab}`;
        try {
          const res = await fetch(apiUrl, { credentials: 'include' });
          const data = await res.json();
          if (data.status === 'success') {
            allActivities = data.data || [];
          } else {
            toast.error(data.message || 'Failed to fetch bookings.');
            return;
          }
        } catch (err) {
          toast.error('Network error.');
          return;
        }
      }
      
      // Service categoryId to title mapping (copy from Service.jsx)
      const SERVICE_CATEGORY_MAP = {
        1: 'Plumbing Services',
        2: 'Carpentry Services',
        3: 'Electrical Services',
        4: 'Painting Services',
        5: 'Electronic Services',
        6: 'Cleaning Service',
      };
      
      const mapped = allActivities.map(b => ({
        id: b.service_book_id,
        serviceName: b.service_name || SERVICE_CATEGORY_MAP[b.service_category_id] || `Service #${b.service_category_id}`,
        date: b.service_date,
        time: b.service_time,
        status: (b.serbooking_status && b.serbooking_status.toLowerCase() === 'waiting') ? 'pending' : (b.serbooking_status ? b.serbooking_status.toLowerCase() : ''),
        address: b.service_address,
        amount: b.amount,
        serviceAmount: b.service_amount,
        customer: b.customer_name,
        phone: b.phoneNo,
        cancelReason: b.cancel_reason,
        provider: b.provider_name || '', // if available from backend join
        categoryId: b.service_category_id,
      }));
      setActivities(mapped);

      // If viewing completed services, pre-check review existence per booking
      if ((activeTab === 'complete') && mapped.length > 0) {
        try {
          const checks = await Promise.all(mapped.map(async (a) => {
            try {
              const res = await fetch(`http://localhost/project-root/backend/home-management-system-Backend/api/service_review.php?booking_id=${a.id}`, { credentials: 'include' });
              const data = await res.json();
              return [a.id, !!(data && data.data)];
            } catch (_) {
              return [a.id, false];
            }
          }));
          const next = {};
          checks.forEach(([id, has]) => { next[id] = has; });
          setReviewedByBookingId(next);
        } catch (_) {
          // ignore network issues here
        }
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
      body: JSON.stringify({ 
        action: 'cancel',
        service_book_id: cancelModalId, 
        cancel_reason: cancelReason 
      }),
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
  const handleFeedbackSubmit = async () => {
    if (feedbackData.rating === 0 || !feedbackData.comment.trim()) return;
    
    try {
      const reviewData = {
        service_book_id: currentBill.id,
        provider_name: currentBill.provider,
        service_name: currentBill.serviceName,
        amount: currentBill.serviceAmount || currentBill.amount,
        rating: feedbackData.rating,
        feedback_text: feedbackData.comment
      };

      const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/service_review.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(reviewData)
      });

      const data = await res.json();
      
      if (data.status === 'success') {
        toast.success('Review submitted successfully!');
        // Update local state for UI consistency
        const uniqueId = currentBill.service + '_' + currentBill.date + '_' + currentBill.provider;
        setFeedbacks(prev => [...prev, { ...currentBill, ...feedbackData }]);
        setRatedServiceIds(getRatedServiceIdsFromState([...feedbacks, { ...currentBill, ...feedbackData }]));
        // Mark this booking as reviewed so the button hides in Complete tab
        setReviewedByBookingId(prev => ({ ...prev, [currentBill.id]: true }));
      } else {
        toast.error(data.message || 'Failed to submit review.');
      }
    } catch (err) {
      console.error('Review submission error:', err);
      toast.error('Network error. Please try again.');
    }
    
    setShowFeedbackModal(false);
    setFeedbackData({ rating: 0, comment: '' });
    setCurrentBill(null);
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
      <h2 style={{ margin: '0 0 1.5rem 0', color: '#1a3665', fontSize: '2.5rem', fontWeight: '600', textAlign: 'center' }}>Service Booking</h2>
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
                    <th>Address</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    {activeTab === 'pending' && <th>Action</th>}
                    {activeTab === 'request' && <th>Action</th>}
                    {activeTab === 'complete' && <th>Action</th>}
                    {activeTab === 'cancel' && <th>Cancel Reason</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.serviceName}</td>
                      <td>{activity.date}</td>
                      <td>{activity.time}</td>
                      <td>{activity.address}</td>
                      <td>{activity.customer}</td>
                      <td>{activity.phone}</td>
                      {activeTab === 'request' && (
                        <td>
                          <button
                            onClick={() => handleAccept(activity.id)}
                            className="accept-btn"
                          >
                            Accept
                          </button>
                          {showBillModal && selectedBookingId === activity.id && (
                            <div className="customer-activity-modal-overlay">
                              <div className="customer-activity-modal bill-modal playful-modal">
                                <button type="button" className="customer-activity-modal-close-btn" onClick={closeBillModal}>&times;</button>
                                <h3 style={{color:'#1a3665',marginBottom:'1.3rem'}}>Service Bill</h3>
                                <div style={{marginBottom:'0.7rem'}}><b>Service Name:</b> {activity.serviceName}</div>
                                <div style={{marginBottom:'0.7rem'}}><b>Amount:</b> {activity.serviceAmount || activity.service_amount || activity.amount}</div>
                                <div style={{marginBottom:'1.2rem'}}><b>Date/Time:</b> {activity.date} {activity.time}</div>
                                <button
                                  onClick={() => confirmAccept(activity.id)}
                                  className="confirm-btn"
                                >
                                  Confirm & Accept
                                </button>
                              </div>
                            </div>
                          )}
                        </td>
                      )}
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
                            className="customer-activity-view-details-btn"
                            onClick={() => setViewDetailsId(activity.id)}
                          >
                            View Details
                          </button>
                          {reviewedByBookingId[activity.id] === false && (
                            <button
                              className="customer-activity-submit-review-btn"
                              onClick={() => { setCurrentBill(activity); setShowFeedbackModal(true); }}
                            >
                              Submit Review
                            </button>
                          )}
                        </td>
                      )}
                      {activeTab === 'cancel' && (
                        <td>{activity.cancelReason}</td>
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
              <h3 style={{color:'#1a3665',marginBottom:'1.3rem'}}>Booking Details</h3>
              {(() => {
                const activity = activities.find(a => a.id === viewDetailsId);
                if (!activity) return null;
                return (
                  <div className="bill-details">
                    <div><b>Service Name:</b> {activity.serviceName}</div>
                    <div><b>Customer:</b> {activity.customer}</div>
                    <div><b>Provider:</b> {activity.provider}</div>
                    <div><b>Address:</b> {activity.address}</div>
                    <div><b>Phone:</b> {activity.phone}</div>
                    <div><b>Amount:</b> LKR {activity.amount}</div>
                    <div><b>Service Amount:</b> LKR {activity.serviceAmount || activity.service_amount}</div>
                    <div><b>Date & Time:</b> {activity.date} {activity.time}</div>
                    <div><b>Status:</b> {activity.status}</div>
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
                <div><b>Service Name:</b> {currentBill.serviceName || currentBill.service}</div>
                <div><b>Amount:</b>  {currentBill.serviceAmount || currentBill.amount || currentBill.charge} LKR</div>
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