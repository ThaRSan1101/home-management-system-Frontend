import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProviderSidebar from './ProviderSidebar';
import ProviderTopbar from './ProviderTopbar';
import ServiceProviderDashboard from './ServiceProviderDashboard';
import ProviderActivity from './Services';
import Feedback from './Feedback';
import Contact from './Contact';
import './ServiceProviderDashboard.css';

const ProviderDashboard = () => (
  <div className="provider-dashboard-layout">
    <ProviderSidebar />
    <main className="provider-dashboard-main">
      <ProviderTopbar />
      <Routes>
        <Route path="dashboard" element={<ServiceProviderDashboard />} />
        <Route path="activity/services" element={<ProviderActivity />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/provider/dashboard" />} />
      </Routes>
    </main>
  </div>
);

export default ProviderDashboard; 