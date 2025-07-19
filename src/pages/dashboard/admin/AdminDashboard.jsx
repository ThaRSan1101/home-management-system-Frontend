import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import DashboardHome from './DashboardHome';
import ServiceBooking from './ServiceBooking';
import SubscriptionBooking from './SubscriptionBooking';
import Customer from './Customer';
import Provider from './Provider';
import Feedback from './Feedback';
import UserSuggestion from './UserSuggestion';
import Monitoring from './Monitoring';
import AdminTopbar from './AdminTopbar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { userId } = useParams();
  return (
    <div className="admin-dashboard-layout">
      <AdminSidebar userId={userId} />
      <div className="admin-dashboard-content">
        <AdminTopbar />
        <main className="admin-dashboard-main">
          <Routes>
            <Route path="/dashboard" element={<DashboardHome userId={userId} />} />
            <Route path="/service-booking" element={<ServiceBooking userId={userId} />} />
            <Route path="/subscription-booking" element={<SubscriptionBooking userId={userId} />} />
            <Route path="/customer" element={<Customer userId={userId} />} />
            <Route path="/provider" element={<Provider userId={userId} />} />
            <Route path="/feedback" element={<Feedback userId={userId} />} />
            <Route path="/user-suggestion" element={<UserSuggestion userId={userId} />} />
            <Route path="/monitoring" element={<Monitoring userId={userId} />} />
            <Route path="*" element={<Navigate to={`/admin/dashboard/${userId}/dashboard`} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 