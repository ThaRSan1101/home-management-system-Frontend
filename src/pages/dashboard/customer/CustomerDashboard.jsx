import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Home from './Home';
import Service from './Service';
import Activity from './Activity';
import Subscription from './Subscription';
import Feedback from './Feedback';
import Profile from './Profile';
import HowItWorks from './HowItWorks';
import About from './About';
import Contact from './Contact';
import './CustomerDashboard.css';

const CustomerDashboard = () => (
  <div className="customer-dashboard-layout">
    <Sidebar />
    <main className="customer-dashboard-main">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/customer/home" />} />
      </Routes>
    </main>
  </div>
);

export default CustomerDashboard; 