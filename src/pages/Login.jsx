import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'customer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the form data to your backend
      console.log('Login submitted:', formData);
      setIsSubmitted(true);
      setFormData({
        email: '',
        password: '',
        userType: 'customer'
      });
      // Reset submission status after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const userTypes = [
    {
      value: 'customer',
      label: 'Customer',
      description: 'I need home services',
      icon: '🏠'
    },
    {
      value: 'provider',
      label: 'Service Provider',
      description: 'I provide home services',
      icon: '🔧'
    },
    {
      value: 'admin',
      label: 'Administrator',
      description: 'I manage the platform',
      icon: '⚙️'
    }
  ];

  const features = [
    {
      icon: '🔒',
      title: 'Secure Login',
      description: 'Your data is protected with industry-standard security'
    },
    {
      icon: '⚡',
      title: 'Quick Access',
      description: 'Get instant access to your dashboard and services'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Access your account from any device, anywhere'
    }
  ];

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          {isSubmitted && (
            <div className="success-message">
              <FaCheckCircle />
              <p>Login successful! Redirecting to dashboard...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {/* User Type Selection */}
            <div className="user-type-section">
              <label className="form-label">I am a:</label>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Field */}
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

            {/* Password Field */}
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
                  placeholder="Enter your password"
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

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button type="submit" className="page-login-btn">
              <FaUser />
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>or</span>
          </div>

          {/* Social Login */}
          <div className="social-login">
            <button className="social-btn google">
              <span>🔍</span>
              Continue with Google
            </button>
            <button className="social-btn facebook">
              <span>📘</span>
              Continue with Facebook
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="signup-link">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="link">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <div className="features-content">
            <h2>Why Choose HomeService?</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="features-cta">
              <p>Join thousands of satisfied customers</p>
              <Link to="/register" className="btn btn-primary">
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 