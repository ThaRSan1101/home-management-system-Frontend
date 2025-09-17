import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FaClock, FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './Subscription.css';

const TABS = [
  { key: 'pending', label: 'Pending', icon: <FaClock /> },
  { key: 'waiting', label: 'Waiting', icon: <FaSpinner /> },
  { key: 'process', label: 'Processing', icon: <FaSpinner /> },
  { key: 'complete', label: 'Complete', icon: <FaCheckCircle /> },
  { key: 'cancel', label: 'Cancel', icon: <FaTimesCircle /> },
];

export default function Subscription({ currentUser }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');
  
  // Cancel modal states
  const [unsubscribeModalId, setUnsubscribeModalId] = useState(null);
  const [unsubscribeReason, setUnsubscribeReason] = useState('');
  
  // Review modal states
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    feedback: ''
  });

  // View Details modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [reviewStatus, setReviewStatus] = useState(null); // null, 'loading', 'exists', 'not-exists'

  // Fetch bookings from API
  const fetchPlans = React.useCallback(() => {
    if (!currentUser?.user_id) return;
    
    setLoading(true);
    setApiError(null);
    let status = activeTab;
    // Map tab to API status
    if (status === 'waiting') status = 'waiting';
    else if (status === 'pending') status = 'pending';
    else if (status === 'process') status = 'process';
    else if (status === 'complete') status = 'complete';
    else if (status === 'cancel') status = 'cancel';
    
    const url = `http://localhost/project-root/backend/home-management-system-Backend/api/subscription_booking.php?status=${status}&user_id=${currentUser.user_id}`;
    fetch(url, { credentials: 'include' })
      .then(res => res.json())
      .then(result => {
        if (result.status === 'success') {
          setPlans(result.data || []);
        } else {
          setApiError(result.message || 'Failed to fetch subscriptions.');
        }
        setLoading(false);
      })
      .catch(() => { setApiError('Error fetching subscriptions.'); setLoading(false); });
  }, [activeTab, currentUser]);

  React.useEffect(() => { fetchPlans(); }, [fetchPlans]);

  // Check if review already exists for a subscription
  const checkReviewStatus = async (subbook_id) => {
    setReviewStatus('loading');
    try {
      const response = await fetch(`http://localhost/project-root/backend/home-management-system-Backend/api/subscription_review.php?check_review=1&subbook_id=${subbook_id}`, {
        credentials: 'include'
      });
      const result = await response.json();
      if (result.status === 'success') {
        setReviewStatus(result.exists ? 'exists' : 'not-exists');
      } else {
        setReviewStatus('not-exists'); // Default to allowing review on error
      }
    } catch (error) {
      setReviewStatus('not-exists'); // Default to allowing review on error
    }
  };

  const handleViewDetails = (plan) => {
    setSelectedPlan(plan);
    setShowDetailsModal(true);
    if (plan.subbooking_status === 'complete') {
      checkReviewStatus(plan.subbook_id);
    }
  };

  const handleUnsubscribe = (id) => {
    setUnsubscribeModalId(id);
  };

  const handleUnsubscribeSubmit = () => {
    if (!unsubscribeReason.trim()) {
      toast.error('Please provide a reason for cancellation');
      return;
    }
    
    setLoading(true);
    fetch('http://localhost/project-root/backend/home-management-system-Backend/api/subscription_booking.php', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ 
        subbook_id: unsubscribeModalId, 
        action: 'cancel', 
        cancel_reason: unsubscribeReason 
      })
    })
      .then(res => res.json())
      .then(result => {
        setLoading(false);
        if (result.status === 'success') {
          // Only prompt review if cancellation happened during processing stage
          if (activeTab === 'process') {
            const cancelledPlan = plans.find(p => p.subbook_id === unsubscribeModalId);
            setReviewData({
              subbook_id: unsubscribeModalId,
              plan_name: cancelledPlan?.plan_name || cancelledPlan?.category || 'Subscription',
              provider_name: cancelledPlan?.provider_name || 'Provider',
              amount: cancelledPlan?.amount || '0'
            });
            // Show review modal for processing cancellations only
            setShowReviewModal(true);
          }

          setUnsubscribeModalId(null);
          setUnsubscribeReason('');
          fetchPlans();
          toast.success('Subscription cancelled successfully!');
        } else {
          setApiError(result.message || 'Failed to cancel subscription.');
          toast.error(result.message || 'Failed to cancel subscription.');
        }
      })
      .catch(() => { 
        setApiError('Error cancelling subscription.'); 
        setLoading(false); 
        toast.error('Network error occurred.');
      });
  };

  const handleReviewSubmit = () => {
    if (!reviewForm.feedback.trim()) {
      toast.error('Please provide feedback');
      return;
    }

    setLoading(true);
    fetch('http://localhost/project-root/backend/home-management-system-Backend/api/subscription_review.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        subbook_id: reviewData.subbook_id,
        provider_name: reviewData.provider_name,
        service_name: reviewData.plan_name,
        amount: reviewData.amount,
        rating: reviewForm.rating,
        feedback_text: reviewForm.feedback
      })
    })
      .then(res => res.json())
      .then(result => {
        setLoading(false);
        if (result.status === 'success') {
          setShowReviewModal(false);
          setReviewForm({ rating: 5, feedback: '' });
          setReviewData(null);
          toast.success('Review submitted successfully!');
        } else {
          toast.error(result.message || 'Failed to submit review.');
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error('Network error occurred.');
      });
  };

  const filteredPlans = plans.filter((plan) => {
    if (['pending', 'waiting', 'process', 'cancel'].includes(activeTab)) {
      return plan.subbooking_status === activeTab;
    }
    return plan.subbooking_status === activeTab;
  });

  return (
    <div className="customer-dashboard-subscription-super">
      <h2 style={{ margin: '0rem 0 1.5rem 0rem', color: '#1a3665', fontSize: '2.5rem', fontWeight: '600', textAlign: 'center'}}>Subscription Booking</h2>
      <div className="customer-subscription-tabs-bg">
        <div className="customer-subscription-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`customer-subscription-tab-btn${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span style={{ marginRight: '8px' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {loading && <div style={{textAlign: 'center', padding: '2rem'}}>Loading...</div>}
      {apiError && <div style={{textAlign: 'center', padding: '2rem', color: 'red'}}>{apiError}</div>}
      
      <div className="customer-subscription-table-container">
        <div className="customer-subscription-table-scroll">
          <table className="customer-subscription-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Customer Name</th>
                <th>Booking Date</th>
                <th>Service Date</th>
                <th>Time</th>
                <th>Address</th>
                <th>Phone</th>
                {activeTab === 'cancel' && <th>Cancel Reason</th>}
                {(activeTab === 'pending' || activeTab === 'process' || activeTab === 'complete') && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredPlans.length === 0 ? (
                <tr>
                  <td colSpan={activeTab === 'cancel' ? 8 : ((activeTab === 'pending' || activeTab === 'process' || activeTab === 'complete') ? 8 : 7)} style={{textAlign:'center',color:'#888',padding:'2rem 0'}}>
                    No subscriptions found.
                  </td>
                </tr>
              ) : (
                filteredPlans.map((plan) => (
                  <tr key={plan.subbook_id}>
                    <td>{plan.plan_name || plan.category}</td>
                    <td>{plan.customer_name}</td>
                    <td>{new Date(plan.subbooking_date).toLocaleDateString()}</td>
                    <td>{plan.sub_date}</td>
                    <td>{plan.sub_time}</td>
                    <td>{plan.sub_address}</td>
                    <td>{plan.phoneNo}</td>
                    {activeTab === 'cancel' && <td>{plan.cancel_reason || '-'}</td>}
                    {activeTab === 'pending' && (
                      <td>
                        <button
                          className="customer-subscription-unsubscribe-btn"
                          onClick={() => setUnsubscribeModalId(plan.subbook_id)}
                          style={{background: '#16305a', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer'}}
                        >
                          Cancel
                        </button>
                      </td>
                    )}
                    {activeTab === 'process' && (
                      <td>
                        <button
                          className="customer-subscription-unsubscribe-btn"
                          onClick={() => setUnsubscribeModalId(plan.subbook_id)}
                          style={{background: '#16305a', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer'}}
                        >
                          Unsubscribe
                        </button>
                      </td>
                    )}
                    {activeTab === 'complete' && (
                      <td>
                        <button
                          className="customer-subscription-view-details-btn"
                          onClick={() => handleViewDetails(plan)}
                          style={{background: '#16305a', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer'}}
                        >
                          View Details
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancel Modal */}
      {unsubscribeModalId && (
        <div className="customer-modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div className="customer-modal" style={{background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px'}}>
            <h3>Cancel Subscription</h3>
            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem'}}>Reason for cancellation:</label>
              <textarea
                value={unsubscribeReason}
                onChange={(e) => setUnsubscribeReason(e.target.value)}
                placeholder="Please provide a reason for cancellation..."
                style={{width: '100%', minHeight: '100px', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
              />
            </div>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
              <button
                onClick={() => {setUnsubscribeModalId(null); setUnsubscribeReason('');}}
                style={{padding: '0.5rem 1rem', border: '1px solid #ddd', background: 'white', borderRadius: '4px', cursor: 'pointer'}}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleUnsubscribeSubmit}
                style={{padding: '0.5rem 1rem', background: '#1a3665', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                disabled={loading || !unsubscribeReason.trim()}
              >
                {loading ? 'Cancelling...' : 'Confirm Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && selectedPlan && (
        <div className="customer-modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div className="customer-modal" style={{background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px'}}>
            <h3>Subscription Details</h3>
            <div style={{marginBottom: '1.5rem'}}>
              <p><strong>Plan:</strong> {selectedPlan.plan_name || selectedPlan.category}</p>
              <p><strong>Customer:</strong> {selectedPlan.customer_name}</p>
              <p><strong>Booking Date:</strong> {new Date(selectedPlan.subbooking_date).toLocaleDateString()}</p>
              <p><strong>Service Date:</strong> {selectedPlan.sub_date}</p>
              <p><strong>Time:</strong> {selectedPlan.sub_time}</p>
              <p><strong>Address:</strong> {selectedPlan.sub_address}</p>
              <p><strong>Phone:</strong> {selectedPlan.phoneNo}</p>
              <p><strong>Amount:</strong> ${selectedPlan.amount}</p>
            </div>
            
            {selectedPlan.subbooking_status === 'complete' && (
              <div style={{marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '4px', borderLeft: '4px solid #28a745'}}>
                <h4 style={{margin: '0 0 1rem 0', color: '#155724'}}>Service Review</h4>
                {reviewStatus === 'loading' && (
                  <p style={{color: '#666', fontStyle: 'italic'}}>Checking review status...</p>
                )}
                {reviewStatus === 'exists' && (
                  <p style={{color: '#155724', fontWeight: '500'}}>✓ Review already sent</p>
                )}
                {reviewStatus === 'not-exists' && (
                  <button
                    onClick={() => {
                      setReviewData({
                        subbook_id: selectedPlan.subbook_id,
                        plan_name: selectedPlan.plan_name || selectedPlan.category,
                        provider_name: selectedPlan.provider_name || 'Provider',
                        amount: selectedPlan.amount
                      });
                      setShowDetailsModal(false);
                      setShowReviewModal(true);
                    }}
                    style={{
                      background: '#28a745',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    Send Review
                  </button>
                )}
              </div>
            )}
            
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedPlan(null);
                  setReviewStatus(null);
                }}
                style={{padding: '0.5rem 1rem', border: '1px solid #ddd', background: 'white', borderRadius: '4px', cursor: 'pointer'}}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && reviewData && (
        <div className="customer-modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div className="customer-modal" style={{background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '500px'}}>
            <h3>Rate & Review Subscription</h3>
            <div style={{marginBottom: '1rem'}}>
              <p><strong>Plan:</strong> {reviewData.plan_name}</p>
              <p><strong>Provider:</strong> {reviewData.provider_name}</p>
            </div>
            
            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem'}}>Rating:</label>
              <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1rem'}}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setReviewForm(prev => ({...prev, rating: star}))}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      color: star <= reviewForm.rating ? '#ffd700' : '#ddd'
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem'}}>Feedback:</label>
              <textarea
                value={reviewForm.feedback}
                onChange={(e) => setReviewForm(prev => ({...prev, feedback: e.target.value}))}
                placeholder="Please share your experience with this subscription service..."
                style={{width: '100%', minHeight: '100px', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'}}
              />
            </div>

            <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
              <button
                onClick={() => {setShowReviewModal(false); setReviewForm({rating: 5, feedback: ''}); setReviewData(null);}}
                style={{padding: '0.5rem 1rem', border: '1px solid #ddd', background: 'white', borderRadius: '4px', cursor: 'pointer'}}
                disabled={loading}
              >
                Skip Review
              </button>
              <button
                onClick={handleReviewSubmit}
                style={{padding: '0.5rem 1rem', background: '#16305a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                disabled={loading || !reviewForm.feedback.trim()}
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}