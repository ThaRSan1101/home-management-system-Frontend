import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLock, FaUser, FaKey } from 'react-icons/fa';
import Logo from '../components/Logo';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: email, 2: otp, 3: reset
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({ email: '', password: '' });
  }, []); // Clear fields on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
    setLoginError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await axios.post(
        'http://localhost/project-root/backend/home-management-system-Backend/api/login.php',
        {
          email: formData.email,
          password: formData.password
        },
        { withCredentials: true }
      );
      const result = response.data;
      if (result.status === 'success') {

        // Store customer details in localStorage for dashboard/profile use
        if (result.user_type === 'customer' && result.user_details) {
          localStorage.setItem('customer_fullName', result.user_details.fullName || '');
          localStorage.setItem('customer_address', result.user_details.address || '');
          localStorage.setItem('customer_phone', result.user_details.phone || '');
          localStorage.setItem('customer_email', result.user_details.email || '');
          localStorage.setItem('customer_joined', result.user_details.joined || '');
        }
        // Store provider details in localStorage for dashboard/profile use
        if (result.user_type === 'provider' && result.user_details) {
          localStorage.setItem('provider_fullName', result.user_details.fullName || '');
          localStorage.setItem('provider_address', result.user_details.address || '');
          localStorage.setItem('provider_phone', result.user_details.phone || '');
          localStorage.setItem('provider_email', result.user_details.email || '');
          localStorage.setItem('provider_joined', result.user_details.joined || '');
        }
        // Store admin details in localStorage for dashboard/profile use
        if (result.user_type === 'admin' && result.user_details) {
          localStorage.setItem('admin_fullName', result.user_details.fullName || '');
          localStorage.setItem('admin_email', result.user_details.email || '');
        }

        // Redirect based on user type and user id
        if (result.user_type === 'admin') {
          navigate(`/admin/dashboard/${result.user_id}`);
        } else if (result.user_type === 'provider') {
          navigate(`/provider/dashboard/${result.user_id}`);
        } else {
          navigate(`/customer/dashboard/${result.user_id}`);
        }
      } else {
        setLoginError(result.message || 'Invalid email or password.');
      }
    } catch (err) {
      setLoginError('Server error. Please try again later.');
    }
  };

  // Forgot Password Handlers
  const handleForgotEmail = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    if (!forgotEmail) {
      setForgotError('Please enter your email.');
      return;
    }
    setForgotLoading(true);
    try {
      const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/forgot_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim().toLowerCase() })
      });
      const result = await res.json();
      if (result.status === 'success') {
        setForgotStep(2);
        setForgotSuccess('OTP sent to your email.');
      } else {
        setForgotError(result.message);
      }
    } catch (err) {
      setForgotError('Server error.');
    }
    setForgotLoading(false);
  };

  const handleForgotOtp = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    if (!forgotOtp || forgotOtp.length !== 6) {
      setForgotError('Please enter the 6-digit OTP.');
      return;
    }
    setForgotLoading(true);
    try {
      const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/verify_reset_otp.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim().toLowerCase(), code: forgotOtp.trim() })
      });
      
      const result = await res.json();
      console.log(result.status);
      if (result.status === 'success') {
        setForgotStep(3);
        setForgotSuccess('OTP verified. Please enter your new password.');
      } else {
        setForgotError(result.message);
      }
    } catch (err) {
      setForgotError('Server error.');
    }
    setForgotLoading(false);
  };

  const handleForgotReset = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    if (!forgotNewPassword || !forgotConfirmPassword) {
      setForgotError('Please enter and confirm your new password.');
      return;
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      setForgotError('Passwords do not match.');
      return;
    }
    if (forgotNewPassword.length < 8) {
      setForgotError('Password must be at least 8 characters.');
      return;
    }
    setForgotLoading(true);
    try {
      const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/reset_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim().toLowerCase(), otp: forgotOtp.trim(), newPassword: forgotNewPassword })
      });
      const result = await res.json();
      if (result.status === 'success') {
        setForgotSuccess('Password changed successfully! You can now log in.');
        setForgotStep(1);
        setForgotEmail('');
        setForgotOtp('');
        setForgotNewPassword('');
        setForgotConfirmPassword('');
        setShowForgot(false);
      } else {
        setForgotError(result.message);
      }
    } catch (err) {
      setForgotError('Server error.');
    }
    setForgotLoading(false);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-left">
          <div className="auth-logo"><Logo size="medium" variant="auth" /></div>
          <h2>Welcome Back!</h2>
          <p>To keep connected with us please login with your personal info</p>
          <Link to="/register" className="auth-alt-btn">Register Now</Link>
        </div>
        <div className="auth-right">
          <h2>Sign In</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <FaUser className="auth-input-icon" />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                autoComplete="username"
              />
            </div>
            {errors.email && <span className="auth-error">{errors.email}</span>}
            <div className="auth-input-group">
              <FaLock className="auth-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                autoComplete="current-password"
              />
              <button type="button" className="auth-eye" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
            </div>
            {errors.password && <span className="auth-error">{errors.password}</span>}
            {loginError && <span className="auth-error">{loginError}</span>}
            <button type="submit" className="auth-submit-btn">Sign In</button>
          </form>
          <button className="forgot-password-link" onClick={() => { setShowForgot(true); setForgotStep(1); setForgotError(''); setForgotSuccess(''); }}>
            <FaKey style={{ marginRight: '0.4rem', fontSize: '1.1em' }} />
            Forgot Password?
          </button>
          {showForgot && (
            <div className="forgot-modal">
              <div className="forgot-modal-content">
                <button className="forgot-close" onClick={() => setShowForgot(false)}>&times;</button>
                {forgotStep === 1 && (
                  <form onSubmit={handleForgotEmail} className="forgot-form">
                    <h3>Forgot Password</h3>
                    <input type="email" placeholder="Enter your email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required />
                    <button type="submit" disabled={forgotLoading}>{forgotLoading ? 'Sending...' : 'Send OTP'}</button>
                    {forgotError && <span className="auth-error">{forgotError}</span>}
                    {forgotSuccess && <span className="auth-success">{forgotSuccess}</span>}
                  </form>
                )}
                {forgotStep === 2 && (
                  <form onSubmit={handleForgotOtp} className="forgot-form">
                    <h3>Enter OTP</h3>
                    <input type="text" placeholder="Enter 6-digit OTP" value={forgotOtp} onChange={e => setForgotOtp(e.target.value)} maxLength={6} required />
                    <button type="submit" disabled={forgotLoading}>{forgotLoading ? 'Verifying...' : 'Verify OTP'}</button>
                    {forgotError && <span className="auth-error">{forgotError}</span>}
                    {forgotSuccess && <span className="auth-success">{forgotSuccess}</span>}
                  </form>
                )}
                {forgotStep === 3 && (
                  <form onSubmit={handleForgotReset} className="forgot-form">
                    <h3>Reset Password</h3>
                    <input type="password" placeholder="New Password" value={forgotNewPassword} onChange={e => setForgotNewPassword(e.target.value)} required />
                    <input type="password" placeholder="Confirm Password" value={forgotConfirmPassword} onChange={e => setForgotConfirmPassword(e.target.value)} required />
                    <button type="submit" disabled={forgotLoading}>{forgotLoading ? 'Changing...' : 'Change Password'}</button>
                    {forgotError && <span className="auth-error">{forgotError}</span>}
                    {forgotSuccess && <span className="auth-success">{forgotSuccess}</span>}
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;