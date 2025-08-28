import React, { useEffect, useState } from 'react';
import './Feedback.css';

const AdminFeedback = () => {
  const [serviceReviews, setServiceReviews] = useState([]);
  const [subscriptionReviews, setSubscriptionReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Fetch both service and subscription reviews
    Promise.all([
      fetch('http://localhost/project-root/backend/home-management-system-Backend/api/service_review.php'),
      fetch('http://localhost/project-root/backend/home-management-system-Backend/api/subscription_review.php')
    ])
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(([serviceData, subscriptionData]) => {
      setServiceReviews(serviceData.status === 'success' ? (serviceData.data || []) : []);
      setSubscriptionReviews(subscriptionData.status === 'success' ? (subscriptionData.data || []) : []);
      setLoading(false);
    })
    .catch(() => {
      setServiceReviews([]);
      setSubscriptionReviews([]);
      setLoading(false);
    });
  }, []);

  // Combine and sort all reviews by date
  const allReviews = [
    ...serviceReviews.map(review => ({ ...review, service_type: 'Service Booking' })),
    ...subscriptionReviews.map(review => ({ ...review, service_type: 'Subscription Booking' }))
  ].sort((a, b) => new Date(b.reviewed_at) - new Date(a.reviewed_at));


const renderStars = (rating) => {
  return [...Array(5)].map((_, index) => (
    <span key={index} className={`admin-feedback-star${index < rating ? ' filled' : ' empty'}`}>★</span>
  ));
};

  return (
    <div className="admin-feedback-super">
      <div className="admin-feedback-header">
        <h1>Feedback Overview</h1>
        <p>Review and manage all service feedback from customers and providers</p>
      </div>
      <div className="admin-feedback-table-container">
        <div className="admin-feedback-table">
          <div className="admin-feedback-table-header">
            <div className="header-cell">Service</div>
            <div className="header-cell">Provider Name</div>
            <div className="header-cell">Customer Name</div>
            <div className="header-cell">Amount</div>
            <div className="header-cell">Rating</div>
            <div className="header-cell">Comment</div>
            <div className="header-cell">Date</div>
            
          </div>
          <div className="admin-feedback-table-body">
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center', width: '100%' }}>Loading...</div>
            ) : allReviews.length > 0 ? allReviews.map((feedback) => (
              <div key={`${feedback.service_type}-${feedback.review_id}`} className="admin-feedback-table-row">
                <div className="table-cell service-cell">
                  <span className="service-name">{feedback.service_name}</span>
                </div>
                <div className="table-cell provider-cell">
                  <span>{feedback.provider_name}</span>
                </div>
                <div className="table-cell customer-cell">
                  <span>{feedback.customer_name}</span>
                </div>
                <div className="table-cell amount-cell">
                  <span className="amount">Rs {Number(feedback.amount).toFixed(2)}</span>
                </div>
                <div className="table-cell rating-cell">
                  <div className="rating-stars">
                    {renderStars(feedback.rating)}
                  </div>
                </div>
                <div className="table-cell comment-cell">
                  <div className="comment-content">
                    <p>{feedback.feedback_text}</p>
                  </div>
                </div>
                <div className="table-cell date-cell">
                  <span>{new Date(feedback.reviewed_at).toLocaleDateString()}</span>
                </div>
              </div>
            )) : (
              <div className="admin-feedback-empty">
                <div className="empty-icon">📝</div>
                <h3>No feedback found</h3>
                <p>No reviews have been submitted yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminFeedback;