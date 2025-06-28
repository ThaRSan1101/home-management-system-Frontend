import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';
import Logo from '../components/Logo';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    showPassword: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    // Real-time validation for specific fields
    if (name === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors({ ...errors, [name]: 'Please enter a valid email address (e.g., user@gmail.com)' });
      }
    }
    
    if (name === 'phone' && value) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value)) {
        setErrors({ ...errors, [name]: 'Phone number must be exactly 10 digits' });
      }
    }
    
    if (name === 'password' && value) {
      const passwordErrors = validatePassword(value);
      if (passwordErrors.length > 0) {
        setErrors({ ...errors, [name]: passwordErrors });
      }
    }
    
    if (name === 'confirmPassword' && value && formData.password) {
      if (value !== formData.password) {
        setErrors({ ...errors, [name]: 'Passwords do not match' });
      }
    }
  };

  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('At least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('At least one uppercase letter (A-Z)');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('At least one lowercase letter (a-z)');
    }
    
    if (!/\d/.test(password)) {
      errors.push('At least one number (0-9)');
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('At least one special character (!@#$%^&*...)');
    }
    
    return errors;
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Full Name validation
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address (e.g., user@gmail.com)';
      }
    }
    
    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone Number is required';
    } else {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Phone number must be exactly 10 digits';
      }
    }
    
    // Address validation
    if (!formData.address) newErrors.address = 'Address is required';
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        newErrors.password = passwordErrors;
      }
    }
    
    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // handle register
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card register-card">
        <div className="auth-left">
          <div className="auth-logo"><Logo size="medium" /></div>
          <h2>Create Account</h2>
          <p>To keep connected with us please login with your personal info</p>
          <Link to="/login" className="auth-alt-btn">Log In</Link>
        </div>
        <div className="auth-right">
          <h2>Create Account</h2>
          <form className="auth-form register-form" onSubmit={handleSubmit}>
            <div className="auth-field-container">
              <div className="auth-input-group">
                <FaUser className="auth-input-icon" />
                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className={errors.fullName ? 'error' : ''} />
              </div>
              {errors.fullName && <span className="auth-error">{errors.fullName}</span>}
            </div>
            <div className="auth-field-container">
              <div className="auth-input-group">
                <FaEnvelope className="auth-input-icon" />
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
              </div>
              {errors.email && <span className="auth-error">{errors.email}</span>}
            </div>
            <div className="auth-field-container">
              <div className="auth-input-group">
                <FaPhone className="auth-input-icon" />
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className={errors.phone ? 'error' : ''} />
              </div>
              {errors.phone && <span className="auth-error">{errors.phone}</span>}
            </div>
            <div className="auth-field-container">
              <div className="auth-input-group">
                <FaUser className="auth-input-icon" />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className={errors.address ? 'error' : ''} />
              </div>
              {errors.address && <span className="auth-error">{errors.address}</span>}
            </div>
            <div className="auth-field-container">
              <div className="auth-input-group">
                <FaLock className="auth-input-icon" />
                <input type={formData.showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={errors.password ? 'error' : ''} />
                <button type="button" className="auth-eye" onClick={() => setFormData(f => ({ ...f, showPassword: !f.showPassword }))}>{formData.showPassword ? <FaEyeSlash /> : <FaEye />}</button>
              </div>
              {errors.password && (
                <div className="auth-error-list">
                  {Array.isArray(errors.password) ? (
                    errors.password.map((error, index) => (
                      <span key={index} className="auth-error-item">{error}</span>
                    ))
                  ) : (
                    <span className="auth-error">{errors.password}</span>
                  )}
                </div>
              )}
            </div>
            <div className="auth-field-container">
              <div className="auth-input-group">
                <FaLock className="auth-input-icon" />
                <input type={formData.showPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className={errors.confirmPassword ? 'error' : ''} />
                <button type="button" className="auth-eye" onClick={() => setFormData(f => ({ ...f, showPassword: !f.showPassword }))}>{formData.showPassword ? <FaEyeSlash /> : <FaEye />}</button>
              </div>
              {errors.confirmPassword && <span className="auth-error">{errors.confirmPassword}</span>}
            </div>
            <button type="submit" className="auth-submit-btn">Register Now</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register; 