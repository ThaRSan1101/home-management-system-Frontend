import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Footer from '../../../components/Footer';
import { toast } from 'sonner';

const ProviderContact = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Custom validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name.');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email address.');
      return;
    }
    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (formData.phone.trim() && !/^\d{10}$/.test(formData.phone.trim())) {
      toast.error('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your message.');
      return;
    }
    try {
      const response = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/contact_us.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone,
          subject: formData.subject,
          message: formData.message
        })
      });
      const result = await response.json();
      if (result.success) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        toast.error(result.error || 'Failed to send message.');
      }
    } catch (error) {
      toast.error('Server error, please try again later.');
    }
  };

  // Google Maps settings
  const mannarPosition = { lat: 8.9806, lng: 79.9042 };
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.10)',
    margin: '0 auto',
    marginTop: '2rem',
    cursor: 'pointer',
  };
  // TODO: Insert your Google Maps API key below
  const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY_HERE';
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const handleMapClick = () => {
    window.open('https://www.google.com/maps?q=Mannar', '_blank');
  };

  return (
    <>
      <div className="contactus-split-container">
        <div className="contactus-left">
          <h1 className="contactus-header">Contact Us</h1>
          <form className="contactus-form" onSubmit={handleSubmit} noValidate>
            <div className="contactus-form-group">
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="contactus-form-group">
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
            </div>
            <div className="contactus-form-group">
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="contactus-form-group">
              <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
            </div>
            <div className="contactus-form-group">
              <textarea name="message" placeholder="Enter your message..." value={formData.message} onChange={handleChange} rows={3} />
            </div>
            <button type="submit" className="contactus-send-btn">Send Message</button>
          </form>
        </div>
        <div className="contactus-right">
          <div className="contactus-right-content">
            <span className="contactus-contactus">contact us</span>
            <h2 className="contactus-title">PLEASE GET IN TOUCH</h2>
            <div className="contactus-info-list">
              <div className="contactus-info-item">
                <FaMapMarkerAlt className="contactus-info-icon" />
                <span className="contactus-info-label">Address:</span>
                <span className="contactus-info-value">07,Main Street Road,Jaffna</span>
              </div>
              <div className="contactus-info-item">
                <FaPhone className="contactus-info-icon" />
                <span className="contactus-info-label">Phone :</span>
                <span className="contactus-info-value">+94 778 200 752</span>
              </div>
              <div className="contactus-info-item">
                <FaEnvelope className="contactus-info-icon" />
                <span className="contactus-info-label">Email :</span>
                <span className="contactus-info-value">ServiceHub@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Removed Google Map location section */}
    </>
  );
};

export default ProviderContact; 