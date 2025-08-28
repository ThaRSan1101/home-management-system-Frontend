import React, { useState } from 'react';
import './SubscriptionBooking.css';

const TABS = [
  { key: 'pending', label: 'Pending' },
  { key: 'waiting', label: 'Waiting' },
  { key: 'process', label: 'Processing' },
  { key: 'cancel', label: 'Cancel' },
];

// API integration: fetch bookings from backend
const API_URL = 'http://localhost/project-root/backend/home-management-system-Backend/api/subscription_booking.php';


import { toast } from 'sonner';

const DISTRICTS = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 'Galle', 'Matara', 'Hambantota',
  'Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
  'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla', 'Monaragala', 'Ratnapura', 'Kegalle'
];
const STATUSES = ['Active', 'Inactive'];

const SubscriptionBooking = () => {
  // Move modal state must be declared first so it's available to all hooks
  const [moveModal, setMoveModal] = useState(null);
  const [moveProvider, setMoveProvider] = useState('');

  // Provider table/filter state for Move modal
  const [providerList, setProviderList] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDescription, setFilterDescription] = useState('');
  const [providerLoading, setProviderLoading] = useState(false);

  // API state for bookings
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');

  // Expose a function to programmatically switch tabs
  const handleTabSwitch = (tabKey) => {
    setActiveTab(tabKey);
  };

  // Fetch bookings from API
  const fetchSubs = React.useCallback(() => {
    setLoading(true);
    setApiError(null);
    let status = activeTab;
    fetch(`${API_URL}?status=${status}`, { credentials: 'include' })
      .then(res => res.json())
      .then(result => {
        if (result.status === 'success') {
          // Map the API response to the expected format
          const mappedSubs = (result.data || []).map(sub => ({
            id: sub.subbook_id,
            plan: sub.plan_name || sub.category,
            customer: sub.customer_name,
            provider: sub.provider_name || 'Not Assigned',
            bookingDate: new Date(sub.subbooking_date).toLocaleDateString(),
            serviceDate: sub.sub_date,
            time: sub.sub_time,
            phone: sub.phoneNo,
            address: sub.sub_address,
            amount: sub.amount,
            status: sub.subbooking_status,
            reason: sub.cancel_reason
          }));
          setSubs(mappedSubs);
        } else {
          setApiError(result.message || 'Failed to fetch bookings.');
        }
        setLoading(false);
      })
      .catch(() => { setApiError('Error fetching bookings.'); setLoading(false); });
  }, [activeTab]);

  React.useEffect(() => { fetchSubs(); }, [fetchSubs]);

  // Fetch providers on modal open
  React.useEffect(() => {
    if (moveModal) {
      setProviderLoading(true);
      fetch('http://localhost/project-root/backend/home-management-system-Backend/api/get_providers.php', { credentials: 'include' })
        .then(res => res.json())
        .then(result => {
          if (result.status === 'success') {
            setProviderList(result.providers);
          } else {
            toast.error(result.message || 'Failed to fetch providers.');
          }
          setProviderLoading(false);
        })
        .catch(() => { toast.error('Error fetching providers.'); setProviderLoading(false); });
    }
  }, [moveModal]);

  // Filtering logic for provider table
  React.useEffect(() => {
    let filtered = providerList;
    if (filterDistrict) {
      filtered = filtered.filter((p) => p.address === filterDistrict);
    }
    if (filterStatus) {
      filtered = filtered.filter((p) => {
        if (filterStatus === 'Active') return p.status === 'active';
        if (filterStatus === 'Inactive') return p.status === 'inactive';
        return true;
      });
    }
    if (filterDescription) {
      filtered = filtered.filter((p) => (p.description || '').toLowerCase().includes(filterDescription.toLowerCase()));
    }
    setFilteredProviders(filtered);
  }, [providerList, filterDistrict, filterStatus, filterDescription]);

  // Reset filters handler
  const handleResetProviderFilters = () => {
    setFilterDistrict('');
    setFilterStatus('');
    setFilterDescription('');
  };

  const [viewModal, setViewModal] = useState(null);
  const [editMode, setEditMode] = useState(false);
  // Already declared above. Remove duplicate.
  const [editForm, setEditForm] = useState({});

  const filtered = subs.filter(b => {
    if (activeTab === 'pending') {
      return b.status === 'pending' || b.status === 'waiting';
    }
    if (activeTab === 'waiting') {
      return b.status === 'waiting';
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
  {activeTab === 'pending' && <th>Action</th>}
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
                  {activeTab === 'pending' && (
                    <td>
                      <span style={{display:'flex',alignItems:'center'}}>
                        {b.status !== 'waiting' ? (
                          <>
                            <button className="subscription-booking-move-btn" style={{marginLeft:'0.5rem'}} onClick={() => { setMoveModal(b); }}>Move</button>
                            <button className="subscription-booking-decline-btn" style={{marginLeft:'0.5rem', background:'#e74c3c', color:'#fff'}} onClick={async () => {
                              const reason = window.prompt('Enter reason for declining this booking:');
                              if (!reason) return;
                              try {
                                const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/subscription_booking.php', {
                                  method: 'PATCH',
                                  headers: { 'Content-Type': 'application/json' },
                                  credentials: 'include',
                                  body: JSON.stringify({ action: 'cancel', subbook_id: b.id, cancel_reason: reason })
                                });
                                const data = await res.json();
                                if (data.status === 'success') {
                                  toast.success('Booking declined and moved to cancel.');
                                  setActiveTab('cancel');
                                  fetchSubs();
                                } else {
                                  toast.error(data.message || 'Failed to decline booking.');
                                }
                              } catch (err) {
                                toast.error('Network error.');
                              }
                            }}>Decline</button>
                          </>
                        ) : (
                          <span style={{marginLeft:'0.7rem', color:'#1a3665', fontWeight:700}}>Waiting</span>
                        )}
                      </span>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {moveModal && (
        <div className="customer-modal-overlay">
          <div className="customer-modal" style={{minWidth:'350px',maxWidth:'1000px'}}>
            <div className="customer-modal-title">Move to the Provider</div>
            <button className="customer-modal-close" onClick={() => setMoveModal(null)} title="Close">&times;</button>
            {/* Provider Table & Filters */}
            <div className="service-booking-move-modal-content">
              {/* Filters */}
              {/*<div className="service-booking-move-modal-filters">
                <div className="service-booking-move-modal-filter-group">
                  <label className="service-booking-move-modal-label">District
                    <select className="service-booking-move-modal-select" value={filterDistrict} onChange={e => setFilterDistrict(e.target.value)}>
                      <option value="">All Districts</option>
                      {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </label>
                </div>
                <div className="service-booking-move-modal-filter-group" style={{minWidth:'120px'}}>
                  <label className="service-booking-move-modal-label">Status
                    <select className="service-booking-move-modal-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                      <option value="">All</option>
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                </div>
                <div className="service-booking-move-modal-filter-group" style={{minWidth:'160px'}}>
                  <label className="service-booking-move-modal-label">Description
                    <select className="service-booking-move-modal-input" value={filterDescription} onChange={e => setFilterDescription(e.target.value)}>
  <option value="">All Descriptions</option>
  <option value="plumbing">Plumbing</option>
  <option value="cleaning">Cleaning</option>
  <option value="carpentary">Carpentary</option>
  <option value="electricity">Electricity</option>
  <option value="electronic">Electronic</option>
  <option value="painting">Painting</option>
  <option value="vehicle wash">Vehicle Wash</option>
  <option value="deep cleaning">Deep Cleaning</option>
  <option value="utility check">Utility Check</option>
</select>
                  </label>*/}
                   <div className="service-booking-move-modal-filters">
                <div className="service-booking-move-modal-filter-group">
                  <label className="service-booking-move-modal-label">District
  <span style={{ marginLeft: '10px' }}>
    <select className="service-booking-move-modal-select" value={filterDistrict} onChange={e => setFilterDistrict(e.target.value)}>
      <option value="">All Districts</option>
      {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
    </select>
  </span>
</label>
                </div>
                <div className="service-booking-move-modal-filter-group" style={{minWidth:'120px'}}>
                  <label className="service-booking-move-modal-label">Status
  <span style={{ marginLeft: '10px' }}>
    <select className="service-booking-move-modal-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
      <option value="">All</option>
      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
    </select>
  </span>
</label>
                </div>
                <div className="service-booking-move-modal-filter-group" style={{minWidth:'160px'}}>
                  <label className="service-booking-move-modal-label">Description
  <span style={{ marginLeft: '10px' }}>
    <select className="service-booking-move-modal-input" value={filterDescription} onChange={e => setFilterDescription(e.target.value)}>
      <option value="">All Descriptions</option>
      <option value="plumbing">Plumbing</option>
      <option value="cleaning">Cleaning</option>
      <option value="carpentary">Carpentary</option>
      <option value="electricity">Electricity</option>
      <option value="electronic">Electronic</option>
      <option value="painting">Painting</option>
      <option value="vehicle wash">Vehicle Wash</option>
      <option value="deep cleaning">Deep Cleaning</option>
      <option value="utility check">Utility Check</option>
    </select>
  </span>
</label>
                </div>
                <button type="button" className="service-booking-move-modal-reset-btn" onClick={handleResetProviderFilters}>Reset</button>
              </div>
              {/* Provider Table */}
              <div className="service-booking-move-modal-provider-table-container">
                <table className="service-booking-move-modal-provider-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>District</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {providerLoading ? (
                      <tr><td colSpan={6} style={{textAlign:'center', color:'#888', padding:'1.2rem'}}>Loading...</td></tr>
                    ) : filteredProviders.length === 0 ? (
                      <tr><td colSpan={6} style={{textAlign:'center', color:'#888', padding:'1.2rem'}}>No providers found.</td></tr>
                    ) : (
                      filteredProviders.map(p => (
                        <tr key={p.provider_id}>
                          <td>{p.provider_id}</td>
                          <td>{p.name}</td>
                          <td>{p.description || '-'}</td>
                          <td>{p.status === 'active' ? 'Active' : 'Inactive'}</td>
                          <td>{p.address}</td>
                          <td>
                            <button type="button" className="service-booking-move-modal-select-btn" onClick={() => setMoveProvider(p.provider_id)}>Select</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Provider ID input and submit */}
            <form className="customer-modal-form-grid" style={{marginTop:'1.2rem'}} onSubmit={async (e) => {
              e.preventDefault();
              if (!moveProvider) {
                toast.error('Please select a provider');
                return;
              }
              
              try {
                const response = await fetch(`${API_URL}`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
                  body: JSON.stringify({
                    action: 'move',
                    subbook_id: moveModal.id,
                    provider_id: moveProvider
                  })
                });
                
                const result = await response.json();
                if (result.status === 'success') {
                  toast.success('Booking moved. Waiting for provider accept.');
                  fetchSubs(); // Refresh the data
                  setMoveModal(null);
                  setMoveProvider('');
                } else {
                  toast.error(result.message || 'Failed to move booking');
                }
              } catch (error) {
                toast.error('Network error occurred');
              }
            }}>
              <div className="customer-modal-form-group" style={{gridColumn:'1/-1'}}>
                <label>Provider ID
                  <input type="text" value={moveProvider} onChange={e => setMoveProvider(e.target.value)} placeholder="Provider ID" required />
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