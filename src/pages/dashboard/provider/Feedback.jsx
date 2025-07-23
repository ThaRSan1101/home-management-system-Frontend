import React from 'react';
import './Feedback.css';

const feedbackData = [
  {
    id: 1,
    service: 'Home Cleaning',
    customerName: 'Sarah Johnson',
    amount: 1200,
    rating: 5,
    comment: 'Excellent work! Very professional and friendly.',
    date: '2024-06-01',
    serviceType: 'Service Booking',
    status: 'completed',
  },
  {
    id: 2,
    service: 'Plumbing',
    customerName: 'Michael Chen',
    amount: 1100,
    rating: 4,
    comment: 'Good service, but arrived a bit late.',
    date: '2024-05-28',
    serviceType: 'Service Booking',
    status: 'completed',
  },
  {
    id: 3,
    service: 'Electrical Repair',
    customerName: 'Emily Rodriguez',
    amount: 1500,
    rating: 5,
    comment: 'Outstanding! Will book again.',
    date: '2024-05-20',
    serviceType: 'Service Booking',
    status: 'completed',
  }
];

const ProviderFeedback = () => (
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
          {feedbackData.map(feedback => (
            <div key={feedback.id} className="customer-dashboard-feedback-table-row">
              <div className="table-cell service-cell">
                <span>{feedback.service}</span>
              </div>
              <div className="table-cell provider-cell">
                <span>{feedback.customerName}</span>
              </div>
              <div className="table-cell amount-cell">
                <span>Rs {feedback.amount.toFixed(2)}</span>
              </div>
              <div className="table-cell rating-cell">
                <span>{'★'.repeat(feedback.rating)}{'☆'.repeat(5-feedback.rating)}</span>
              </div>
              <div className="table-cell comment-cell">
                <span>{feedback.comment}</span>
              </div>
              <div className="table-cell date-cell">
                <span>{new Date(feedback.date).toLocaleDateString()}</span>
              </div>
              <div className="table-cell service-type-cell">
                <span>{feedback.serviceType}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ProviderFeedback;