import React, { useEffect, useState } from 'react';
import './Feedback.css';

const AdminFeedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost/project-root/backend/home-management-system-Backend/api/service_review.php')
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
  }, []);


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
            <div className="header-cell">Service Type</div>
          </div>
          <div className="admin-feedback-table-body">
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center', width: '100%' }}>Loading...</div>
            ) : feedbackData.length > 0 ? feedbackData.map((feedback) => (
              <div key={feedback.review_id} className="admin-feedback-table-row">
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
                <div className="table-cell service-type-cell">
                  <span className="service-type-badge">Service Booking</span>
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