import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="contactus-split-container">
      <div className="contactus-left-panel">
        <h1 className="contactus-title">SEND MESSAGE</h1>
        <form className="contactus-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
          <textarea name="message" placeholder="Enter your message..." value={formData.message} onChange={handleChange} rows={4} required />
          <button type="submit">Send Message</button>
          {isSubmitted && <div className="contactus-success">Message sent successfully!</div>}
        </form>
      </div>
      <div className="contactus-right-panel">
        <div className="contactus-contact-label">contact us</div>
        <h2 className="contactus-getintouch">PLEASE GET IN TOUCH</h2>
        <div className="contactus-info-list">
          <div className="contactus-info-item">
            <span className="contactus-info-icon">📍</span>
            <span className="contactus-info-text"><b>Address :</b> No 25 Kensington Garden, Colombo 00400</span>
          </div>
          <div className="contactus-info-item">
            <span className="contactus-info-icon">📞</span>
            <span className="contactus-info-text"><b>Phone :</b> (+94) 77 442 2448</span>
          </div>
          <div className="contactus-info-item">
            <span className="contactus-info-icon">⏰</span>
            <span className="contactus-info-text"><b>Opening Hours :</b> 10:00 AM - 10:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 