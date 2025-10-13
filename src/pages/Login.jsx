import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLock, FaUser, FaKey } from 'react-icons/fa';
import Logo from '../components/Logo';
import './Login.css';
import axios from 'axios';
import { toast } from 'sonner';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const navigate = useNavigate();

  // On mount, check if user is already authenticated and redirect away from login
  useEffect(() => {
    setFormData({ email: '', password: '' });
    axios.get('http://localhost/project-root/backend/home-management-system-Backend/api/me.php', { withCredentials: true })
      .then(res => {
        if (res.data && res.data.status === 'success') {
          // Redirect based on user type
          if (res.data.user_type === 'admin') navigate('/admin/dashboard', { replace: true });
          else if (res.data.user_type === 'customer') navigate('/customer/dashboard', { replace: true });
          else if (res.data.user_type === 'provider') navigate('/provider/dashboard', { replace: true });
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          // Not authenticated, expected after logout. Do not log error.
          // Return a resolved promise to suppress 'Uncaught (in promise)'
          return Promise.resolve();
        } else if (err) {
          // Only log unexpected errors
          console.error('Session check error:', err.response || err.message || err);
        }
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    setLoginError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Frontend-only shortcut for hosted-frontend scenario
      const email = formData.email.trim().toLowerCase();
      const password = formData.password;
      if (email === 'adminservicehub@gmail.com' && password === 'Admin@01') {
        toast.success('Welcome, Admin');
        navigate('/admin/dashboard', { replace: true });
        return;
      }
      if (email === 'servicehub@gmail.com' && password === 'Customer@01') {
        toast.success('Welcome, Customer');
        navigate('/customer/dashboard/home', { replace: true });
        return;
      }
      if (email === 'providerservice@gmail.com' && password === 'Provider@01') {
        toast.success('Welcome, Provider');
        navigate('/provider/dashboard', { replace: true });
        return;
      }

      const response = await axios.post(
        'http://localhost/project-root/backend/home-management-system-Backend/api/login.php',
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const result = response.data;

      if (result.status === 'success') {
        // Clear all user data
        
        const { user_type, user_id, user_details } = result;
        // No longer store user_id in localStorage for auth
        

        // Navigate accordingly
        if (user_type === 'admin') navigate(`/admin/dashboard`, { replace: true });
        else if (user_type === 'provider') navigate(`/provider/dashboard`, { replace: true });
        else navigate(`/customer/dashboard/home`, { replace: true });
      } else {
        toast.error(result.message || 'Invalid email or password.');
      }
    } catch (err) {
      console.error('Login error:', err.response || err.message || err);
      toast.error('Server error. Please try again later.');
    }
  };

  // Forgot Password Handlers
  const handleForgotEmail = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    if (!forgotEmail) {
      toast.warning('Please enter your email.');
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
        toast.success('OTP sent to your email.');
      } else {
        toast.error(result.message || 'Failed to send OTP.');
      }
    } catch (err) {
      toast.error('Server error.');
    }
    setForgotLoading(false);
  };

  const handleForgotOtp = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    if (!forgotOtp || forgotOtp.length !== 6) {
      toast.warning('Please enter the 6-digit OTP.');
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
      if (result.status === 'success') {
        setForgotStep(3);
        toast.success('OTP verified. Please enter your new password.');
      } else {
        toast.error(result.message || 'OTP verification failed.');
      }
    } catch (err) {
      toast.error('Server error.');
    }
    setForgotLoading(false);
  };

  const handleForgotReset = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    if (!forgotNewPassword || !forgotConfirmPassword) {
      toast.warning('Please enter and confirm your new password.');
      return;
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      toast.warning('Passwords do not match.');
      return;
    }
    if (forgotNewPassword.length < 8) {
      toast.warning('Password must be at least 8 characters.');
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
        toast.success('Password changed successfully! You can now log in.');
        setForgotStep(1);
        setForgotEmail('');
        setForgotOtp('');
        setForgotNewPassword('');
        setForgotConfirmPassword('');
        setShowForgot(false);
      } else {
        toast.error(result.message || 'Failed to reset password.');
      }
    } catch (err) {
      toast.error('Server error.');
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
              <button type="button" className="auth-eye" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
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
 
