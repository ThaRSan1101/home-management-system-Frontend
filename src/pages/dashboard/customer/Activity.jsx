import React, { useState } from 'react';
import './Activity.css';
import { FaClock, FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const STATUS_TABS = [
  { key: 'pending', label: 'Pending', icon: <FaClock /> },
  { key: 'processing', label: 'Processing', icon: <FaSpinner /> },
  { key: 'complete', label: 'Complete', icon: <FaCheckCircle /> },
  { key: 'cancel', label: 'Cancel', icon: <FaTimesCircle /> },
];

const sampleActivities = [
  {
    id: 1,
    service: 'House Cleaning',
    date: '2024-06-01',
    time: '10:00 AM',
    status: 'pending',
  },
  {
    id: 2,
    service: 'Plumbing',
    date: '2024-05-28',
    time: '2:00 PM',
    status: 'processing',
  },
  {
    id: 3,
    service: 'Electrical Repair',
    date: '2024-05-20',
    time: '11:30 AM',
    status: 'complete',
  },
  {
    id: 4,
    service: 'Carpet Cleaning',
    date: '2024-05-15',
    time: '9:00 AM',
    status: 'cancel',
  },
  {
    id: 5,
    service: 'Garden Maintenance',
    date: '2024-06-02',
    time: '8:00 AM',
    status: 'pending',
  },
  {
    id: 6,
    service: 'AC Service',
    date: '2024-05-30',
    time: '4:00 PM',
    status: 'processing',
  },
];

export default function Activity() {
  const [activeTab, setActiveTab] = useState('pending');
  const [activities, setActivities] = useState(sampleActivities);

  const filteredActivities = activities.filter(
    (activity) => activity.status === activeTab
  );

  const handleCancel = (id) => {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: 'cancel' } : a
      )
    );
  };

  return (
    <div className="customer-dashboard-activity-super">
      <div className="customer-activity-tabs-bg">
        <div className="customer-activity-tabs">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              className={`customer-activity-tab-btn${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="customer-activity-content">
        {filteredActivities.length === 0 ? (
          <div className="customer-activity-empty">
            <span className="empty-icon">🗒️</span>
            <h3>No activities found for this status.</h3>
          </div>
        ) : (
          <div className="customer-activity-table-container">
            <div className="customer-activity-table-scroll">
              <table className="customer-activity-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    {activeTab === 'pending' && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.service}</td>
                      <td>{activity.date}</td>
                      <td>{activity.time}</td>
                      <td>
                        <span className={`customer-activity-status-badge ${activity.status}`}>
                          {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                        </span>
                      </td>
                      {activeTab === 'pending' && (
                        <td>
                          <button
                            className="customer-activity-cancel-btn"
                            onClick={() => handleCancel(activity.id)}
                          >
                            Cancel
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
    </div>
  );
} 