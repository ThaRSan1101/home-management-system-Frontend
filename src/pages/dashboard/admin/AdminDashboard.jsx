import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import DashboardHome from './DashboardHome';
import ServiceProviders from './ServiceProviders';
import Reports from './Reports';
import Settings from './Settings';
import Profile from './Profile';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { userId } = useParams();
  return (
    <div className="admin-dashboard-layout">
      <AdminSidebar userId={userId} />
      <main className="admin-dashboard-main">
        <Routes>
          <Route path="/dashboard" element={<DashboardHome userId={userId} />} />
          <Route path="/service-providers" element={<ServiceProviders userId={userId} />} />
          <Route path="/reports" element={<Reports userId={userId} />} />
          <Route path="/settings" element={<Settings userId={userId} />} />
          <Route path="/profile" element={<Profile userId={userId} />} />
          <Route path="*" element={<Navigate to={`/admin/dashboard/${userId}/dashboard`} />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard; 