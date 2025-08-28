import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current user info from backend using token
    axios.get('http://localhost/project-root/backend/home-management-system-Backend/api/me.php', {
      withCredentials: true
    })
    .then(res => {
      if (res.data && res.data.status === 'success' && res.data.user_type === 'admin') {
        setCurrentUser(res.data.user_details);
        setLoading(false);
      } else {
        navigate('/login', { replace: true });
      }
    })
    .catch(() => {
      navigate('/login', { replace: true });
    });
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-dashboard-layout">
      <AdminSidebar />
      <div className="admin-dashboard-content">
        <AdminTopbar />
        <main className="admin-dashboard-main">
          <Routes>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="service-booking" element={<ServiceBooking />} />
            <Route path="service-booking/:serviceBookId" element={<ServiceBooking />} />
            <Route path="subscription-booking" element={<SubscriptionBooking />} />
            <Route path="subscription-booking/:subBookId" element={<SubscriptionBooking />} />
            <Route path="customer" element={<Customer />} />
            <Route path="customer/:userId" element={<Customer />} />
            <Route path="provider" element={<Provider />} />
            <Route path="provider/:userId" element={<Provider />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="user-suggestion" element={<UserSuggestion />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="*" element={<Navigate to="/admin/dashboard/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 