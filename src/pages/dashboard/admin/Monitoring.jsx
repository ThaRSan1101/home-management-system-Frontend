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
      // No localStorage usage; rely on backend session/cookie and redirect
      let profileRes;
      if (type === 'customer') {
        profileRes = await axios.get(
          `http://localhost/project-root/backend/home-management-system-Backend/api/get_customer_profile.php?user_id=${userId}`,
          { withCredentials: true }
        );
        // Optionally update context/state here if needed
        window.location.href = `/customer/dashboard/${userId}/home`;
      } else if (type === 'provider') {
        profileRes = await axios.get(
          `http://localhost/project-root/backend/home-management-system-Backend/api/get_provider_profile.php?user_id=${userId}`,
          { withCredentials: true }
        );
        // Optionally update context/state here if needed
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
            onClick={() => handleSwitchAccount('customer', 2)}
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
            onClick={() => handleSwitchAccount('provider', 3)}
          >
            Switch as Provider
          </button>
        </div>
      </div>
    </div>
  );
};

export default Monitoring; 