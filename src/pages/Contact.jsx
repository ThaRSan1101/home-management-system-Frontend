import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    // Reset submission status after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      color: '#3B82F6'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      details: ['info@homeservice.com', 'support@homeservice.com'],
      color: '#10B981'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Address',
      details: ['123 Service Street', 'City, State 12345'],
      color: '#F59E0B'
    },
    {
      icon: <FaClock />,
      title: 'Business Hours',
      details: ['Mon-Fri: 8AM-6PM', 'Sat: 9AM-4PM'],
      color: '#8B5CF6'
    }
  ];

  const faqs = [
    {
      question: 'How do I book a service?',
      answer: 'You can book a service by browsing our available services, selecting your preferred provider, and choosing a convenient time slot. Our booking process is simple and takes just a few minutes.'
    },
    {
      question: 'What if I need to cancel my appointment?',
      answer: 'You can cancel your appointment up to 24 hours before the scheduled time without any cancellation fees. Cancellations made within 24 hours may be subject to a small fee.'
    },
    {
      question: 'Are your service providers insured?',
      answer: 'Yes, all our service providers are fully insured and licensed. We thoroughly vet all professionals before they join our platform to ensure quality and safety.'
    },
    {
      question: 'How do I know if a provider is reliable?',
      answer: 'All our providers are pre-screened, background-checked, and rated by previous customers. You can read reviews and ratings before booking to make an informed decision.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and digital payment methods. Payment is processed securely through our platform after service completion.'
    },
    {
      question: 'Do you offer emergency services?',
      answer: 'Yes, we offer 24/7 emergency services for urgent home repairs. Simply call our emergency hotline and we\'ll connect you with an available provider immediately.'
    }
  ];

  return (
    <div className="contact page-content">
      <div className="contact-main">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="hero-content">
            <h1>Contact HomeService</h1>
            <p style={{fontWeight: '600', fontSize: '1.35rem', color: '#111', textShadow: '0 2px 8px rgba(255,255,255,0.18)'}}>We're here to help! Reach out with your questions, feedback, or service requests and our team will respond promptly and clearly.</p>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="contact-info-section">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card">
                <div className="info-icon" style={{ backgroundColor: info.color }}>
                  {info.icon}
                </div>
                <h3>{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx}>{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form-section">
          <div className="form-container">
            <div className="form-header">
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>
            
            {isSubmitted && (
              <div className="success-message">
                <FaCheckCircle />
                <p>Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this about?"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                <FaPaperPlane />
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <div className="map-container">
            <h2>Find Us</h2>
            <div className="map-placeholder">
              <FaMapMarkerAlt />
              <p>Interactive map will be displayed here</p>
              <p>123 Service Street, City, State 12345</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about our services</p>
          </div>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="contact-cta">
          <div className="cta-content">
            <h2>Ready to Book or Have Questions?</h2>
            <p>Contact us today or explore our services to get started!</p>
            <div className="cta-buttons">
              <a href="/services" className="btn btn-primary">View Services</a>
              <a href="/about" className="btn btn-outline">About Us</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact; 