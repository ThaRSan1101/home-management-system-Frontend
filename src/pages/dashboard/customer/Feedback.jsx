import React from 'react';
import './Feedback.css';

const feedbackData = [
  {
    id: 1,
    service: 'AC Repair',
    provider: 'CoolBreeze Experts',
    amount: 900,
    rating: 5,
    comment: 'Quick and friendly service!',
    date: '2024-06-15',
    serviceType: 'Service Booking',
    status: 'completed'
  },
  {
    id: 2,
    service: 'Pest Control',
    provider: 'SafeHome Pest Solutions',
    amount: 1100,
    rating: 4,
    comment: 'Very thorough and professional.',
    date: '2024-06-09',
    serviceType: 'Service Booking',
    status: 'completed'
  },
  {
    id: 3,
    service: 'Water Purifier Service',
    provider: 'PureLife Services',
    amount: 700,
    rating: 5,
    comment: 'My purifier works like new!',
    date: '2024-05-30',
    serviceType: 'Service Booking',
    status: 'completed'
  }
];

const DashboardFeedback = () => (
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
          <div className="header-cell">Service Type</div>
        </div>
        <div className="customer-dashboard-feedback-table-body">
          {feedbackData.map(feedback => (
            <div key={feedback.id} className="customer-dashboard-feedback-table-row">
              <div className="table-cell service-cell">
                <span>{feedback.service}</span>
              </div>
              <div className="table-cell provider-cell">
                <span>{feedback.provider}</span>
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
    {feedbackData.length === 0 && (
      <div className="customer-dashboard-feedback-empty">
        <div className="empty-icon">📝</div>
        <h3>No feedback found</h3>
        <p>You haven't submitted any feedback yet.</p>
      </div>
    )}
  </div>
);

export default DashboardFeedback;