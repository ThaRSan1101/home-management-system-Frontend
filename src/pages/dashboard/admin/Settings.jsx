import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Home Service Platform',
      siteDescription: 'Your trusted platform for home services',
      maintenanceMode: false,
      allowNewRegistrations: true,
      defaultCurrency: 'USD',
      timezone: 'UTC',
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      bookingConfirmation: true,
      reviewNotifications: true,
      marketingEmails: false,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      maxLoginAttempts: 5,
      ipRestriction: false,
    },
    payment: {
      stripeEnabled: true,
      paypalEnabled: true,
      defaultPaymentMethod: 'stripe',
      minimumPayout: 50,
      serviceFee: 10,
    }
  });

  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // In a real application, this would make an API call to save the settings
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset settings to their original values
    setIsEditing(false);
  };

  const renderGeneralSettings = () => (
    <div className="settings-section">
      <div className="setting-item">
        <label>Site Name</label>
        <input
          type="text"
          value={settings.general.siteName}
          onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
          disabled={!isEditing}
        />
      </div>
      <div className="setting-item">
        <label>Site Description</label>
        <textarea
          value={settings.general.siteDescription}
          onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
          disabled={!isEditing}
        />
      </div>
      <div className="setting-item">
        <label>Maintenance Mode</label>
        <input
          type="checkbox"
          checked={settings.general.maintenanceMode}
          onChange={(e) => handleInputChange('general', 'maintenanceMode', e.target.checked)}
          disabled={!isEditing}
        />
      </div>
      <div className="setting-item">
        <label>Allow New Registrations</label>
        <input
          type="checkbox"
          checked={settings.general.allowNewRegistrations}
          onChange={(e) => handleInputChange('general', 'allowNewRegistrations', e.target.checked)}
          disabled={!isEditing}
        />
      </div>
      <div className="setting-item">
        <label>Default Currency</label>
        <select
          value={settings.general.defaultCurrency}
          onChange={(e) => handleInputChange('general', 'defaultCurrency', e.target.value)}
          disabled={!isEditing}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
      <div className="setting-item">
        <label>Timezone</label>
        <select
          value={settings.general.timezone}
          onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
          disabled={!isEditing}
        >
          <option value="UTC">UTC</option>
          <option value="EST">EST</option>
          <option value="PST">PST</option>
        </select>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-section">
      <div className="setting-item">
        <label>Email Notifications</label>
        <input
          type="checkbox"
          checked={settings.notifications.emailNotifications}
          onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
          disabled={!isEditing}
        />
      </div>
      <div className="setting-item">
        <label>SMS Notifications</label>
        <input
          type="checkbox"
          checked={settings.notifications.smsNotifications}
          onChange={(e) => handleInputChange('notifications', 'smsNotifications', e.target.checked)}
          disabled={!isEditing}
        />
      </div>
      <div className="setting-item">
        <label>Booking Confirmation</label>
        <input
          type="checkbox"
          checked={settings.notifications.bookingConfirmation}
          onChange={(e) => handleInputChange('notifications', 'bookingConfirmation', e.target.checked)}
          disabled={!isEditing}
        />
      </div>
      <div className="setting-item">
        <label>Review Notifications</label>
        <input
          type="checkbox"
          checked={settings.notifications.reviewNotifications}
          onChange={(e) => handleInputChange('notifications', 'reviewNotifications', e.target.checked)}
          disabled={!isEditing}
        />
      </div>
      <div className="setting-item">
        <label>Marketing Emails</label>
        <input
          type="checkbox"
          checked={settings.notifications.marketingEmails}
          onChange={(e) => handleInputChange('notifications', 'marketingEmails', e.target.checked)}
          disabled={!isEditing}
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="settings-section">
      <div className="setting-item">
        <label>Two-Factor Authentication</label>
        <input
          type="checkbox"
          checked={settings.security.twoFactorAuth}
          onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
          disabled={!isEditing}
        />
      </div>
      <div className="setting-item">
        <label>Session Timeout (minutes)</label>
        <input
          type="number"
          value={settings.security.sessionTimeout}
          onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
          disabled={!isEditing}
        />
      </div>
      <div className="setting-item">
        <label>Password Expiry (days)</label>
        <input
          type="number"
          value={settings.security.passwordExpiry}
          onChange={(e) => handleInputChange('security', 'passwordExpiry', parseInt(e.target.value))}
          disabled={!isEditing}
        />
      </div>
      <div className="setting-item">
        <label>Max Login Attempts</label>
        <input
          type="number"
          value={settings.security.maxLoginAttempts}
          onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
          disabled={!isEditing}
        />
      </div>
      <div className="setting-item">
        <label>IP Restriction</label>
        <input
          type="checkbox"
          checked={settings.security.ipRestriction}
          onChange={(e) => handleInputChange('security', 'ipRestriction', e.target.checked)}
          disabled={!isEditing}
        />
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="settings-section">
      <div className="setting-item">
        <label>Stripe Enabled</label>
        <input
          type="checkbox"
          checked={settings.payment.stripeEnabled}
          onChange={(e) => handleInputChange('payment', 'stripeEnabled', e.target.checked)}
          disabled={!isEditing}
        />
      </div>
      <div className="setting-item">
        <label>PayPal Enabled</label>
        <input
          type="checkbox"
          checked={settings.payment.paypalEnabled}
          onChange={(e) => handleInputChange('payment', 'paypalEnabled', e.target.checked)}
          disabled={!isEditing}
        />
      </div>
      <div className="setting-item">
        <label>Default Payment Method</label>
        <select
          value={settings.payment.defaultPaymentMethod}
          onChange={(e) => handleInputChange('payment', 'defaultPaymentMethod', e.target.value)}
          disabled={!isEditing}
        >
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>
      <div className="setting-item">
        <label>Minimum Payout Amount</label>
        <input
          type="number"
          value={settings.payment.minimumPayout}
          onChange={(e) => handleInputChange('payment', 'minimumPayout', parseInt(e.target.value))}
          disabled={!isEditing}
        />
      </div>
      <div className="setting-item">
        <label>Service Fee (%)</label>
        <input
          type="number"
          value={settings.payment.serviceFee}
          onChange={(e) => handleInputChange('payment', 'serviceFee', parseInt(e.target.value))}
          disabled={!isEditing}
        />
      </div>
    </div>
  );

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>System Settings</h1>
        <div className="settings-actions">
          {!isEditing ? (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Settings
            </button>
          ) : (
            <div className="action-buttons">
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="settings-tabs">
        <button
          className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button
          className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
        <button
          className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
          onClick={() => setActiveTab('payment')}
        >
          Payment
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'general' && renderGeneralSettings()}
        {activeTab === 'notifications' && renderNotificationSettings()}
        {activeTab === 'security' && renderSecuritySettings()}
        {activeTab === 'payment' && renderPaymentSettings()}
      </div>
    </div>
  );
};

export default Settings; 