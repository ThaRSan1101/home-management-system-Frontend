import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa';
import Logo from '../components/Logo';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
    setLoginError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username or Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const { username, password } = formData;
    if (username === 'arul' && password === 'arul123') {
      navigate('/customer/dashboard');
    } else if (username === 'tharsan' && password === 'tharsan123') {
      navigate('/provider/dashboard');
    } else if (username === 'admin' && password === 'admin') {
      navigate('/admin/dashboard');
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-left">
          <div className="auth-logo"><Logo size="medium" /></div>
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
                name="username"
                placeholder="Username or Email"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? 'error' : ''}
                autoComplete="username"
              />
            </div>
            {errors.username && <span className="auth-error">{errors.username}</span>}
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
        </div>
      </div>
    </div>
  );
};

export default Login; 