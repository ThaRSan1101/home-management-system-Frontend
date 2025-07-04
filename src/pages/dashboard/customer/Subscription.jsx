import React, { useState } from 'react';
import './Subscription.css';

const TABS = [
  { key: 'subscribed', label: 'Subscription Service' },
  { key: 'unsubscribed', label: 'Unsubscription Service' },
];

const samplePlans = [
  {
    id: 1,
    plan: 'Premium Home Care',
    startDate: '2024-05-01',
    endDate: '2025-05-01',
    status: 'subscribed',
  },
  {
    id: 2,
    plan: 'Basic Maintenance',
    startDate: '-',
    endDate: '-',
    status: 'unsubscribed',
  },
  {
    id: 3,
    plan: 'Garden Plus',
    startDate: '-',
    endDate: '-',
    status: 'unsubscribed',
  },
  {
    id: 4,
    plan: 'AC Annual Care',
    startDate: '2024-01-10',
    endDate: '2025-01-10',
    status: 'subscribed',
  },
];

export default function Subscription() {
  const [plans, setPlans] = useState(samplePlans);
  const [activeTab, setActiveTab] = useState('subscribed');

  const filteredPlans = plans.filter((plan) => plan.status === activeTab);

  const handleUnsubscribe = (id) => {
    setPlans((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: 'unsubscribed', startDate: '-', endDate: '-' } : p
      )
    );
  };

  return (
    <div className="dashboard-subscription-super">
      <div className="subscription-tabs-bg">
        <div className="subscription-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`subscription-tab-btn${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="subscription-table-container">
        <div className="subscription-table-scroll">
          <table className="subscription-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan) => (
                <tr key={plan.id}>
                  <td>{plan.plan}</td>
                  <td>{plan.startDate}</td>
                  <td>{plan.endDate}</td>
                  <td>
                    {activeTab === 'subscribed' ? (
                      <button
                        className="subscription-unsubscribe-btn"
                        onClick={() => handleUnsubscribe(plan.id)}
                      >
                        Unsubscribe
                      </button>
                    ) : (
                      <span className="subscription-unsubscribed-label">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 