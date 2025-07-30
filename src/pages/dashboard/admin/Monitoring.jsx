import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Monitoring.css';
import { toast } from 'sonner';

const Monitoring = () => {
  const navigate = useNavigate();

  const handleSwitchAccount = async (type, userId) => {
  try {
    const response = await axios.post(
      'http://localhost/project-root/backend/home-management-system-Backend/api/switch_user.php',
      { user_id: userId, user_type: type },
      { withCredentials: true }
    );
    const result = response.data;
    if (result.status === 'success') {
      // Clear all user-related localStorage except the one we're switching to
      localStorage.removeItem('customer_id');
      localStorage.removeItem('customer_user_id');
      localStorage.removeItem('customer_fullName');
      localStorage.removeItem('customer_address');
      localStorage.removeItem('customer_phone');
      localStorage.removeItem('customer_email');
      localStorage.removeItem('customer_joined');
      localStorage.removeItem('customer_nic');
      localStorage.removeItem('provider_id');
      localStorage.removeItem('provider_user_id');
      localStorage.removeItem('provider_fullName');
      localStorage.removeItem('provider_address');
      localStorage.removeItem('provider_phone');
      localStorage.removeItem('provider_email');
      localStorage.removeItem('provider_joined');
      localStorage.removeItem('provider_nic');
      localStorage.removeItem('admin_fullName');
      // Now fetch and set only the correct user type
      let profileRes;
      if (type === 'customer') {
        profileRes = await axios.get(
          `http://localhost/project-root/backend/home-management-system-Backend/api/get_customer_profile.php?user_id=${userId}`,
          { withCredentials: true }
        );
        const profile = profileRes.data;
        localStorage.setItem('customer_id', userId);
        localStorage.setItem('customer_user_id', userId);
        localStorage.setItem('customer_fullName', profile.fullName || '');
        localStorage.setItem('customer_address', profile.address || '');
        localStorage.setItem('customer_phone', profile.phone || '');
        localStorage.setItem('customer_email', profile.email || '');
        localStorage.setItem('customer_joined', profile.joined || '');
        localStorage.setItem('customer_nic', profile.nic || '');
        window.location.href = `/customer/dashboard/${userId}/home`;
      } else if (type === 'provider') {
        profileRes = await axios.get(
          `http://localhost/project-root/backend/home-management-system-Backend/api/get_provider_profile.php?user_id=${userId}`,
          { withCredentials: true }
        );
        const profile = profileRes.data;
        localStorage.setItem('provider_id', userId);
        localStorage.setItem('provider_user_id', userId);
        localStorage.setItem('provider_fullName', profile.fullName || '');
        localStorage.setItem('provider_address', profile.address || '');
        localStorage.setItem('provider_phone', profile.phone || '');
        localStorage.setItem('provider_email', profile.email || '');
        localStorage.setItem('provider_joined', profile.joined || '');
        localStorage.setItem('provider_nic', profile.nic || '');
        window.location.href = `/provider/dashboard/${userId}`;
      }
    } else {
      toast.error('Switch failed: ' + (result.message || 'Unknown error'));
    }
  } catch (err) {
    toast.error('Switch failed: ' + (err.response?.data?.message || err.message));
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
            onClick={() => handleSwitchAccount('customer', 4)}
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
            onClick={() => handleSwitchAccount('provider', 5)}
          >
            Switch as Provider
          </button>
        </div>
      </div>
    </div>
  );
};

export default Monitoring; 