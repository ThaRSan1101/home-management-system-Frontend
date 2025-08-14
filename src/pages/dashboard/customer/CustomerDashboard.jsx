import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Service from './Service';
import Activity from './Activity';
import Subscription from './Subscription';
import Feedback from './Feedback';
import HowItWorks from './HowItWorks';
import About from './About';
import Contact from './Contact';
import './CustomerDashboard.css';
import Topbar from './Topbar';
import axios from 'axios';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost/project-root/backend/home-management-system-Backend/api/me.php', {
      withCredentials: true
    })
    .then(async res => {
      if (res.data && res.data.status === 'success' && res.data.user_type === 'customer') {
        const userId = res.data.user_id;
        // Fetch full profile
        try {
          const profileRes = await axios.get(`http://localhost/project-root/backend/home-management-system-Backend/api/get_customer_profile.php?user_id=${userId}`, { withCredentials: true });
          if (profileRes.data && profileRes.data.fullName) {
            setCurrentUser({ ...profileRes.data, user_id: userId });
          } else {
            // fallback: set at least the name
            setCurrentUser({ fullName: res.data.name || '', email: res.data.email || '' });
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
    <div className="customer-dashboard-layout">
      <Sidebar />
      <main className="customer-dashboard-main">
        <Topbar currentUser={currentUser} />
        <Routes>
          <Route path="home" element={
            <>
              <div className="customer-dashboard-welcome-msg">
                <span>Welcome back</span>
                {currentUser?.fullName && <span className="customer-dashboard-welcome-username">{currentUser.fullName} !</span>}
              </div>
              <Dashboard />
            </>
          } />
          <Route path="service" element={<Service currentUser={currentUser} />} />
          <Route path="activity" element={<Activity currentUser={currentUser} />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="feedback" element={<Feedback currentUser={currentUser} />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/customer/dashboard/home" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default CustomerDashboard; 