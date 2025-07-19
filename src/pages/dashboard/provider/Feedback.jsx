import React, { useState } from 'react';
import './Feedback.css';
import { FaStar, FaUser, FaCalendarAlt, FaClipboardList, FaTrophy, FaSmile, FaChartLine, FaSearch, FaUsers } from 'react-icons/fa';
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

const serviceTypes = ['All', ...Array.from(new Set(feedbackData.map(f => f.service)))];
const ratings = ['All', 5, 4, 3, 2, 1];

export default function ProviderFeedback() {
  const [serviceFilter, setServiceFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Filter logic
  const filtered = feedbackData.filter(f =>
    (serviceFilter === 'All' || f.service === serviceFilter) &&
    (ratingFilter === 'All' || f.rating === ratingFilter) &&
    (f.customerName.toLowerCase().includes(search.toLowerCase()) || f.comment.toLowerCase().includes(search.toLowerCase()))
  );

  // Stats
  const totalReviews = feedbackData.length;
  const avgRating = (feedbackData.reduce((sum, f) => sum + f.rating, 0) / totalReviews).toFixed(1);
  const satisfaction = Math.round((feedbackData.filter(f => f.rating >= 4).length / totalReviews) * 100);
  const topService = feedbackData.reduce((acc, f) => {
    acc[f.service] = (acc[f.service] || 0) + 1;
    return acc;
  }, {});
  const topServiceName = Object.keys(topService).reduce((a, b) => topService[a] > topService[b] ? a : b);

  // Emoji for rating
  const ratingEmoji = (rating) => rating >= 5 ? '😍' : rating >= 4 ? '😊' : rating >= 3 ? '😐' : '😞';

  return (
    <div className="feedback-page-modern">
      <div className="feedback-header-modern">
        <h1><FaUsers className="header-icon" /> Customer Reviews</h1>
        <p>Discover what our amazing customers have to say about our services!</p>
        <div className="feedback-header-actions">
          <button className="btn-primary">Leave a Review</button>
          <button className="btn-secondary">View Analytics</button>
        </div>
      </div>
      <div className="feedback-stats-grid">
        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <div className="stat-label">Total Reviews</div>
          <div className="stat-value">{totalReviews}</div>
        </div>
        <div className="stat-card">
          <FaStar className="stat-icon" />
          <div className="stat-label">Average Rating</div>
          <div className="stat-value">{avgRating}/5</div>
        </div>
        <div className="stat-card">
          <FaChartLine className="stat-icon" />
          <div className="stat-label">Satisfaction</div>
          <div className="stat-value">{satisfaction}%</div>
        </div>
        <div className="stat-card">
          <FaTrophy className="stat-icon" />
          <div className="stat-label">Top Service</div>
          <div className="stat-value">{topServiceName}</div>
        </div>
      </div>
      <div className="feedback-filter-bar">
        <div className="filter-group">
          <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)}>
            {serviceTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          <select value={ratingFilter} onChange={e => setRatingFilter(e.target.value === 'All' ? 'All' : Number(e.target.value))}>
            {ratings.map(r => <option key={r} value={r}>{r === 'All' ? 'All Ratings' : `${r} Stars`}</option>)}
          </select>
        </div>
        <div className="search-group">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="feedback-grid-modern">
        {filtered.map((feedback) => (
          <div key={feedback.id} className="feedback-card-modern">
            <div className="feedback-card-header">
              <div className="feedback-avatar"><FaUser /></div>
              <div className="feedback-customer-name">{feedback.customerName}</div>
              <div className="feedback-service-tag">
                <span role="img" aria-label={feedback.service}>{feedback.service === 'Home Cleaning' ? '🧹' : feedback.service === 'Plumbing' ? '🛠' : feedback.service === 'Electrical Repair' ? '💡' : feedback.service === 'Carpet Cleaning' ? '🧼' : '🔧'}</span>
                {feedback.service}
              </div>
            </div>
            <div className="feedback-card-body">
              <div className="feedback-comment">“{feedback.comment}”</div>
            </div>
            <div className="feedback-card-footer">
              <div className="feedback-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`feedback-star ${i < feedback.rating ? 'filled' : 'empty'}`} />
                ))}
                <span className="feedback-rating-text">{feedback.rating}/5</span>
                <span className="feedback-rating-emoji">{ratingEmoji(feedback.rating)}</span>
              </div>
              <div className="feedback-date">
                <FaCalendarAlt className="feedback-date-icon" />
                <span>{new Date(feedback.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="feedback-footer-summary">
        <span role="img" aria-label="celebration">🎉</span>
        Showing {filtered.length} of {feedbackData.length} reviews
      </div>
      <Footer />
    </div>
  );
} 