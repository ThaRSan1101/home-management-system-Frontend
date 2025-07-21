import React, { useState } from 'react';
import { FaStar, FaUser, FaCalendarAlt, FaThumbsUp } from 'react-icons/fa';
import './Feedback.css';

const DashboardFeedback = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Sample feedback data
  const feedbackData = [
    {
      id: 1,
      customerName: "Sarah Johnson",
      service: "House Cleaning",
      provider: "CleanPro Services",
      amount: 120,
      rating: 5,
      comment: "Excellent service! The team was professional and thorough. My house looks spotless.",
      date: "2024-01-15",
      serviceType: "Service Booking",
      status: "completed"
    },
    {
      id: 2,
      customerName: "Michael Chen",
      service: "Electrical Repair",
      provider: "ElectroFix Solutions",
      amount: 80,
      rating: 4,
      comment: "Good work on fixing the electrical issues. Arrived on time and completed the job efficiently.",
      date: "2024-01-12",
      serviceType: "Service Booking",
      status: "completed"
    },
    {
      id: 3,
      customerName: "Emily Rodriguez",
      service: "Plumbing",
      provider: "PlumbRight Co.",
      amount: 95,
      rating: 5,
      comment: "Outstanding service! Fixed the leak quickly and explained everything clearly.",
      date: "2024-01-10",
      serviceType: "Service Booking",
      status: "completed"
    },
    {
      id: 4,
      customerName: "David Thompson",
      service: "Garden Maintenance",
      provider: "GreenThumb Services",
      amount: 60,
      rating: 3,
      comment: "Service was okay, but took longer than expected. Garden looks good now.",
      date: "2024-01-08",
      serviceType: "Subscription Booking",
      status: "completed"
    },
    {
      id: 5,
      customerName: "Lisa Wang",
      service: "Carpet Cleaning",
      provider: "FreshCarpet Pro",
      amount: 110,
      rating: 5,
      comment: "Amazing results! The carpets look brand new. Highly recommend!",
      date: "2024-01-05",
      serviceType: "Subscription Booking",
      status: "completed"
    }
  ];

  const filteredFeedback = activeTab === 'all' 
    ? feedbackData 
    : feedbackData.filter(feedback => feedback.status === activeTab);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar 
        key={index} 
        className={`star ${index < rating ? 'filled' : 'empty'}`} 
      />
    ));
  };

  // When feedback is submitted, increment feedback count in localStorage
  const handleFeedbackSubmit = (/* your params */) => {
    // ... your feedback submit logic ...
    const feedback = Number(localStorage.getItem('customer_feedback') || 0) + 1;
    localStorage.setItem('customer_feedback', feedback);
    // ... rest of your logic ...
  };

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
            <div className="header-cell">Service Type</div>
          </div>
          
          <div className="customer-dashboard-feedback-table-body">
            {filteredFeedback.map((feedback) => (
              <div key={feedback.id} className="customer-dashboard-feedback-table-row">
                <div className="table-cell service-cell">
                  <div className="service-info">
                    <span className="service-name">{feedback.service}</span>
                  </div>
                </div>
                
                <div className="table-cell provider-cell">
                  <div className="provider-info">
                    <span>{feedback.provider}</span>
                  </div>
                </div>
                
                <div className="table-cell amount-cell">
                  <span className="amount">Rs {feedback.amount.toFixed(2)}</span>
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

      {filteredFeedback.length === 0 && (
        <div className="customer-dashboard-feedback-empty">
          <div className="empty-icon">📝</div>
          <h3>No feedback found</h3>
          <p>You haven't submitted any feedback yet.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardFeedback; 