import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/dashboard/customer/CustomerDashboard';
import ServiceProviderDashboard from './pages/dashboard/provider/ServiceProviderDashboard';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  // Example: get user type from localStorage (or context/redux)
  const userType = localStorage.getItem('userType'); // 'customer', 'admin', 'provider'
  const location = useLocation();
  const isDashboard =
    location.pathname.startsWith('/customer') ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/provider');

  return (
    <div className="app">
      {!isDashboard && <Navbar />}
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes */}
          <Route path="/customer/*" element={<CustomerDashboard />} />
          <Route path="/provider/*" element={<ServiceProviderDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          {/* Redirect to correct dashboard after login */}
          <Route
            path="/dashboard"
            element={
              userType === 'customer' ? <Navigate to="/customer" />
              : userType === 'admin' ? <Navigate to="/admin" />
              : userType === 'provider' ? <Navigate to="/provider" />
              : <Navigate to="/login" />
            }
          />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}

// Wrap App in Router to use useLocation
function AppWithRouter() {
  return (
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  );
}

export default AppWithRouter;
