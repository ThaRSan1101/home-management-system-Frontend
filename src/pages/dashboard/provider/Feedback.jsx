import React, { useEffect, useState } from 'react';
import './Feedback.css';

const ProviderFeedback = ({ currentUser }) => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.provider_id) return;
    setLoading(true);
    fetch(`http://localhost/project-root/backend/home-management-system-Backend/api/service_review.php?provider_id=${currentUser.provider_id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setFeedbackData(data.data || []);
        } else {
          setFeedbackData([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setFeedbackData([]);
        setLoading(false);
      });
  }, [currentUser]);

  return (
    <div className="customer-dashboard-feedback-super">
      <div className="customer-dashboard-feedback-header">
        <h1>Customer Reviews</h1>
        <p>Discover what our amazing customers have to say about your services!</p>
      </div>
      <div className="customer-dashboard-feedback-table-container">
        <div className="customer-dashboard-feedback-table">
          <div className="customer-dashboard-feedback-table-header">
            <div className="header-cell">Service</div>
            <div className="header-cell">Customer Name</div>
            <div className="header-cell">Amount</div>
            <div className="header-cell">Rating</div>
            <div className="header-cell">Comment</div>
            <div className="header-cell">Date</div>
            <div className="header-cell">Service Type</div>
          </div>
          <div className="customer-dashboard-feedback-table-body">
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center', width: '100%' }}>Loading...</div>
            ) : feedbackData.length > 0 ? feedbackData.map(feedback => (
              <div key={feedback.review_id} className="customer-dashboard-feedback-table-row">
                <div className="table-cell service-cell">
                  <span>{feedback.service_name}</span>
                </div>
                <div className="table-cell provider-cell">
                  <span>{feedback.customer_name}</span>
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
                <div className="table-cell service-type-cell">
                  <span>Service Booking</span>
                </div>
              </div>
            )) : (
              <div className="customer-dashboard-feedback-empty">
                <div className="empty-icon">📝</div>
                <h3>No feedback found</h3>
                <p>You haven't received any feedback yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderFeedback;