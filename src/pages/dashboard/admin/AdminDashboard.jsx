import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import DashboardHome from './DashboardHome';
import ServiceProviders from './ServiceProviders';
import Reports from './Reports';
import Settings from './Settings';
import Profile from './Profile';
import './AdminDashboard.css';

const AdminDashboard = () => (
  <div className="admin-dashboard-layout">
    <AdminSidebar />
    <main className="admin-dashboard-main">
      <Routes>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/service-providers" element={<ServiceProviders />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </main>
  </div>
);

export default AdminDashboard; 