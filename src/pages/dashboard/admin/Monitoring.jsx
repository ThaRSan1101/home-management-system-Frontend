import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Monitoring.css';

const DEMO_ACCOUNTS = {
  customer: {
    email: 'customer@gmail.com',
    password: 'customer', // <-- Replace with real password
  },
  provider: {
    email: 'provider@gmail.com',
    password: 'provider', // <-- Replace with real password
  },
};

const Monitoring = () => {
  const navigate = useNavigate();

  const handleQuickLogin = async (type) => {
    const creds = DEMO_ACCOUNTS[type];
    if (!creds) return;
    try {
      const response = await axios.post(
        'http://localhost/project-root/backend/home-management-system-Backend/api/login.php',
        {
          email: creds.email,
          password: creds.password,
        },
        { withCredentials: true }
      );
      const result = response.data;
      if (result.status === 'success') {
        // Store user details in localStorage (same as Login.jsx)
        if (result.user_type === 'customer' && result.user_details) {
          localStorage.setItem('customer_fullName', result.user_details.fullName || '');
          localStorage.setItem('customer_address', result.user_details.address || '');
          localStorage.setItem('customer_phone', result.user_details.phone || '');
          localStorage.setItem('customer_email', result.user_details.email || '');
          localStorage.setItem('customer_joined', result.user_details.joined || '');
          navigate(`/customer/dashboard/${result.user_id}/home`);
        } else if (result.user_type === 'provider' && result.user_details) {
          localStorage.setItem('provider_fullName', result.user_details.fullName || '');
          localStorage.setItem('provider_address', result.user_details.address || '');
          localStorage.setItem('provider_phone', result.user_details.phone || '');
          localStorage.setItem('provider_email', result.user_details.email || '');
          localStorage.setItem('provider_joined', result.user_details.joined || '');
          navigate(`/provider/dashboard/${result.user_id}`);
        }
      } else {
        alert('Login failed: ' + (result.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="monitoring-wrapper-outer">
      <h2 className="monitoring-section-heading">Monitoring Section</h2>
      <div className="monitoring-wrapper">
        <div className="monitoring-card">
          <div className="monitoring-title">Customer Zone</div>
          <img
            src="/src/assets/Switch as Customer.png"
            alt="Customer Zone"
            className="monitoring-image"
          />
          <div className="monitoring-desc">
            Switch to the customer view to ensure the customer dashboard is functioning correctly.
          </div>
          <button
            className="monitoring-btn"
            onClick={() => handleQuickLogin('customer')}
          >
            Switch as Customer
          </button>
        </div>
        <div className="monitoring-card">
          <div className="monitoring-title">Provider Dashboard</div>
          <img
            src="/src/assets/Switch as Provider.png"
            alt="Provider Dashboard"
            className="monitoring-image"
          />
          <div className="monitoring-desc">
            Switch to the provider view to ensure the provider dashboard is functioning correctly.
          </div>
          <button
            className="monitoring-btn"
            onClick={() => handleQuickLogin('provider')}
          >
            Switch as Provider
          </button>
        </div>
      </div>
    </div>
  );
};

export default Monitoring; 