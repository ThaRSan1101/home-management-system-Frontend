import React, { useState } from 'react';
import './Services.css';
import Subscription from './Subscription';
import { FaInbox, FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const TOP_TABS = [
  { key: 'services', label: 'Services' },
  { key: 'subscription', label: 'Subscription' },
];

const STATUS_TABS = [
  { key: 'new', label: 'New Requests', icon: <FaInbox /> },
  { key: 'processing', label: 'Processing', icon: <FaSpinner /> },
  { key: 'complete', label: 'Complete', icon: <FaCheckCircle /> },
  { key: 'cancel', label: 'Cancel', icon: <FaTimesCircle /> },
];

const initialActivities = [
  { id: 10, service: 'Window Cleaning', date: '2024-07-01', time: '9:00 AM', status: 'new' },
  { id: 2, service: 'Plumbing', date: '2024-05-28', time: '2:00 PM', status: 'processing' },
  { id: 3, service: 'Electrical Repair', date: '2024-05-20', time: '11:30 AM', status: 'complete' },
  { id: 4, service: 'Carpet Cleaning', date: '2024-05-15', time: '9:00 AM', status: 'cancel' },
  { id: 6, service: 'AC Service', date: '2024-05-30', time: '4:00 PM', status: 'processing' },
];

export default function ProviderActivity() {
  const [topTab, setTopTab] = useState('services');
  const [activeTab, setActiveTab] = useState('new');
  const [activities, setActivities] = useState(initialActivities);

  const filteredActivities = activities.filter((activity) => activity.status === activeTab);

  const handleAccept = (id) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'processing' } : a))
    );
  };

  const handleDecline = (id) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="provider-activity-super">
      <div className="provider-activity-top-tabs-bg">
        <div className="provider-activity-top-tabs">
          {TOP_TABS.map((tab) => (
            <button
              key={tab.key}
              className={`provider-activity-top-tab-btn${topTab === tab.key ? ' active' : ''}`}
              onClick={() => setTopTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {topTab === 'services' ? (
        <>
          <div className="provider-services-tabs-bg">
            <div className="provider-services-tabs">
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab.key}
                  className={`provider-services-tab-btn${activeTab === tab.key ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="provider-services-content">
            {filteredActivities.length === 0 ? (
              <div className="provider-services-empty">
                <span className="empty-icon">🗒️</span>
                <h3>No activities found for this status.</h3>
              </div>
            ) : (
              <div className="provider-services-table-container">
                <div className="provider-services-table-scroll">
                  <table className="provider-services-table">
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        {activeTab === 'new' && <th>Action</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredActivities.map((activity) => (
                        <tr key={activity.id}>
                          <td>{activity.service}</td>
                          <td>{activity.date}</td>
                          <td>{activity.time}</td>
                          <td>
                            <span className={`provider-services-status-badge ${activity.status}`}>
                              {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                            </span>
                          </td>
                          {activeTab === 'new' && (
                            <td>
                              <button
                                className="provider-services-accept-btn"
                                onClick={() => handleAccept(activity.id)}
                              >
                                Accept
                              </button>
                              <button
                                className="provider-services-decline-btn"
                                onClick={() => handleDecline(activity.id)}
                              >
                                Decline
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <Subscription embedded />
      )}
    </div>
  );
} 