import React from 'react';
import './Feedback.css';

const feedbackData = [
  {
    id: 1,
    service: 'House Cleaning',
    customerName: 'Sarah Johnson',
    providerName: 'CleanPro Services',
    amount: 1500,
    rating: 5,
    comment: 'Excellent service! The team was professional and thorough. My house looks spotless.',
    date: '2024-01-15',
    serviceType: 'Service Booking',
  },
  {
    id: 2,
    service: 'Electrical Repair',
    customerName: 'Michael Chen',
    providerName: 'ElectroFix Solutions',
    amount: 1500,
    rating: 4,
    comment: 'Good work on fixing the electrical issues. Arrived on time and completed the job efficiently.',
    date: '2024-01-12',
    serviceType: 'Service Booking',
  },
  {
    id: 3,
    service: 'Plumbing',
    customerName: 'Emily Rodriguez',
    providerName: 'PlumbRight Co.',
    amount: 1500,
    rating: 5,
    comment: 'Outstanding service! Fixed the leak quickly and explained everything clearly.',
    date: '2024-01-10',
    serviceType: 'Service Booking',
  },
];

const renderStars = (rating) => {
  return [...Array(5)].map((_, index) => (
    <span key={index} className={`admin-feedback-star${index < rating ? ' filled' : ' empty'}`}>★</span>
  ));
};

const AdminFeedback = () => (
  <div className="admin-feedback-super">
    <div className="admin-feedback-header">
      <h1>Feedback Overview</h1>
      <p>Review and manage all service feedback from customers and providers</p>
    </div>
    <div className="admin-feedback-table-container">
      <div className="admin-feedback-table">
        <div className="admin-feedback-table-header">
          <div className="header-cell">Service</div>
          <div className="header-cell">Customer Name</div>
          <div className="header-cell">Provider Name</div>
          <div className="header-cell">Amount</div>
          <div className="header-cell">Rating</div>
          <div className="header-cell">Comment</div>
          <div className="header-cell">Date</div>
          <div className="header-cell">Service Type</div>
        </div>
        <div className="admin-feedback-table-body">
          {feedbackData.map((feedback) => (
            <div key={feedback.id} className="admin-feedback-table-row">
              <div className="table-cell service-cell">
                <span className="service-name">{feedback.service}</span>
              </div>
              <div className="table-cell customer-cell">
                <span>{feedback.customerName}</span>
              </div>
              <div className="table-cell provider-cell">
                <span>{feedback.providerName}</span>
              </div>
              <div className="table-cell amount-cell">
                <span className="amount">{feedback.amount.toFixed(2)}</span>
              </div>
              <div className="table-cell rating-cell">
                <div className="rating-stars">
                  {renderStars(feedback.rating)}
                  <span className="rating-text">{feedback.rating}/5</span>
                </div>
              </div>
              <div className="table-cell comment-cell">
                <div className="comment-content">
                  <p>{feedback.comment}</p>
                </div>
              </div>
              <div className="table-cell date-cell">
                <span>{new Date(feedback.date).toLocaleDateString()}</span>
              </div>
              <div className="table-cell service-type-cell">
                <span className="service-type-badge">{feedback.serviceType}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminFeedback; 