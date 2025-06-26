import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaPhone, FaCheckCircle } from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'customer',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Registration submitted:', formData);
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        userType: 'customer',
        agreeToTerms: false
      });
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const userTypes = [
    {
      value: 'customer',
      label: 'Customer',
      description: 'I need home services',
      icon: '🏠',
      benefits: ['Book services easily', 'Track appointments', 'Rate providers']
    },
    {
      value: 'provider',
      label: 'Service Provider',
      description: 'I provide home services',
      icon: '🔧',
      benefits: ['Manage bookings', 'Set your rates', 'Grow your business']
    }
  ];

  const benefits = [
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is protected with bank-level security'
    },
    {
      icon: '⚡',
      title: 'Quick Setup',
      description: 'Get started in minutes with our simple registration'
    },
    {
      icon: '📱',
      title: 'Mobile Ready',
      description: 'Access your account from any device, anywhere'
    },
    {
      icon: '🎯',
      title: 'Personalized',
      description: 'Get recommendations tailored to your needs'
    }
  ];

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-content">
          <div className="register-header">
            <h1>Create Your Account</h1>
            <p>Join thousands of users who trust HomeService for their home maintenance needs</p>
          </div>

          {isSubmitted && (
            <div className="success-message">
              <FaCheckCircle />
              <p>Account created successfully! Welcome to HomeService.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="user-type-section">
              <label className="form-label">I want to register as:</label>
              <div className="user-type-grid">
                {userTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`user-type-option ${formData.userType === type.value ? 'active' : ''}`}
                    onClick={() => handleChange({ target: { name: 'userType', value: type.value } })}
                  >
                    <div className="type-icon">{type.icon}</div>
                    <div className="type-info">
                      <h3>{type.label}</h3>
                      <p>{type.description}</p>
                      <ul className="type-benefits">
                        {type.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  <FaUser />
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`form-input ${errors.firstName ? 'error' : ''}`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  <FaUser />
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`form-input ${errors.lastName ? 'error' : ''}`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <FaEnvelope />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                <FaPhone />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="Enter your phone number"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <FaLock />
                  Password
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  <FaLock />
                  Confirm Password
                </label>
                <div className="password-input-container">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                I agree to the{' '}
                <Link to="/terms" className="link">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="link">
                  Privacy Policy
                </Link>
              </label>
              {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
            </div>

            <button type="submit" className="page-register-btn">
              <FaUser />
              Create Account
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="social-register">
            <button className="social-btn google">
              <span>🔍</span>
              Continue with Google
            </button>
            <button className="social-btn facebook">
              <span>📘</span>
              Continue with Facebook
            </button>
          </div>

          <div className="signin-link">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="benefits-section">
          <div className="benefits-content">
            <h2>Why Join HomeService?</h2>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <div className="benefit-icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
            <div className="benefits-cta">
              <p>Join our community today</p>
              <div className="stats">
                <div className="stat">
                  <h3>500+</h3>
                  <p>Happy Users</p>
                </div>
                <div className="stat">
                  <h3>50+</h3>
                  <p>Service Providers</p>
                </div>
                <div className="stat">
                  <h3>1000+</h3>
                  <p>Services Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 