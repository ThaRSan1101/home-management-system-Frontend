import React, { useState } from 'react';
import './Reports.css';
import Logo from '../../../components/Logo';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('overview');

  const reports = {
    overview: {
      title: 'Overview Report',
      data: {
        totalBookings: 789,
        activeUsers: 1234,
        activeServices: 10,
        activeSubscriptions: 5,
        monthlyGrowth: 15,
        completionRate: 92,
        fixedBookingAmount: 150
      }
    },
    bookings: {
      title: 'Bookings Report',
      data: {
        status: [
          { status: 'Completed', count: 450 },
          { status: 'Pending', count: 200 },
          { status: 'In Progress', count: 100 },
          { status: 'Cancelled', count: 39 }
        ],
        monthly: [50, 65, 75, 60, 70, 80],
        services: [
          {
            name: 'House Cleaning',
            description: 'Professional home cleaning services',
            bookings: 250,
            amount: 150
          },
          {
            name: 'Plumbing',
            description: 'Expert plumbing repair and maintenance',
            bookings: 180,
            amount: 150
          },
          {
            name: 'Electrical',
            description: 'Electrical repairs and installations',
            bookings: 150,
            amount: 150
          },
          {
            name: 'Carpentry',
            description: 'Custom woodwork and repairs',
            bookings: 120,
            amount: 150
          },
          {
            name: 'Painting',
            description: 'Interior and exterior painting services',
            bookings: 95,
            amount: 150
          },
          {
            name: 'Pest Control',
            description: 'Professional pest elimination',
            bookings: 85,
            amount: 150
          },
          {
            name: 'Appliance Repair',
            description: 'Repair for all home appliances',
            bookings: 75,
            amount: 150
          },
          {
            name: 'HVAC Service',
            description: 'Heating and cooling system maintenance',
            bookings: 65,
            amount: 150
          },
          {
            name: 'Locksmith',
            description: 'Emergency locksmith services',
            bookings: 55,
            amount: 150
          },
          {
            name: 'Moving Service',
            description: 'Professional moving and packing',
            bookings: 45,
            amount: 150
          }
        ],
        subscriptions: [
          {
            name: 'Vehicle Wash',
            description: 'Regular cleaning for bikes and cars',
            plans: {
              weekly: { price: 50, bookings: 120 },
              monthly: { price: 180, bookings: 450 },
              yearly: { price: 2000, bookings: 5200 }
            }
          },
          {
            name: 'Deep Cleaning',
            description: 'Comprehensive cleaning for home, kitchen, bathroom, and office',
            plans: {
              weekly: { price: 100, bookings: 80 },
              monthly: { price: 350, bookings: 320 },
              yearly: { price: 3800, bookings: 3840 }
            }
          },
          {
            name: 'Gardening',
            description: 'Lawn maintenance and garden care',
            plans: {
              weekly: { price: 75, bookings: 90 },
              monthly: { price: 250, bookings: 360 },
              yearly: { price: 2800, bookings: 4320 }
            }
          },
          {
            name: 'AC Deep Clean',
            description: 'Professional AC maintenance and cleaning',
            plans: {
              weekly: { price: 80, bookings: 70 },
              monthly: { price: 280, bookings: 280 },
              yearly: { price: 3000, bookings: 3360 }
            }
          },
          {
            name: 'Annual Health Check',
            description: 'Regular plumbing and electrical inspections',
            plans: {
              weekly: { price: 60, bookings: 60 },
              monthly: { price: 200, bookings: 240 },
              yearly: { price: 2200, bookings: 2880 }
            }
          }
        ]
      }
    }
  };

  const renderOverview = () => (
    <div className="overview-grid">
      <div className="stat-card">
        <h4>Total Bookings</h4>
        <p className="stat-value">{reports.overview.data.totalBookings}</p>
      </div>
      <div className="stat-card">
        <h4>Active Users</h4>
        <p className="stat-value">{reports.overview.data.activeUsers}</p>
      </div>
      <div className="stat-card">
        <h4>Active Services</h4>
        <p className="stat-value">{reports.overview.data.activeServices}</p>
      </div>
      <div className="stat-card">
        <h4>Active Subscriptions</h4>
        <p className="stat-value">{reports.overview.data.activeSubscriptions}</p>
      </div>
      <div className="stat-card">
        <h4>Monthly Growth</h4>
        <p className="stat-value">{reports.overview.data.monthlyGrowth}%</p>
      </div>
      <div className="stat-card">
        <h4>Completion Rate</h4>
        <p className="stat-value">{reports.overview.data.completionRate}%</p>
      </div>
      <div className="stat-card">
        <h4>Fixed Booking Amount</h4>
        <p className="stat-value">${reports.overview.data.fixedBookingAmount}</p>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="bookings-section">
      <div className="bookings-chart">
        <h3>Monthly Bookings</h3>
        <div className="chart-placeholder">
          Monthly bookings chart will be displayed here
        </div>
      </div>
      <div className="bookings-status">
        <h3>Bookings by Status</h3>
        <div className="status-list">
          {reports.bookings.data.status.map((item, index) => (
            <div key={index} className="status-item">
              <span className="status-name">{item.status}</span>
              <span className="status-count">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bookings-services">
        <h3>Regular Services</h3>
        <div className="services-grid">
          {reports.bookings.data.services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-details">
                <h4>{service.name}</h4>
                <p>{service.description}</p>
                <div className="service-stats">
                  <span>{service.bookings} bookings</span>
                  <span>${service.amount}</span>
                </div>
                <button className="book-button">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="subscriptions-section">
        <h3>Subscription Plans</h3>
        <div className="subscriptions-grid">
          {reports.bookings.data.subscriptions.map((subscription, index) => (
            <div key={index} className="subscription-card">
              <div className="subscription-details">
                <h4>{subscription.name}</h4>
                <p>{subscription.description}</p>
                <div className="subscription-plans">
                  <div className="plan">
                    <h5>Weekly</h5>
                    <p>${subscription.plans.weekly.price}</p>
                    <span>{subscription.plans.weekly.bookings} bookings</span>
                  </div>
                  <div className="plan">
                    <h5>Monthly</h5>
                    <p>${subscription.plans.monthly.price}</p>
                    <span>{subscription.plans.monthly.bookings} bookings</span>
                  </div>
                  <div className="plan">
                    <h5>Yearly</h5>
                    <p>${subscription.plans.yearly.price}</p>
                    <span>{subscription.plans.yearly.bookings} bookings</span>
                  </div>
                </div>
                <button className="subscribe-button">Subscribe Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div className="header-left">
          <Logo size="medium" />
          <h2>Reports & Analytics</h2>
        </div>
        <div className="report-filters">
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="report-select"
          >
            <option value="overview">Overview</option>
            <option value="bookings">Bookings</option>
          </select>
        </div>
      </div>

      <div className="reports-content">
        {selectedReport === 'overview' && renderOverview()}
        {selectedReport === 'bookings' && renderBookings()}
      </div>
    </div>
  );
};

export default Reports; 