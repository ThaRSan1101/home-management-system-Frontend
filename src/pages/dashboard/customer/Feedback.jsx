import React, { useEffect, useState } from 'react';
import './Feedback.css';

const DashboardFeedback = ({ currentUser }) => {
  const [serviceReviews, setServiceReviews] = useState([]);
  const [subscriptionReviews, setSubscriptionReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.user_id) return;
    
    setLoading(true);
    
    // Fetch both service and subscription reviews
    Promise.all([
      fetch(`http://localhost/project-root/backend/home-management-system-Backend/api/service_review.php`),
      fetch(`http://localhost/project-root/backend/home-management-system-Backend/api/subscription_review.php`)
    ])
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(([serviceData, subscriptionData]) => {
      // Filter reviews where the customer_id matches current user
      const filteredServiceReviews = serviceData.status === 'success' ? 
        (serviceData.data || []).filter(fb => String(fb.customer_id) === String(currentUser.user_id)) : [];
      const filteredSubscriptionReviews = subscriptionData.status === 'success' ? 
        (subscriptionData.data || []).filter(fb => String(fb.customer_id) === String(currentUser.user_id)) : [];
      
      setServiceReviews(filteredServiceReviews);
      setSubscriptionReviews(filteredSubscriptionReviews);
      setLoading(false);
    })
    .catch(() => {
      setServiceReviews([]);
      setSubscriptionReviews([]);
      setLoading(false);
    });
  }, [currentUser]);

  // Combine and sort all reviews by date
  const allReviews = [
    ...serviceReviews,
    ...subscriptionReviews
  ].sort((a, b) => new Date(b.reviewed_at) - new Date(a.reviewed_at));

  return (
    <div className="customer-dashboard-feedback-super">
      <div className="customer-dashboard-feedback-header">
        <h1>My Feedback</h1>
        <p>Review and manage your service feedback</p>
      </div>
      <div className="customer-dashboard-feedback-table-container">
        <div className="customer-dashboard-feedback-table">
          <div className="customer-dashboard-feedback-table-header">
            <div className="header-cell">Service</div>
            <div className="header-cell">Provider Name</div>
            <div className="header-cell">Amount</div>
            <div className="header-cell">Rating</div>
            <div className="header-cell">Comment</div>
            <div className="header-cell">Date</div>
          </div>
          <div className="customer-dashboard-feedback-table-body">
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center', width: '100%' }}>Loading...</div>
            ) : allReviews.length > 0 ? allReviews.map(feedback => (
              <div key={`${feedback.service_name}-${feedback.review_id}`} className="customer-dashboard-feedback-table-row">
                <div className="table-cell service-cell">
                  <span>{feedback.service_name}</span>
                </div>
                <div className="table-cell provider-cell">
                  <span>{feedback.provider_name}</span>
                </div>
                <div className="table-cell amount-cell">
                  <span>Rs {Number(feedback.amount).toFixed(2)}</span>
                </div>
                <div className="table-cell rating-cell">
                  <span>{'★'.repeat(feedback.rating)}{'☆'.repeat(5-feedback.rating)}</span>
                </div>
                <div className="table-cell comment-cell">
                  <span>{feedback.feedback_text}</span>
                </div>
                <div className="table-cell date-cell">
                  <span>{new Date(feedback.reviewed_at).toLocaleDateString()}</span>
                </div>
              </div>
            )) : (
              <div className="customer-dashboard-feedback-empty">
                <div className="empty-icon">📝</div>
                <h3>No feedback found</h3>
                <p>You haven't submitted any feedback yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardFeedback;