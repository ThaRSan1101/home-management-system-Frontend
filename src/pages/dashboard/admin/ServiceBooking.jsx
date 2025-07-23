import React, { useState } from 'react';
import './ServiceBooking.css';

const TABS = [
  { key: 'pending', label: 'Pending' },
  { key: 'processing', label: 'Processing' },
  { key: 'complete', label: 'Complete' },
  { key: 'cancel', label: 'Cancel' },
];

const sampleBookings = [
  {
    id: 1,
    service: 'Plumbing',
    customer: 'John Doe',
    provider: 'Provider A',
    date: '2024-07-21',
    time: '10:00 AM',
    address: '123 Main St, Colombo',
    status: 'pending',
    reason: '',
    details: 'Leaking pipe in kitchen.',
    amount: '',
  },
  {
    id: 2,
    service: 'Electrical',
    customer: 'Jane Smith',
    provider: 'Provider B',
    date: '2024-07-22',
    time: '2:00 PM',
    address: '456 Park Ave, Kandy',
    status: 'processing',
    reason: '',
    details: 'Install new ceiling fan.',
    amount: '',
  },
  {
    id: 3,
    service: 'Cleaning',
    customer: 'Bob Brown',
    provider: 'Provider C',
    date: '2024-07-20',
    time: '9:00 AM',
    address: '789 Lake Rd, Galle',
    status: 'complete',
    reason: '',
    details: 'Full house cleaning.',
    amount: '4500',
  },
  {
    id: 4,
    service: 'Painting',
    customer: 'Alice Green',
    provider: 'Provider D',
    date: '2024-07-19',
    time: '11:00 AM',
    address: '321 Hill St, Jaffna',
    status: 'cancel',
    reason: 'Customer not available',
    details: 'Bedroom painting.',
    amount: '',
  },
];

const ServiceBooking = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [viewModal, setViewModal] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [bookings, setBookings] = useState(sampleBookings);
  const [editForm, setEditForm] = useState({});

  const filtered = bookings.filter(b => b.status === activeTab);

  const handleEdit = () => {
    setEditForm(viewModal);
    setEditMode(true);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditSave = () => {
    setBookings((prev) => prev.map(b => b.id === editForm.id ? { ...editForm } : b));
    setViewModal({ ...editForm });
    setEditMode(false);
  };
  const handleEditCancel = () => {
    setEditMode(false);
    setViewModal(null);
  };

  return (
    <div className="service-booking-page">
      <h2 className="service-booking-title">Service Booking</h2>
      <div className="service-booking-tabs">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`service-booking-tab-btn${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="service-booking-table-container">
        <table className="service-booking-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Customer Name</th>
              {activeTab !== 'pending' && <th>Provider Name</th>}
              <th>Date</th>
              <th>Time</th>
              <th>Address</th>
              {activeTab === 'cancel' && <th>Reason</th>}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={activeTab === 'pending' ? 6 : activeTab === 'cancel' ? 8 : 7} style={{textAlign:'center',color:'#888',padding:'2rem 0'}}>No bookings found.</td></tr>
            ) : (
              filtered.map(b => (
                <tr key={b.id}>
                  <td>{b.service}</td>
                  <td>{b.customer}</td>
                  {activeTab !== 'pending' && <td>{b.provider}</td>}
                  <td>{b.date}</td>
                  <td>{b.time}</td>
                  <td>{b.address}</td>
                  {activeTab === 'cancel' && <td>{b.reason}</td>}
                  <td>
                    <button className="service-booking-view-btn" onClick={() => { setViewModal(b); setEditMode(false); }}>View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {viewModal && (
        <div className="service-booking-modal-overlay">
          <div className="service-booking-modal service-booking-edit-modal">
            {editMode ? (
              <>
                <div className="service-booking-edit-modal-header" style={{background:'#1a3665',color:'#fff',padding:'1.2rem 2rem',borderTopLeftRadius:'12px',borderTopRightRadius:'12px',fontSize:'2rem',fontWeight:800,margin:'-2.2rem -2.5rem 2.2rem -2.5rem'}}>Edit Booking</div>
                <form className="service-booking-edit-form-grid2col">
                  <label>Service
                    <input name="service" value={editForm.service} onChange={handleEditChange} placeholder="Service" />
                  </label>
                  <label>Customer Name
                    <input name="customer" value={editForm.customer} onChange={handleEditChange} placeholder="Customer Name" />
                  </label>
                  <label>Provider Name
                    <input name="provider" value={editForm.provider || ''} onChange={handleEditChange} placeholder="Provider Name" />
                  </label>
                  <label>Date
                    <input name="date" value={editForm.date} onChange={handleEditChange} placeholder="Date" />
                  </label>
                  <label>Time
                    <input name="time" value={editForm.time} onChange={handleEditChange} placeholder="Time" />
                  </label>
                  <label>Address
                    <input name="address" value={editForm.address} onChange={handleEditChange} placeholder="Address" />
                  </label>
                  {activeTab === 'cancel' && (
                    <label>Reason
                      <input name="reason" value={editForm.reason} onChange={handleEditChange} placeholder="Reason" />
                    </label>
                  )}
                  {activeTab === 'complete' && (
                    <label>Amount
                      <input name="amount" value={editForm.amount} onChange={handleEditChange} placeholder="Amount" />
                    </label>
                  )}
                  <label style={{gridColumn:'1/3'}}>Details
                    <input name="details" value={editForm.details} onChange={handleEditChange} placeholder="Details" />
                  </label>
                  <div className="service-booking-edit-btn-row" style={{gridColumn:'1/3',marginTop:'1.5rem'}}>
                    <button type="button" className="service-booking-edit-btn cancel" onClick={handleEditCancel}>Cancel</button>
                    <button type="button" className="service-booking-edit-btn save" onClick={handleEditSave}>Save</button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h3>Booking Details</h3>
                <div><b>Service:</b> {viewModal.service}</div>
                <div><b>Customer Name:</b> {viewModal.customer}</div>
                {activeTab !== 'pending' && <div><b>Provider Name:</b> {viewModal.provider}</div>}
                <div><b>Date:</b> {viewModal.date}</div>
                <div><b>Time:</b> {viewModal.time}</div>
                <div><b>Address:</b> {viewModal.address}</div>
                {activeTab === 'cancel' && <div><b>Reason:</b> {viewModal.reason}</div>}
                {activeTab === 'complete' && viewModal.amount && (
                  <div><b>Amount:</b> LKR {viewModal.amount}</div>
                )}
                <div><b>Details:</b> {viewModal.details}</div>
                <div style={{display:'flex',gap:'1rem',justifyContent:'flex-end',marginTop:'1.2rem'}}>
                  <button className="service-booking-modal-edit" onClick={handleEdit}>Edit</button>
                  <button className="service-booking-modal-close" onClick={() => setViewModal(null)}>Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceBooking; 