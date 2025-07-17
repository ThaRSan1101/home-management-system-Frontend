import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Monitoring.css';

const Monitoring = () => {
  const navigate = useNavigate();

  const handleImpersonate = async (type) => {
    try {
      const res = await fetch(
        `http://localhost/project-root/backend/home-management-system-Backend/api/impersonate.php?type=${type}`,
        { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' } }
      );
      if (!res.ok) throw new Error('Failed to impersonate');
      const data = await res.json();
      localStorage.setItem('token', data.token);
      if (type === 'customer') navigate('/customer/dashboard');
      else navigate('/provider/dashboard');
    } catch (err) {
      alert('Impersonation failed');
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
            onClick={() => handleImpersonate('customer')}
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
            onClick={() => handleImpersonate('provider')}
          >
            Switch as Provider
          </button>
        </div>
      </div>
    </div>
  );
};

export default Monitoring; 