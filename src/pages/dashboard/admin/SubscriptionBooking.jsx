import React, { useState } from 'react';
import './SubscriptionBooking.css';

const TABS = [
  { key: 'pending', label: 'Pending' },
  { key: 'processing', label: 'Processing' },
  { key: 'cancel', label: 'Cancel' },
];

const sampleSubscriptions = [
  {
    id: 100,
    plan: 'Bi-Weekly Plan',
    customer: 'Alice Wonder',
    provider: '',
    bookingDate: '2025-07-23',
    serviceDate: '2025-07-25',
    time: '11:00 AM',
    address: '101 River Rd, Matara',
    phone: '0701122334',
    amount: '2500',
    status: 'pending',
    reason: '',
    details: 'Bi-weekly window cleaning.'
  },
  {
    id: 1,
    plan: 'Weekly Plan',
    customer: 'John Doe',
    provider: 'Provider A',
    bookingDate: '2024-07-18',
    serviceDate: '2024-07-21',
    time: '10:00 AM',
    address: '123 Main St, Colombo',
    phone: '0771234567',
    amount: '1500',
    status: 'processing',
    reason: '',
    details: 'Weekly cleaning service.'
  },
  {
    id: 2,
    plan: 'Monthly Plan',
    customer: 'Jane Smith',
    provider: 'Provider B',
    bookingDate: '2024-07-19',
    serviceDate: '2024-07-22',
    time: '2:00 PM',
    address: '456 Park Ave, Kandy',
    phone: '0779876543',
    amount: '5000',
    status: 'processing',
    reason: '',
    details: 'Monthly gardening.'
  },
  {
    id: 3,
    plan: 'Yearly Plan',
    customer: 'Bob Brown',
    provider: 'Provider C',
    bookingDate: '2024-07-17',
    serviceDate: '2024-07-20',
    time: '9:00 AM',
    address: '789 Lake Rd, Galle',
    phone: '0712345678',
    amount: '12000',
    status: 'cancel',
    reason: 'Customer requested cancellation',
    details: 'Yearly pest control.'
  },
];

import { toast } from 'sonner';

const SubscriptionBooking = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [viewModal, setViewModal] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [subs, setSubs] = useState(sampleSubscriptions);
  const [editForm, setEditForm] = useState({});
  const [moveModal, setMoveModal] = useState(null);
  const [moveProvider, setMoveProvider] = useState('');

  const filtered = subs.filter(b => {
  if (activeTab === 'pending') {
    return b.status === 'pending' || b.status === 'waiting';
  }
  return b.status === activeTab;
});

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
              {activeTab !== 'pending' && <th>Provider Name</th>}
              <th>Booking Date</th>
              <th>Service Date</th>
              <th>Time</th>
              <th>Phone</th>
              <th>Address</th>
              {activeTab !== 'cancel' && <th>Amount</th>}
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
                  {activeTab !== 'pending' && <td>{b.provider}</td>}
                  <td>{b.bookingDate}</td>
                  <td>{b.serviceDate}</td>
                  <td>{b.time}</td>
                  <td>{b.phone}</td>
                  <td>{b.address}</td>
                  {activeTab !== 'cancel' && <td>{b.amount}</td>}
                  {activeTab === 'cancel' && <td>{b.reason}</td>}
                  <td>
                    <span style={{display:'flex',alignItems:'center'}}>
                      <button className="subscription-booking-view-btn" onClick={() => { setViewModal(b); setEditMode(false); }}>View</button>
                      {activeTab === 'pending' && (b.status !== 'waiting' ? (
                        <button className="subscription-booking-move-btn" style={{marginLeft:'0.5rem'}} onClick={() => { setMoveModal(b); }}>Move</button>
                      ) : (
                        <span style={{marginLeft:'0.7rem', color:'#1a3665', fontWeight:700}}>Waiting</span>
                      ))}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {moveModal && (
        <div className="customer-modal-overlay">
          <div className="customer-modal" style={{minWidth:'350px',maxWidth:'400px'}}>
            <div className="customer-modal-title">Move to the Provider</div>
            <button className="customer-modal-close" onClick={() => setMoveModal(null)} title="Close">&times;</button>
            <form className="customer-modal-form-grid" style={{marginTop:'1.2rem'}} onSubmit={e => {
              e.preventDefault();
              toast.success('Waiting for Provider Accept');
              setSubs(prev => prev.map(b => b.id === moveModal.id ? { ...b, status: 'waiting', provider: moveProvider } : b));
              setMoveModal(null);
              setMoveProvider('');
            }}>
              <div className="customer-modal-form-group" style={{gridColumn:'1/-1'}}>
                <label>Enter Provider
                  <input type="text" value={moveProvider} onChange={e => setMoveProvider(e.target.value)} placeholder="Provider Name or ID" required />
                </label>
              </div>
              <div className="customer-modal-actions">
                <button type="button" onClick={() => setMoveModal(null)}>Cancel</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {viewModal && (
        <div className="customer-modal-overlay">
          <div className="customer-modal">
            {editMode ? (
              <>
                <div className="customer-modal-title">Edit Subscription Booking</div>
                <button className="customer-modal-close" onClick={handleEditCancel} title="Close">&times;</button>
                <form className="customer-modal-form-grid">
                  <div className="customer-modal-form-group">
                    <label>Customer Name
                      <input name="customer" value={editForm.customer} onChange={handleEditChange} placeholder="Name" type="text" />
                    </label>
                  </div>
                  <div className="customer-modal-form-group">
                    <label>Email
                      <input name="email" value={editForm.email || ''} onChange={handleEditChange} placeholder="Email" type="email" />
                    </label>
                  </div>
                  <div className="customer-modal-form-group">
                    <label>Phone Number
                      <input name="phone" value={editForm.phone || ''} onChange={handleEditChange} placeholder="Phone Number" type="text" />
                    </label>
                  </div>
                  <div className="customer-modal-form-group">
                    <label>Address
                      <input name="address" value={editForm.address} onChange={handleEditChange} placeholder="Address" type="text" />
                    </label>
                  </div>
                  <div className="customer-modal-form-group">
                    <label>Plan
                      <input name="plan" value={editForm.plan} onChange={handleEditChange} placeholder="Plan" type="text" />
                    </label>
                  </div>
                  <div className="customer-modal-form-group">
                    <label>Date
                      <input name="date" value={editForm.date} onChange={handleEditChange} placeholder="Date" type="date" />
                    </label>
                  </div>
                  <div className="customer-modal-form-group">
                    <label>Time
                      <input name="time" value={editForm.time} onChange={handleEditChange} placeholder="Time" type="text" />
                    </label>
                  </div>
                  <div className="customer-modal-form-group">
                    <label>Provider Name
                      <input name="provider" value={editForm.provider} onChange={handleEditChange} placeholder="Provider Name" type="text" />
                    </label>
                  </div>
                  <div className="customer-modal-form-group">
                    <label>Details
                      <input name="details" value={editForm.details} onChange={handleEditChange} placeholder="Details" type="text" />
                    </label>
                  </div>
                  {activeTab === 'cancel' && (
                    <div className="customer-modal-form-group">
                      <label>Cancel Reason
                        <input name="reason" value={editForm.reason} onChange={handleEditChange} placeholder="Cancel Reason" type="text" />
                      </label>
                    </div>
                  )}
                  <div className="customer-modal-actions">
                    <button type="button" onClick={handleEditCancel}>Cancel</button>
                    <button type="button" onClick={handleEditSave}>Save</button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="customer-modal-title">Booking Details</div>
                <button className="customer-modal-close" onClick={() => setViewModal(null)} title="Close">&times;</button>
                <div className="customer-modal-details">
                  <div><b>Subscription Plan:</b> {viewModal.plan}</div>
                  <div><b>Customer Name:</b> {viewModal.customer}</div>
                  {activeTab !== 'pending' && <div><b>Provider Name:</b> {viewModal.provider}</div>}
                  <div><b>Booking Date:</b> {viewModal.bookingDate}</div>
                  <div><b>Service Date:</b> {viewModal.serviceDate}</div>
                  <div><b>Time:</b> {viewModal.time}</div>
                  <div><b>Phone:</b> {viewModal.phone}</div>
                  <div><b>Address:</b> {viewModal.address}</div>
                  <div><b>Amount:</b> LKR {viewModal.amount}</div>
                  {activeTab === 'cancel' && <div><b>Cancel Reason:</b> {viewModal.reason}</div>}
                  {activeTab === 'cancel' && <div><b>Details:</b> {viewModal.details}</div>}
                </div>
                <div className="customer-modal-actions">
                  <button onClick={handleEdit}>Edit</button>
                  <button onClick={() => setViewModal(null)}>Close</button>
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