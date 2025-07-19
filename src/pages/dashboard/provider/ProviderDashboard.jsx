import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import ProviderSidebar from './ProviderSidebar';
import ProviderTopbar from './ProviderTopbar';
import ServiceProviderDashboard from './ServiceProviderDashboard';
import ProviderActivity from './Services';
import Feedback from './Feedback';
import Contact from './Contact';
import './ServiceProviderDashboard.css';

const ProviderDashboard = ({ userName: propUserName }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('provider_fullName')) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);
  const userName = propUserName || '';
  return (
    <div className="provider-dashboard-layout">
      <ProviderSidebar userId={userId} />
      <main className="provider-dashboard-main">
        <ProviderTopbar userId={userId} />
        <div style={{margin: '2rem 0 1rem 2rem', fontSize: '2rem', fontWeight: 700, color: '#007a65', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.7rem'}}>
          {userName && <span style={{color: '#005f4b'}}>{userName} !</span>}
        </div>
        <Routes>
          <Route path="dashboard" element={<ServiceProviderDashboard userId={userId} />} />
          <Route path="activity/services" element={<ProviderActivity userId={userId} />} />
          <Route path="feedback" element={<Feedback userId={userId} />} />
          <Route path="contact" element={<Contact userId={userId} />} />
          <Route path="*" element={<Navigate to={`/provider/dashboard/${userId}/dashboard`} />} />
        </Routes>
      </main>
    </div>
  );
};

export default ProviderDashboard; 