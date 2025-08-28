import React, { useState, useEffect } from 'react';
import './ServiceBooking.css';
import { toast } from 'sonner';

const TABS = [
  { key: 'pending', label: 'Pending' },
  { key: 'waiting', label: 'Waiting' },
  { key: 'process', label: 'Processing' },
  { key: 'request', label: 'Request' },
  { key: 'complete', label: 'Complete' },
  { key: 'cancel', label: 'Cancel' },
];

const sampleBookings = [
  {
    id: 1,
    service: 'Plumbing',
    customer: 'John Doe',
    provider: 'Provider A',
    bookingDate: '2024-07-18',
    serviceDate: '2024-07-21',
    time: '10:00 AM',
    address: '123 Main St, Colombo',
    phone: '0771234567',
    status: 'pending',
    reason: '',
    details: 'Leaking pipe in kitchen.',
    amount: '2500',
  },
  {
    id: 2,
    service: 'Electrical',
    customer: 'Jane Smith',
    provider: 'Provider B',
    bookingDate: '2024-07-19',
    serviceDate: '2024-07-22',
    time: '2:00 PM',
    address: '456 Park Ave, Kandy',
    phone: '0779876543',
    status: 'process',
    reason: '',
    details: 'Install new ceiling fan.',
    amount: '3800',
  },
  {
    id: 3,
    service: 'Cleaning',
    customer: 'Bob Brown',
    provider: 'Provider C',
    bookingDate: '2024-07-17',
    serviceDate: '2024-07-20',
    time: '9:00 AM',
    address: '789 Lake Rd, Galle',
    phone: '0712345678',
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
    bookingDate: '2024-07-16',
    serviceDate: '2024-07-19',
    time: '11:00 AM',
    address: '321 Hill St, Jaffna',
    phone: '0754321987',
    status: 'cancel',
    reason: 'Customer not available',
    details: 'Bedroom painting.',
    amount: '3200',
  },
];

const DISTRICTS = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 'Galle', 'Matara', 'Hambantota',
  'Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
  'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla', 'Monaragala', 'Ratnapura', 'Kegalle'
];
const STATUSES = ['Active', 'Inactive'];

const ServiceBooking = () => {
  const [activeTab, setActiveTab] = useState('pending');

  // Expose a function to programmatically switch tabs
  const handleTabSwitch = (tabKey) => {
    setActiveTab(tabKey);
  };
  const [viewModal, setViewModal] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [editForm, setEditForm] = useState({});
  const [moveModal, setMoveModal] = useState(null);
  const [moveProvider, setMoveProvider] = useState('');

  // Fetch bookings from backend on mount
  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch(`http://localhost/project-root/backend/home-management-system-Backend/api/service_booking.php?status=${activeTab}`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (data.status === 'success') {
          const mapped = (data.data || []).map(b => ({
            id: b.service_book_id,
            service: b.service_name || 'Service',
            customer: b.customer_name || '',
            provider: b.provider_name || '',
            bookingDate: b.serbooking_date,
            serviceDate: b.service_date,
            time: b.service_time,
            address: b.service_address,
            phone: b.phoneNo || b.customer_phone || '',
            amount: b.amount,
            serviceAmount: b.service_amount,
            status: b.serbooking_status,
            reason: b.cancel_reason || ''
          }));
          setBookings(mapped);
        } else {
          toast.error(data.message || 'Failed to fetch bookings.');
        }
      } catch (err) {
        toast.error('Network error.');
      }
    }
    fetchBookings();
  }, [activeTab]);

// Provider table/filter state for Move modal
  const [providerList, setProviderList] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDescription, setFilterDescription] = useState('');
  const [providerLoading, setProviderLoading] = useState(false);

  // Fetch providers on modal open
  useEffect(() => {
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
  useEffect(() => {
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

  const handleResetProviderFilters = () => {
    setFilterDistrict('');
    setFilterStatus('');
    setFilterDescription('');
  };

  const filtered = bookings.filter(b => {
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
{(activeTab === 'request' || activeTab === 'complete') && <th>Service Amount</th>}
              <th>Booking Date</th>
              <th>Service Date</th>
              <th>Time</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Amount</th>
              {activeTab === 'cancel' && <th>Reason</th>}
              {activeTab === 'pending' && <th>Action</th>}
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
{(activeTab === 'request' || activeTab === 'complete') && <td>{b.serviceAmount}</td>}
                  <td>{b.bookingDate}</td>
                  <td>{b.serviceDate}</td>
                  <td>{b.time}</td>
                  <td>{b.phone}</td>
                  <td>{b.address}</td>
                  <td>{b.amount}</td>
                  {activeTab === 'cancel' && <td>{b.reason}</td>}
                  {activeTab === 'pending' && (
  <td>
    <span style={{display:'flex',alignItems:'center'}}>
      {b.status !== 'waiting' ? (
        <>
          <button className="service-booking-move-btn" style={{marginLeft:'0.5rem'}} onClick={() => { setMoveModal(b); }}>Move</button>
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
                      {activeTab === 'pending' && <th>Action</th>}
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
            {/* Provider ID input */}
            <form className="customer-modal-form-grid" style={{marginTop:'0.5rem'}} onSubmit={async e => {
              e.preventDefault();
              if (!moveProvider) return toast.error('Please select a provider.');
              try {
                const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/service_booking.php', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
                  body: JSON.stringify({ action: 'move', service_book_id: moveModal.id, provider_id: moveProvider })
                });
                const data = await res.json();
                if (data.status === 'success') {
                  toast.success('Booking moved. Waiting for provider accept.');
                  setMoveModal(null);
                  setMoveProvider('');
                  handleTabSwitch('waiting'); // Switch to Waiting tab
                } else {
                  toast.error(data.message || 'Move failed.');
                }
              } catch (err) {
                toast.error('Network error.');
              }
            }}>
              <div className="customer-modal-form-group" style={{gridColumn:'1/-1'}}>
                <label>Enter Provider
                  <input type="text" value={moveProvider} onChange={e => setMoveProvider(e.target.value)} placeholder="Provider ID or Name" required />
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
                <div className="customer-modal-title">Edit Booking</div>
                <button className="customer-modal-close" onClick={handleEditCancel} title="Close">&times;</button>
                <form className="customer-modal-form-grid">
                  <div className="customer-modal-form-group">
                    <label> Service
                      <input name="service" value={editForm.service} onChange={handleEditChange} placeholder="Service" type="text" />
                    </label>
                  </div>
                  <div className="customer-modal-form-group">
                    <label> Customer Name
                      <input name="customer" value={editForm.customer} onChange={handleEditChange} placeholder="Customer Name" type="text" />
                    </label>
                  </div>
                  <div className="customer-modal-form-group">
                    <label> Provider Name
                      <input name="provider" value={editForm.provider || ''} onChange={handleEditChange} placeholder="Provider Name" type="text" />
                    </label>
                  </div>
                  <div className="customer-modal-form-group">
                    <label> Service Date
                      <input name="serviceDate" value={editForm.serviceDate} onChange={handleEditChange} placeholder="Service Date" type="date" />
                    </label>
                  </div>
                  <div className="customer-modal-form-group">
                    <label> Time
                      <input name="time" value={editForm.time} onChange={handleEditChange} placeholder="Time" type="text" />
                    </label>
                  </div>
                  <div className="customer-modal-form-group">
                    <label> Address
                      <input name="address" value={editForm.address} onChange={handleEditChange} placeholder="Address" type="text" />
                    </label>
                  </div>
                  {activeTab === 'cancel' && (
                    <div className="customer-modal-form-group">
                      <label> Reason
                        <input name="reason" value={editForm.reason} onChange={handleEditChange} placeholder="Reason" type="text" />
                      </label>
                    </div>
                  )}
                  {activeTab === 'complete' && (
                    <div className="customer-modal-form-group">
                      <label> Amount
                        <input name="amount" value={editForm.amount} onChange={handleEditChange} placeholder="Amount" type="text" />
                      </label>
                    </div>
                  )}
                  <div className="customer-modal-form-group" style={{gridColumn:'1/-1'}}>
                    <label> Details
                      <input name="details" value={editForm.details} onChange={handleEditChange} placeholder="Details" type="text" />
                    </label>
                  </div>
                </form>
                <div className="customer-modal-actions">
                  <button onClick={handleEditCancel}>Cancel</button>
                  <button onClick={handleEditSave}>Save</button>
                </div>
              </>
            ) : (
              <>
                <div className="customer-modal-title">Booking Details</div>
                <button className="customer-modal-close" onClick={() => setViewModal(null)} title="Close">&times;</button>
                <div className="customer-modal-details">
                  <div><b>Service:</b> {viewModal.service}</div>
                  <div><b>Customer Name:</b> {viewModal.customer}</div>
                  {activeTab !== 'pending' && <div><b>Provider Name:</b> {viewModal.provider}</div>}
                  <div><b>Booking Date:</b> {viewModal.bookingDate}</div>
                  <div><b>Service Date:</b> {viewModal.serviceDate}</div>
                  <div><b>Time:</b> {viewModal.time}</div>
                  <div><b>Phone:</b> {viewModal.phone}</div>
                  <div><b>Address:</b> {viewModal.address}</div>
                  <div><b>Amount:</b> LKR {viewModal.amount}</div>
                  {activeTab === 'cancel' && <div><b>Reason:</b> {viewModal.reason}</div>}
                  
                </div>
                <div className="customer-modal-actions">
                  {activeTab !== 'pending' && <button onClick={handleEdit}>Edit</button>}
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

export default ServiceBooking;