import React, { useState } from 'react';
import './Feedback.css';
import { FaStar, FaCalendarAlt } from 'react-icons/fa';

const feedbackData = [
  {
    id: 1,
    customerName: 'Sarah Johnson',
    rating: 5,
    comment: 'Excellent work! Very professional and friendly.',
    date: '2024-06-01',
    service: 'Home Cleaning',
    amount: 120,
    serviceType: 'Service Booking',
  },
  {
    id: 2,
    customerName: 'Michael Chen',
    rating: 4,
    comment: 'Good service, but arrived a bit late.',
    date: '2024-05-28',
    service: 'Plumbing',
    amount: 80,
    serviceType: 'Service Booking',
  },
  {
    id: 3,
    customerName: 'Emily Rodriguez',
    rating: 5,
    comment: 'Outstanding! Will book again.',
    date: '2024-05-20',
    service: 'Electrical Repair',
    amount: 95,
    serviceType: 'Service Booking',
  },
  {
    id: 4,
    customerName: 'David Thompson',
    rating: 3,
    comment: 'Service was okay, but could be faster.',
    date: '2024-05-15',
    service: 'Carpet Cleaning',
    amount: 60,
    serviceType: 'Subscription Booking',
  },
];

export default function ProviderFeedback() {
  const [search, setSearch] = useState('');
  const filtered = feedbackData.filter(f =>
    f.customerName.toLowerCase().includes(search.toLowerCase()) ||
    f.comment.toLowerCase().includes(search.toLowerCase())
  );

  const renderStars = (rating) => (
    <>
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={`star ${i < rating ? 'filled' : 'empty'}`} />
      ))}
      <span className="rating-text">{rating}/5</span>
    </>
  );

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
            {filtered.map((feedback) => (
              <div key={feedback.id} className="customer-dashboard-feedback-table-row">
                <div className="table-cell service-cell">
                  <div className="service-info">
                    <span className="service-name">{feedback.service}</span>
                  </div>
                </div>
                <div className="table-cell provider-cell">
                  <div className="provider-info">
                    <span>{feedback.customerName}</span>
                  </div>
                </div>
                <div className="table-cell amount-cell">
                  <span className="amount">${feedback.amount?.toFixed(2) ?? '-'}</span>
                </div>
                <div className="table-cell rating-cell">
                  <div className="rating-stars">
                    {renderStars(feedback.rating)}
                  </div>
                </div>
                <div className="table-cell comment-cell">
                  <div className="comment-content">
                    <p>{feedback.comment}</p>
                  </div>
                </div>
                <div className="table-cell date-cell">
                  <div className="date-info">
                    <FaCalendarAlt className="date-icon" />
                    <span>{new Date(feedback.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="table-cell service-type-cell">
                  <span className="service-type-badge">{feedback.serviceType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {filtered.length === 0 && (
        <div className="customer-dashboard-feedback-empty">
          <div className="empty-icon">📝</div>
          <h3>No feedback found</h3>
          <p>No customer reviews match your search.</p>
        </div>
      )}
    </div>
  );
} 