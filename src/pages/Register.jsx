import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope, FaPhone, FaIdCard } from 'react-icons/fa';
import Logo from '../components/Logo';
import './Register.css';
import Modal from '../components/Modal';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    nic: '',
    userType: 'customer',
    showPassword: false
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors({ ...errors, [name]: 'Enter a valid email' });
      }
    }

    if (name === 'phone') {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value)) {
        setErrors({ ...errors, [name]: 'Phone must be 10 digits' });
      }
    }

    if (name === 'nic') {
      // NIC must be 12 digits or 9 digits followed by V or v
      const nicRegex = /^(\d{12}|\d{9}[Vv])$/;
      if (value && !nicRegex.test(value)) {
        setErrors({ ...errors, [name]: 'NIC must be 12 digits or 9 digits followed by V.' });
      }
    }

    if (name === 'password') {
      const pwdErrors = validatePassword(value);
      if (pwdErrors.length > 0) {
        setErrors({ ...errors, [name]: pwdErrors });
      }
    }

    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors({ ...errors, [name]: 'Passwords do not match' });
      }
    }
  };

  // Password validation rules
  const validatePassword = (password) => {
    const err = [];
    if (password.length < 8) err.push('Min 8 characters');
    if (!/[A-Z]/.test(password)) err.push('At least one uppercase');
    if (!/[a-z]/.test(password)) err.push('At least one lowercase');
    if (!/\d/.test(password)) err.push('At least one number');
    if (!/[!@#$%^&*]/.test(password)) err.push('At least one special char');
    return err;
  };

  // Final form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email required';
    if (!formData.phone) newErrors.phone = 'Phone required';
    if (!formData.address) newErrors.address = 'Address required';
    if (!formData.password) newErrors.password = 'Password required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    const pwdErr = validatePassword(formData.password);
    if (pwdErr.length > 0) newErrors.password = pwdErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔗 Step 1: Send Data to Backend (register.php)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.status === 'success') {
        setOtpSent(true);
        setModalMessage('OTP has been sent to your email');
        setModalOpen(true);
      } else {
        setModalMessage(result.message || 'Failed to send OTP');
        setModalOpen(true);
      }
    } catch (err) {
      setModalMessage('Error sending request to server');
      setModalOpen(true);
      console.error(err);
    }
  };

  // 🔗 Step 2: Verify OTP with Backend (verify_otp.php)
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otpInput.trim().length !== 6) {
      setOtpError('Enter the 6-digit OTP');
      return;
    }

    const payload = { ...formData, otp: otpInput };

    try {
      const response = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/verify_otp.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.status === 'success') {
        setRegistrationSuccess(true);
        setOtpError('');
      } else {
        setOtpError(result.message || 'Invalid OTP');
      }
    } catch (err) {
      setOtpError('Server error');
      console.error(err);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card register-card">
        <div className="auth-left">
          <div className="auth-logo"><Logo size="medium" variant="auth" /></div>
          <h2>Create Customer Account</h2>
          <p>Join ServiceHub as a customer to book services and manage your home maintenance needs</p>
          <Link to="/login" className="auth-alt-btn">Log In</Link>
        </div>

        <div className="auth-right">
          <h2>Create Customer Account</h2>

          {!otpSent && !registrationSuccess && (
            <form className="auth-form register-form" onSubmit={handleSubmit}>
              <InputField icon={<FaUser />} type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} error={errors.fullName} />
              <InputField icon={<FaEnvelope />} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} error={errors.email} />
              <InputField icon={<FaPhone />} type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} error={errors.phone} />
              <InputField icon={<FaUser />} type="text" name="address" placeholder="City & District" value={formData.address} onChange={handleChange} error={errors.address} />
              <InputField icon={<FaIdCard />} type="text" name="nic" placeholder="NIC (Optional)" value={formData.nic} onChange={handleChange} error={errors.nic} />

              {/* Password Field */}
              <div className="auth-field-container">
                <div className="auth-input-group">
                  <FaLock className="auth-input-icon" />
                  <input type={formData.showPassword ? 'text' : 'password'} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={errors.password ? 'error' : ''} />
                  <button type="button" className="auth-eye" onClick={() => setFormData(f => ({ ...f, showPassword: !f.showPassword }))}>{formData.showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                </div>
                {errors.password && (
                  <div className="auth-error-list">
                    {Array.isArray(errors.password) ? errors.password.map((e, i) => <span key={i} className="auth-error-item">{e}</span>) : <span className="auth-error">{errors.password}</span>}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="auth-field-container">
                <div className="auth-input-group">
                  <FaLock className="auth-input-icon" />
                  <input type={formData.showPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className={errors.confirmPassword ? 'error' : ''} />
                  <button type="button" className="auth-eye" onClick={() => setFormData(f => ({ ...f, showPassword: !f.showPassword }))}>{formData.showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                </div>
                {errors.confirmPassword && <span className="auth-error">{errors.confirmPassword}</span>}
              </div>

              <button type="submit" className="auth-submit-btn">Register as Customer</button>
            </form>
          )}

          {/* OTP Form */}
          {otpSent && !registrationSuccess && (
            <form className="otp-form" onSubmit={handleOtpSubmit}>
              <div className="auth-field-container">
                <label htmlFor="otp">Enter OTP sent to email</label>
                <input type="text" name="otp" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} maxLength={6} className={otpError ? 'error' : ''} />
                {otpError && <span className="auth-error">{otpError}</span>}
              </div>
              <button type="submit" className="auth-submit-btn">Verify OTP</button>
            </form>
          )}

          {/* Success Message */}
          {registrationSuccess && (
            <div className="auth-success register-success">
              <div className="register-success-icon">🎉</div>
              <h3>Registration Successful!</h3>
              <p>Your customer account has been created successfully.</p>
              <div className="register-success-btn-container">
                <Link to="/login" className="auth-submit-btn">Go to Login</Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div style={{textAlign: 'center'}}>
          <p>{modalMessage}</p>
          <button onClick={() => setModalOpen(false)} style={{marginTop: '1rem'}}>OK</button>
        </div>
      </Modal>
    </div>
  );
};

// 🔄 Reusable input field component
const InputField = ({ icon, ...props }) => {
  return (
    <div className="auth-field-container">
      <div className="auth-input-group">
        {icon}
        <input {...props} />
      </div>
      {props.error && <span className="auth-error">{props.error}</span>}
    </div>
  );
};

export default Register;
