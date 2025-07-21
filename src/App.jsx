import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import { Toaster } from 'sonner';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/dashboard/customer/CustomerDashboard';
import ProviderDashboard from './pages/dashboard/provider/ProviderDashboard';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  // userType is only used for UI hints, not for authentication. Do not use localStorage for auth logic.
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
          <Route path="/customer/dashboard/:userId/*" element={<CustomerDashboard />} />
          <Route path="/provider/dashboard/:userId/*" element={<ProviderDashboard />} />
          <Route path="/admin/dashboard/:userId/*" element={<AdminDashboard />} />
          {/* Redirect to correct dashboard after login */}
          <Route
            path="/dashboard"
            element={
              // Example: get user type from localStorage (or context/redux)
              // This part of the logic would typically involve a backend session check
              // For now, it's a placeholder.
              <Navigate to="/login" />
            }
          />
        </Routes>
      </main>
      <Toaster position="top-center" richColors closeButton theme="light" />
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
