import React, { useState } from 'react';
import './SubscriptionBooking.css';

const TABS = [
  { key: 'processing', label: 'Processing' },
  { key: 'cancel', label: 'Cancel' },
];

const sampleSubscriptions = [
  {
    id: 1,
    plan: 'Weekly Plan',
    customer: 'John Doe',
    provider: 'Provider A',
    date: '2024-07-21',
    time: '10:00 AM',
    address: '123 Main St, Colombo',
    status: 'processing',
    reason: '',
    details: 'Weekly cleaning service.'
  },
  {
    id: 2,
    plan: 'Monthly Plan',
    customer: 'Jane Smith',
    provider: 'Provider B',
    date: '2024-07-22',
    time: '2:00 PM',
    address: '456 Park Ave, Kandy',
    status: 'processing',
    reason: '',
    details: 'Monthly gardening.'
  },
  {
    id: 3,
    plan: 'Yearly Plan',
    customer: 'Bob Brown',
    provider: 'Provider C',
    date: '2024-07-20',
    time: '9:00 AM',
    address: '789 Lake Rd, Galle',
    status: 'cancel',
    reason: 'Customer requested cancellation',
    details: 'Yearly pest control.'
  },
];

const SubscriptionBooking = () => {
  const [activeTab, setActiveTab] = useState('processing');
  const [viewModal, setViewModal] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [subs, setSubs] = useState(sampleSubscriptions);
  const [editForm, setEditForm] = useState({});

  const filtered = subs.filter(b => b.status === activeTab);

  const handleEdit = () => {
    setEditForm(viewModal);
    setEditMode(true);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditSave = () => {
    setSubs((prev) => prev.map(b => b.id === editForm.id ? { ...editForm } : b));
    setViewModal({ ...editForm });
    setEditMode(false);
  };
  const handleEditCancel = () => {
    setEditMode(false);
    setViewModal(null);
  };

  return (
    <div className="subscription-booking-page">
      <h2 className="subscription-booking-title">Subscription Booking</h2>
      <div className="subscription-booking-tabs">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`subscription-booking-tab-btn${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="subscription-booking-table-container">
        <table className="subscription-booking-table">
          <thead>
            <tr>
              <th>Subscription Plan</th>
              <th>Customer Name</th>
              <th>Provider Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Address</th>
              {activeTab === 'cancel' && <th>Cancel Reason</th>}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={activeTab === 'cancel' ? 8 : 7} style={{textAlign:'center',color:'#888',padding:'2rem 0'}}>No bookings found.</td></tr>
            ) : (
              filtered.map(b => (
                <tr key={b.id}>
                  <td>{b.plan}</td>
                  <td>{b.customer}</td>
                  <td>{b.provider}</td>
                  <td>{b.date}</td>
                  <td>{b.time}</td>
                  <td>{b.address}</td>
                  {activeTab === 'cancel' && <td>{b.reason}</td>}
                  <td>
                    <button className="subscription-booking-view-btn" onClick={() => { setViewModal(b); setEditMode(false); }}>View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {viewModal && (
        <div className="subscription-booking-modal-overlay">
          <div className="subscription-booking-modal">
            {editMode ? (
              <>
                <div className="service-booking-edit-modal-header">Edit Booking</div>
                <form className="subscription-booking-edit-form-grid2col">
                  <div>
                    <label>Subscription Plan
                      <input name="plan" value={editForm.plan} onChange={handleEditChange} placeholder="Subscription Plan" />
                    </label>
                  </div>
                  <div>
                    <label>Customer Name
                      <input name="customer" value={editForm.customer} onChange={handleEditChange} placeholder="Customer Name" />
                    </label>
                  </div>
                  <div>
                    <label>Provider Name
                      <input name="provider" value={editForm.provider} onChange={handleEditChange} placeholder="Provider Name" />
                    </label>
                  </div>
                  <div>
                    <label>Date
                      <input name="date" value={editForm.date} onChange={handleEditChange} placeholder="Date" />
                    </label>
                  </div>
                  <div>
                    <label>Time
                      <input name="time" value={editForm.time} onChange={handleEditChange} placeholder="Time" />
                    </label>
                  </div>
                  <div>
                    <label>Address
                      <input name="address" value={editForm.address} onChange={handleEditChange} placeholder="Address" />
                    </label>
                  </div>
                  {activeTab === 'cancel' && (
                    <div>
                      <label>Cancel Reason
                        <input name="reason" value={editForm.reason} onChange={handleEditChange} placeholder="Cancel Reason" />
                      </label>
                    </div>
                  )}
                  <div style={{gridColumn:'1/3'}}>
                    <label>Details
                      <input name="details" value={editForm.details} onChange={handleEditChange} placeholder="Details" />
                    </label>
                  </div>
                  <div className="service-booking-edit-btn-row">
                    <button type="button" className="service-booking-edit-btn cancel" onClick={handleEditCancel}>Cancel</button>
                    <button type="button" className="service-booking-edit-btn save" onClick={handleEditSave}>Save</button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h3>Booking Details</h3>
                <div><b>Subscription Plan:</b> {viewModal.plan}</div>
                <div><b>Customer Name:</b> {viewModal.customer}</div>
                <div><b>Provider Name:</b> {viewModal.provider}</div>
                <div><b>Date:</b> {viewModal.date}</div>
                <div><b>Time:</b> {viewModal.time}</div>
                <div><b>Address:</b> {viewModal.address}</div>
                {activeTab === 'cancel' && <div><b>Cancel Reason:</b> {viewModal.reason}</div>}
                <div><b>Details:</b> {viewModal.details}</div>
                <div style={{display:'flex',gap:'1rem',justifyContent:'flex-end',marginTop:'1.2rem'}}>
                  <button className="subscription-booking-modal-edit" onClick={handleEdit}>Edit</button>
                  <button className="subscription-booking-modal-close" onClick={() => setViewModal(null)}>Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionBooking; 