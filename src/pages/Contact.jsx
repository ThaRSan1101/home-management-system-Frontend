import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Add missing error state for form validation
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [messageError, setMessageError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    let valid = true;
    setNameError(''); setEmailError(''); setPhoneError(''); setSubjectError(''); setMessageError('');
    if (!formData.name.trim()) { setNameError('Name is required'); valid = false; }
    if (!formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) { setEmailError('Valid email is required'); valid = false; }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) { setPhoneError('10-digit phone required'); valid = false; }
    if (!formData.subject.trim()) { setSubjectError('Subject is required'); valid = false; }
    if (!formData.message.trim()) { setMessageError('Message is required'); valid = false; }
    if (!valid) {
      toast.error('Please fill in all required fields.');
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
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: '',
  });

  const handleMapClick = () => {
    window.open('https://www.google.com/maps?q=Mannar', '_blank');
  };

  return (
    <>
      <div className="contactus-split-container">
        <div className="contactus-left">
          <h1 className="contactus-header">Contact Us</h1>
          <form className="contactus-form" onSubmit={handleSubmit}>
            <div className="contactus-form-group">
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
              {nameError && (
                <div style={{ color: '#d32f2f', fontSize: '0.98rem', marginTop: '0.3rem', fontWeight: 500 }}>
                  {nameError}
                </div>
              )}
            </div>
            <div className="contactus-form-group">
              <input type="text" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
              {emailError && (
                <div style={{ color: '#d32f2f', fontSize: '0.98rem', marginTop: '0.3rem', fontWeight: 500 }}>
                  {emailError}
                </div>
              )}
            </div>
            <div className="contactus-form-group">
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
              {phoneError && (
                <div style={{ color: '#d32f2f', fontSize: '0.98rem', marginTop: '0.3rem', fontWeight: 500 }}>
                  {phoneError}
                </div>
              )}
            </div>
            <div className="contactus-form-group">
              <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
              {subjectError && (
                <div style={{ color: '#d32f2f', fontSize: '0.98rem', marginTop: '0.3rem', fontWeight: 500 }}>
                  {subjectError}
                </div>
              )}
            </div>
            <div className="contactus-form-group">
              <textarea name="message" placeholder="Enter your message..." value={formData.message} onChange={handleChange} rows={3} />
              {messageError && (
                <div style={{ color: '#d32f2f', fontSize: '0.98rem', marginTop: '0.3rem', fontWeight: 500 }}>
                  {messageError}
                </div>
              )}
            </div>
            <button type="submit" className="contactus-send-btn">Send Message</button>
            {isSubmitted && (
              <div className="contactus-success" style={{marginTop:'1.2rem', color:'#fff', background:'#1a3665', borderRadius:'10px', fontWeight:600, fontSize:'1.08rem', textAlign:'center', padding:'0.8rem 1.2rem'}}>
                Thank you! Your message has been sent.
              </div>
            )}
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
        <div className="map-card" onClick={handleMapClick} title="Open in Google Maps">
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
          <div className="map-overlay">Click to open Our Location</div>
        </div>
      </section>
    </>
  );
};

export default Contact; 