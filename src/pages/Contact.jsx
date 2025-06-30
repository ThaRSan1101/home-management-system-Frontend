import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
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
    <React.Fragment>
      <div className="contactus-split-container">
        <div className="contactus-left">
          <h1 className="contactus-header">SEND MESSAGE</h1>
          <form className="contactus-form" onSubmit={handleSubmit}>
            <div className="contactus-form-group">
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="contactus-form-group">
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="contactus-form-group">
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="contactus-form-group">
              <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
            </div>
            <div className="contactus-form-group">
              <textarea name="message" placeholder="Enter your message..." value={formData.message} onChange={handleChange} rows={3} required />
            </div>
            <button type="submit" className="contactus-send-btn">Send Message</button>
            {isSubmitted && <div className="contactus-success">Thank you! Your message has been sent.</div>}
          </form>
        </div>
        <div className="contactus-right">
          <div className="contactus-right-content">
            <span className="contactus-contactus">contact us</span>
            <h2 className="contactus-title">PLEASE GET IN TOUCH</h2>
            <div className="contactus-info-list">
              <div className="contactus-info-item">
                <FaMapMarkerAlt className="contactus-info-icon" />
                <span className="contactus-info-label">Address :</span>
                <span className="contactus-info-value">25, Kensington Garden, Colombo 00400</span>
              </div>
              <div className="contactus-info-item">
                <FaPhone className="contactus-info-icon" />
                <span className="contactus-info-label">Phone :</span>
                <span className="contactus-info-value">(+94) 77 442 2448</span>
              </div>
              <div className="contactus-info-item">
                <FaEnvelope className="contactus-info-icon" />
                <span className="contactus-info-label">Email :</span>
                <span className="contactus-info-value">info@homeservice.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="map-section">
        <iframe
          title="Google Map of Culture Colombo"
          src="https://maps.google.com/maps?q=25%20Kensington%20Garden%2C%20Colombo%2000400&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
          loading="lazy"
        ></iframe>
      </section>
    </React.Fragment>
  );
};

export default Contact; 