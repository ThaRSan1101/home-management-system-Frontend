import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const DashboardContact = () => {
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
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="customer-dashboard-contactus-form-group">
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="customer-dashboard-contactus-form-group">
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="customer-dashboard-contactus-form-group">
              <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
            </div>
            <div className="customer-dashboard-contactus-form-group">
              <textarea name="message" placeholder="Enter your message..." value={formData.message} onChange={handleChange} rows={3} required />
            </div>
            <button type="submit" className="customer-dashboard-contactus-send-btn">Send Message</button>
            {isSubmitted && <div className="customer-dashboard-contactus-success">Thank you! Your message has been sent.</div>}
          </form>
        </div>
        <div className="customer-dashboard-contactus-right">
          <div className="customer-dashboard-contactus-right-content">
            <span className="customer-dashboard-contactus-contactus">Contact Info</span>
            <h2 className="customer-dashboard-contactus-title">Get in Touch</h2>
            <div className="customer-dashboard-contactus-info-list">
              <div className="customer-dashboard-contactus-info-item">
                <FaMapMarkerAlt className="customer-dashboard-contactus-info-icon" />
                <span className="customer-dashboard-contactus-info-label">Address:</span>
                <span className="customer-dashboard-contactus-info-value">25, Kensington Garden, Colombo 00400</span>
              </div>
              <div className="customer-dashboard-contactus-info-item">
                <FaPhone className="customer-dashboard-contactus-info-icon" />
                <span className="customer-dashboard-contactus-info-label">Phone :</span>
                <span className="customer-dashboard-contactus-info-value">(+94) 77 442 2448</span>
              </div>
              <div className="customer-dashboard-contactus-info-item">
                <FaEnvelope className="customer-dashboard-contactus-info-icon" />
                <span className="customer-dashboard-contactus-info-label">Email :</span>
                <span className="customer-dashboard-contactus-info-value">info@homeservice.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="customer-dashboard-map-section">
        <div className="customer-dashboard-map-card" onClick={handleMapClick} title="Open in Google Maps">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mannarPosition}
              zoom={13}
              options={{
                disableDefaultUI: true,
                clickableIcons: false,
                gestureHandling: 'none',
                styles: [
                  { elementType: 'geometry', stylers: [{ color: '#e6faf5' }] },
                  { elementType: 'labels.text.fill', stylers: [{ color: '#222b3a' }] },
                  { elementType: 'labels.text.stroke', stylers: [{ color: '#fff' }] },
                  { featureType: 'water', stylers: [{ color: '#b2f7ef' }] },
                  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
                ],
              }}
              onClick={handleMapClick}
            >
              <Marker
                position={mannarPosition}
                onClick={handleMapClick}
                icon={{
                  url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                  scaledSize: { width: 40, height: 40 },
                }}
              />
            </GoogleMap>
          )}
          <div className="dashboard-map-overlay">Click to open Our Location</div>
        </div>
      </section>
    </div>
  );
};

export default DashboardContact; 