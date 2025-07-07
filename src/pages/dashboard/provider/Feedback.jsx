import React from 'react';
import './Feedback.css';
import { FaStar, FaUser, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import Footer from '../../../components/Footer';

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
    <FaStar key={index} className={`feedback-star ${index < rating ? 'filled' : 'empty'}`} />
  ));
};

export default function ProviderFeedback() {
  return (
    <div className="feedback-page">
      <div className="feedback-header">
        <h1>Customer Reviews</h1>
        <p>See what your customers are saying about your services</p>
      </div>
      <div className="feedback-grid">
        {feedbackData.map((feedback) => (
          <div key={feedback.id} className="feedback-card">
            <div className="feedback-card-header">
              <div className="feedback-avatar"><FaUser /></div>
              <div className="feedback-customer-name">{feedback.customerName}</div>
            </div>
            <div className="feedback-card-body">
              <div className="feedback-service">
                <FaClipboardList className="feedback-service-icon" />
                <span>{feedback.service}</span>
              </div>
              <div className="feedback-rating">
                {renderStars(feedback.rating)}
                <span className="feedback-rating-text">{feedback.rating}/5</span>
              </div>
              <div className="feedback-comment">{feedback.comment}</div>
            </div>
            <div className="feedback-card-footer">
              <FaCalendarAlt className="feedback-date-icon" />
              <span>{new Date(feedback.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
} 