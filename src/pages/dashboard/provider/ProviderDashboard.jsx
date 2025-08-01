import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProviderSidebar from './ProviderSidebar';
import ProviderTopbar from './ProviderTopbar';
import ServiceProviderDashboard from './ServiceProviderDashboard';
import ProviderActivity from './Services';
import Feedback from './Feedback';
import Contact from './Contact';
import './ServiceProviderDashboard.css';
import axios from 'axios';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost/project-root/backend/home-management-system-Backend/api/me.php', {
      withCredentials: true
    })
    .then(async res => {
      if (res.data && res.data.status === 'success' && res.data.user_type === 'provider') {
        const userId = res.data.user_id;
        try {
          const profileRes = await axios.get('http://localhost/project-root/backend/home-management-system-Backend/api/get_provider_profile.php', { withCredentials: true });
          if (profileRes.data && profileRes.data.data && profileRes.data.data.fullName) {
            setCurrentUser({
              ...profileRes.data.data,
              user_id: userId // Always include user_id
            });
          } else {
            setCurrentUser({
              fullName: res.data.name || '',
              email: res.data.email || '',
              user_id: userId // Always include user_id
            });
          }
        } catch (e) {
          setCurrentUser({ fullName: res.data.name || '', email: res.data.email || '' });
        }
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
    <div className="provider-dashboard-layout">
      <ProviderSidebar />
      <main className="provider-dashboard-main">
        <ProviderTopbar currentUser={currentUser} />
        
        <Routes>
          <Route path="dashboard" element={<ServiceProviderDashboard providerName={currentUser?.fullName || currentUser?.name || ''} />} />
          <Route path="activity/services" element={<ProviderActivity />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/provider/dashboard/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default ProviderDashboard; 