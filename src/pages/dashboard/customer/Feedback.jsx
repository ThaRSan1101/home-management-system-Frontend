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
      rating: 5,
      comment: "Excellent service! The team was professional and thorough. My house looks spotless.",
      date: "2024-01-15",
      status: "completed",
      provider: "CleanPro Services"
    },
    {
      id: 2,
      customerName: "Michael Chen",
      service: "Electrical Repair",
      rating: 4,
      comment: "Good work on fixing the electrical issues. Arrived on time and completed the job efficiently.",
      date: "2024-01-12",
      status: "completed",
      provider: "ElectroFix Solutions"
    },
    {
      id: 3,
      customerName: "Emily Rodriguez",
      service: "Plumbing",
      rating: 5,
      comment: "Outstanding service! Fixed the leak quickly and explained everything clearly.",
      date: "2024-01-10",
      status: "completed",
      provider: "PlumbRight Co."
    },
    {
      id: 4,
      customerName: "David Thompson",
      service: "Garden Maintenance",
      rating: 3,
      comment: "Service was okay, but took longer than expected. Garden looks good now.",
      date: "2024-01-08",
      status: "completed",
      provider: "GreenThumb Services"
    },
    {
      id: 5,
      customerName: "Lisa Wang",
      service: "Carpet Cleaning",
      rating: 5,
      comment: "Amazing results! The carpets look brand new. Highly recommend!",
      date: "2024-01-05",
      status: "completed",
      provider: "FreshCarpet Pro"
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

  return (
    <div className="dashboard-feedback-super">
      <div className="dashboard-feedback-header">
        <h1>My Feedback</h1>
        <p>Review and manage your service feedback</p>
      </div>

      <div className="dashboard-feedback-tabs">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Feedback ({feedbackData.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({feedbackData.filter(f => f.status === 'completed').length})
        </button>
      </div>

      <div className="dashboard-feedback-table-container">
        <div className="dashboard-feedback-table">
          <div className="dashboard-feedback-table-header">
            <div className="header-cell">Service</div>
            <div className="header-cell">Provider</div>
            <div className="header-cell">Rating</div>
            <div className="header-cell">Comment</div>
            <div className="header-cell">Date</div>
            <div className="header-cell">Status</div>
          </div>
          
          <div className="dashboard-feedback-table-body">
            {filteredFeedback.map((feedback) => (
              <div key={feedback.id} className="dashboard-feedback-table-row">
                <div className="table-cell service-cell">
                  <div className="service-info">
                    <span className="service-name">{feedback.service}</span>
                  </div>
                </div>
                
                <div className="table-cell provider-cell">
                  <div className="provider-info">
                    <FaUser className="provider-icon" />
                    <span>{feedback.provider}</span>
                  </div>
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
                    <div className="customer-name">
                      <FaUser className="customer-icon" />
                      {feedback.customerName}
                    </div>
                  </div>
                </div>
                
                <div className="table-cell date-cell">
                  <div className="date-info">
                    <FaCalendarAlt className="date-icon" />
                    <span>{new Date(feedback.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="table-cell status-cell">
                  <div className={`status-badge ${feedback.status}`}>
                    <FaThumbsUp className="status-icon" />
                    <span>{feedback.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {filteredFeedback.length === 0 && (
        <div className="dashboard-feedback-empty">
          <div className="empty-icon">📝</div>
          <h3>No feedback found</h3>
          <p>You haven't submitted any feedback yet.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardFeedback; 