import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProviderSidebar from './ProviderSidebar';
import ProviderHome from './ProviderHome';
import Bookings from './Bookings';
import Services from './Services';
import Notifications from './Notifications';
import Profile from './Profile';
import './ServiceProviderDashboard.css';

const ServiceProviderDashboard = () => (
  <div className="provider-dashboard-layout">
    <ProviderSidebar />
    <main className="provider-dashboard-main">
      <Routes>
        <Route path="/dashboard" element={<ProviderHome />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/services" element={<Services />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/provider/dashboard" />} />
      </Routes>
    </main>
  </div>
);

export default ServiceProviderDashboard; 