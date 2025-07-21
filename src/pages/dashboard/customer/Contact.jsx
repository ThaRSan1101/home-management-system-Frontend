import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { toast } from 'sonner';

const DashboardContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let firstError = '';
    // Name validation
    if (!formData.name.trim()) {
      setNameError("Please enter your name.");
      if (!firstError) firstError = "Please enter your name.";
      valid = false;
    } else {
      setNameError("");
    }
    // Email validation
    if (!formData.email.trim()) {
      setEmailError("Please enter your email address.");
      if (!firstError) firstError = "Please enter your email address.";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setEmailError("Please enter a valid email address.");
      if (!firstError) firstError = "Please enter a valid email address.";
      valid = false;
    } else {
      setEmailError("");
    }
    // Subject validation
    if (!formData.subject.trim()) {
      setSubjectError("Please enter the subject.");
      if (!firstError) firstError = "Please enter the subject.";
      valid = false;
    } else {
      setSubjectError("");
    }
    // Message validation
    if (!formData.message.trim()) {
      setMessageError("Please enter your message.");
      if (!firstError) firstError = "Please enter your message.";
      valid = false;
    } else {
      setMessageError("");
    }
    // Phone validation (allow empty or exactly 10 digits)
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      setPhoneError("Phone number must be exactly 10 digits.");
      if (!firstError) firstError = "Phone number must be exactly 10 digits.";
      valid = false;
    } else {
      setPhoneError("");
    }
    if (!valid) {
      setIsSubmitted(false);
      if (firstError) toast.error(firstError);
      return;
    }
    setIsSubmitted(true);
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  // Google Maps settings
  const mannarPosition = { lat: 8.9806, lng: 79.9042 };
  const mapContainerStyle = {
    width: '100%',
    height: '320px',
    borderRadius: '18px',
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
    margin: '0 auto',
    marginTop: '1.5rem',
    cursor: 'pointer',
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: '',
  });

  const handleMapClick = () => {
    window.open('https://www.google.com/maps?q=Mannar', '_blank');
  };

  return (
    <div className="customer-dashboard-contact-super">
      <div className="customer-dashboard-contactus-split-container">
        <div className="customer-dashboard-contactus-left">
          <h1 className="customer-dashboard-contactus-header">Contact Us</h1>
          <form className="customer-dashboard-contactus-form" onSubmit={handleSubmit}>
            <div className="customer-dashboard-contactus-form-group">
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="customer-dashboard-contactus-form-group">
              <input type="text" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
            </div>
            <div className="customer-dashboard-contactus-form-group">
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="customer-dashboard-contactus-form-group">
              <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
            </div>
            <div className="customer-dashboard-contactus-form-group">
              <textarea name="message" placeholder="Enter your message..." value={formData.message} onChange={handleChange} rows={3} />
            </div>
            <button type="submit" className="customer-dashboard-contactus-send-btn">Send Message</button>
          </form>
        </div>
        <div className="customer-dashboard-contactus-right">
          <div className="customer-dashboard-contactus-right-content">
            <span className="customer-dashboard-contactus-contactus">Contact Info</span>
            <h2 className="customer-dashboard-contactus-title">please Get in Touch</h2>
            <div className="customer-dashboard-contactus-info-list">
              <div className="customer-dashboard-contactus-info-item">
                <FaMapMarkerAlt className="customer-dashboard-contactus-info-icon" />
                <span className="customer-dashboard-contactus-info-label">Address:</span>
                <span className="customer-dashboard-contactus-info-value">25, Kensington Garden, Colombo 00400</span>
              </div>
              <div className="customer-dashboard-contactus-info-item">
                <FaPhone className="customer-dashboard-contactus-info-icon" />
                <span className="customer-dashboard-contactus-info-label">Phone:</span>
                <span className="customer-dashboard-contactus-info-value">(+94) 77 442 2448</span>
              </div>
              <div className="customer-dashboard-contactus-info-item">
                <FaEnvelope className="customer-dashboard-contactus-info-icon" />
                <span className="customer-dashboard-contactus-info-label">Email:</span>
                <span className="customer-dashboard-contactus-info-value">info@homeservice.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Removed customer-dashboard-map-section and customer-dashboard-map-card (map) section as requested */}
    </div>
  );
};

export default DashboardContact; 