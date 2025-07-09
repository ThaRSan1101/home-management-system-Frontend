import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
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

const CustomerDashboard = ({ userName: propUserName }) => {
  const { userId } = useParams();
  const userName = propUserName || '';
  return (
    <div className="customer-dashboard-layout">
      <Sidebar userId={userId} />
      <main className="customer-dashboard-main">
        <Topbar userId={userId} />
        <div style={{margin: '2rem 0 1rem 2rem', fontSize: '2rem', fontWeight: 700, color: '#007a65', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.7rem'}}>
          <span>Welcome back</span>
          {userName && <span style={{color: '#005f4b'}}>{userName} !</span>}
        </div>
        <Routes>
          <Route path="/home" element={<Dashboard userId={userId} />} />
          <Route path="/service" element={<Service userId={userId} />} />
          <Route path="/activity" element={<Activity userId={userId} />} />
          <Route path="/subscription" element={<Subscription userId={userId} />} />
          <Route path="/feedback" element={<Feedback userId={userId} />} />
          <Route path="/how-it-works" element={<HowItWorks userId={userId} />} />
          <Route path="/about" element={<About userId={userId} />} />
          <Route path="/contact" element={<Contact userId={userId} />} />
          <Route path="*" element={<Navigate to={`/customer/dashboard/${userId}/home`} />} />
        </Routes>
      </main>
    </div>
  );
};

export default CustomerDashboard; 