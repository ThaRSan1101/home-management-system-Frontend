import React from 'react';
import './Feedback.css';
import { FaStar, FaUser, FaCalendarAlt } from 'react-icons/fa';

const feedbackData = [
  {
    id: 1,
    customerName: 'Sarah Johnson',
    rating: 5,
    comment: 'Excellent work! Very professional and friendly.',
    date: '2024-06-01',
    service: 'Home Cleaning',
  },
  {
    id: 2,
    customerName: 'Michael Chen',
    rating: 4,
    comment: 'Good service, but arrived a bit late.',
    date: '2024-05-28',
    service: 'Plumbing',
  },
  {
    id: 3,
    customerName: 'Emily Rodriguez',
    rating: 5,
    comment: 'Outstanding! Will book again.',
    date: '2024-05-20',
    service: 'Electrical Repair',
  },
  {
    id: 4,
    customerName: 'David Thompson',
    rating: 3,
    comment: 'Service was okay, but could be faster.',
    date: '2024-05-15',
    service: 'Carpet Cleaning',
  },
];

const renderStars = (rating) => {
  return [...Array(5)].map((_, index) => (
    <FaStar key={index} className={`provider-feedback-star ${index < rating ? 'filled' : 'empty'}`} />
  ));
};

export default function ProviderFeedback() {
  return (
    <div className="provider-feedback-super">
      <div className="provider-feedback-header">
        <h1>Customer Reviews</h1>
        <p>See what your customers are saying about your services</p>
      </div>
      <div className="provider-feedback-table-container">
        <div className="provider-feedback-table">
          <div className="provider-feedback-table-header">
            <div className="provider-feedback-header-cell">Customer</div>
            <div className="provider-feedback-header-cell">Service</div>
            <div className="provider-feedback-header-cell">Rating</div>
            <div className="provider-feedback-header-cell">Comment</div>
            <div className="provider-feedback-header-cell">Date</div>
          </div>
          <div className="provider-feedback-table-body">
            {feedbackData.map((feedback) => (
              <div key={feedback.id} className="provider-feedback-table-row">
                <div className="provider-feedback-table-cell provider-feedback-customer-cell">
                  <FaUser className="provider-feedback-customer-icon" />
                  <span>{feedback.customerName}</span>
                </div>
                <div className="provider-feedback-table-cell provider-feedback-service-cell">
                  <span>{feedback.service}</span>
                </div>
                <div className="provider-feedback-table-cell provider-feedback-rating-cell">
                  <div className="provider-feedback-rating-stars">
                    {renderStars(feedback.rating)}
                    <span className="provider-feedback-rating-text">{feedback.rating}/5</span>
                  </div>
                </div>
                <div className="provider-feedback-table-cell provider-feedback-comment-cell">
                  <p>{feedback.comment}</p>
                </div>
                <div className="provider-feedback-table-cell provider-feedback-date-cell">
                  <FaCalendarAlt className="provider-feedback-date-icon" />
                  <span>{new Date(feedback.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 