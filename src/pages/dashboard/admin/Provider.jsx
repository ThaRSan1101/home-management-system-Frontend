import React, { useState, useEffect } from 'react';
import './Provider.css';
import { toast } from 'sonner';

const DISTRICTS = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 'Galle', 'Matara', 'Hambantota',
  'Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
  'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla', 'Monaragala', 'Ratnapura', 'Kegalle'
];

const STATUSES = ['Active', 'Inactive'];


const Provider = () => {
  // Filter state
  const [filterAddress, setFilterAddress] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDescription, setFilterDescription] = useState('');

  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [editModal, setEditModal] = useState(null); // provider object or null
  const [viewModal, setViewModal] = useState(null); // provider object or null
  const [editForm, setEditForm] = useState({});
  const [addModal, setAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    nic: '',
    description: '',
    qualification: '',
  });

  // Fetch providers from backend
  const fetchProviders = async () => {
    try {
      const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/get_providers.php');
      const result = await res.json();
      if (result.status === 'success') {
        setProviders(result.providers);
      } else {
        toast.error(result.message || 'Failed to fetch providers.');
      }
    } catch (err) {
      toast.error('Error fetching providers.');
    }
  };

  // Filtering logic
  useEffect(() => {
    let filtered = providers;
    if (filterAddress) {
      filtered = filtered.filter((p) => p.address === filterAddress);
    }
    if (filterStatus) {
      filtered = filtered.filter((p) => {
        if (filterStatus === 'Active') return p.status === 'active';
        if (filterStatus === 'Inactive') return p.status === 'inactive';
        return true;
      });
    }
    if (filterDescription) {
      filtered = filtered.filter((p) =>
        (p.description || '').toLowerCase().includes(filterDescription.toLowerCase())
      );
    }
    setFilteredProviders(filtered);
  }, [providers, filterAddress, filterStatus, filterDescription]);

  const handleResetFilters = () => {
    setFilterAddress('');
    setFilterStatus('');
    setFilterDescription('');
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const openEdit = (provider) => {
    setEditForm({ ...provider });
    setEditModal(provider);
  };
  const openView = (provider) => setViewModal(provider);
  const closeModals = () => { setEditModal(null); setViewModal(null); setAddModal(false); };
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  // Placeholder for edit save (not implemented)
  const handleEditSave = async () => {
    try {
      // Ensure correct field names for backend
      const payload = {
        user_id: editForm.user_id,
        provider_id: editForm.provider_id,
        name: editForm.name,
        email: editForm.email,
        phone_number: editForm.phone_number,
        address: editForm.address,
        nic: editForm.NIC,
        description: editForm.description,
        qualifications: editForm.qualifications,
        status: editForm.status,
        disable_status: !!editForm.disable_status ? 1 : 0
      };
      const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/update_provider_profile.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (result.status === 'success') {
        toast.success('Provider updated successfully.');
        fetchProviders();
      } else {
        toast.error(result.message || 'Failed to update provider.');
      }
    } catch (err) {
      toast.error('Error updating provider.');
    }
    closeModals();
  };
  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleAddProvider = async (e) => {
    e.preventDefault();
    if (!addForm.name || !addForm.email || !addForm.phone || !addForm.address || !addForm.nic) {
      toast.error('Please fill in all required fields.');
      return;
    }
    try {
      const res = await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/add_provider.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addForm)
      });
      const result = await res.json();
      if (result.status === 'success') {
        toast.success('Provider account created and email sent.');
        setAddForm({ name: '', email: '', phone: '', address: '', nic: '', description: '', qualification: '' });
        setAddModal(false);
        fetchProviders();
      } else {
        toast.error(result.message || 'Failed to add provider.');
        if (result.emailError) {
          toast.error('Email error: ' + result.emailError);
        }
      }
    } catch (err) {
      toast.error('Error adding provider.');
    }
  };

  // Inline styles for filter section
  const filterSectionStyle = {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    margin: '1.3rem 0 1.8rem 0',
    background: '#f4f8fb',
    borderRadius: '12px',
    padding: '1.1rem 2.2rem',
    boxShadow: '0 2px 12px rgba(26,54,101,0.07)',
    border: '1.5px solid #e0e7ef',
  };
  const filterGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
    minWidth: '160px',
  };
  const filterLabelStyle = {
    fontWeight: 600,
    color: '#1a3665',
    fontSize: '1.05rem',
  };
  const filterSelectStyle = {
    marginTop: '0.25rem',
    padding: '0.48rem 0.9rem',
    borderRadius: '7px',
    border: '1.5px solid #b6c5df',
    background: '#fff',
    color: '#1a3665',
    fontSize: '1.04rem',
    fontWeight: 500,
    outline: 'none',
    transition: 'border 0.18s',
  };
  const resetBtnStyle = {
    marginLeft: 'auto',
    padding: '0.48rem 1.3rem',
    background: '#1a3665',
    color: '#fff',
    fontWeight: 700,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.04rem',
    boxShadow: '0 1px 4px rgba(26,54,101,0.07)',
    transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
  };

  return (
    <div className="user-suggestion-wrapper">
      <h2 className="user-suggestion-heading">Provider Management</h2>
      <div className="provider-management-subtitle">Manage and review all registered Service Providers</div>
      <button className="add-provider-btn" onClick={() => setAddModal(true)}>Add New Provider</button>
      {/* Filter Controls (inline style) */}
      <div style={filterSectionStyle}>
        <div style={filterGroupStyle}>
          <label style={filterLabelStyle}>Address
            <select style={filterSelectStyle} value={filterAddress} onChange={e => setFilterAddress(e.target.value)}>
              <option value="">All Districts</option>
              {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </label>
        </div>
        <div style={filterGroupStyle}>
          <label style={filterLabelStyle}>Status
            <select style={filterSelectStyle} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">All</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
        </div>
        <div style={filterGroupStyle}>
          <label style={filterLabelStyle}>Description
            <input
              type="text"
              style={{
                marginTop: '0.25rem',
                padding: '0.48rem 0.9rem',
                borderRadius: '7px',
                border: '1.5px solid #b6c5df',
                background: '#fff',
                color: '#1a3665',
                fontSize: '1.04rem',
                fontWeight: 500,
                outline: 'none',
                transition: 'border 0.18s',
              }}
              placeholder="Search description..."
              value={filterDescription}
              onChange={e => setFilterDescription(e.target.value)}
            />
          </label>
        </div>
        <button style={resetBtnStyle} onClick={handleResetFilters}>Reset Filters</button>
      </div> 
      <div className="user-suggestion-table-container">
        <table className="user-suggestion-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>District</th>
              <th>NIC</th>
              <th>Description</th>
              <th>Status</th>
              <th>Disable Status</th>
              <th>Action</th>
            </tr> 
          </thead>
          <tbody>
            {filteredProviders.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', color: '#888', padding: '2rem 0' }}>
                  No providers found.
                </td>
              </tr>
            ) : (
              filteredProviders.map((p) => (
                <tr key={p.provider_id}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.phone_number}</td>
                  <td>{p.address}</td>
                  <td>{p.NIC}</td>
                  <td>{p.description || '-'}</td>
                  <td>{p.status === 'active' ? 'Active' : 'Inactive'}</td>
                  <td>{p.disable_status ? 'Disabled' : 'Active'}</td>
                  <td>
                    <div className="provider-action-btn-group">
                      <button className="provider-action-btn edit-btn" onClick={() => openEdit(p)}>Edit</button>
                      <button className="provider-action-btn view-btn" onClick={() => openView(p)}>View</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Provider Modal */}
      {addModal && (
        <div className="provider-modal-overlay">
          <div className="provider-modal add-provider-modal">
            <div className="provider-modal-title">Add New Provider</div>
            <form className="provider-modal-form-grid" onSubmit={handleAddProvider}>
              <div className="provider-modal-form-group">
                <label>Name
                  <input name="name" value={addForm.name} onChange={handleAddChange} placeholder="Full Name" type="text" required />
                </label>
              </div>
              <div className="provider-modal-form-group">
                <label>Email
                  <input name="email" value={addForm.email} onChange={handleAddChange} placeholder="E-mail Address" type="email" required />
                </label>
              </div>

              <div className="provider-modal-form-group">
                <label>Phone Number
                  <input name="phone" value={addForm.phone} onChange={handleAddChange} placeholder="Phone Number" type="text" required />
                </label>
              </div>
              <div className="provider-modal-form-group">
                <label>District
                  <input name="address" value={addForm.address} onChange={handleAddChange} placeholder="Address" type="text" required />
                </label>
              </div>
              <div className="provider-modal-form-group">
                <label>NIC
                  <input name="nic" value={addForm.nic} onChange={handleAddChange} placeholder="NIC" type="text" required />
                </label>
              </div>
              <div className="provider-modal-form-group">
                <label>Description
                  <input name="description" value={addForm.description} onChange={handleAddChange} placeholder="Description" type="text" />
                </label>
              </div>
              <div className="provider-modal-form-group">
                <label>Qualification
                  <input name="qualification" value={addForm.qualification} onChange={handleAddChange} placeholder="Qualification" type="text" />
                </label>

              </div>
              <div className="provider-modal-actions">
                <button type="button" onClick={closeModals}>Cancel</button>
                <button type="submit">Add</button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="provider-modal-overlay">
          <div className="provider-modal">
            <div className="provider-modal-title">Edit Provider</div>
            <form className="provider-modal-form-grid">
              <div className="provider-modal-form-group">
                <label>Name
                  <input name="name" value={editForm.name} onChange={handleEditChange} placeholder="Full Name" type="text" />
                </label>
              </div>
              <div className="provider-modal-form-group">
                <label>Email
                  <input name="email" value={editForm.email} onChange={handleEditChange} placeholder="E-mail Address" type="text" />
                </label>
              </div>
              <div className="provider-modal-form-group">
                <label>Phone Number
                  <input name="phone_number" value={editForm.phone_number} onChange={handleEditChange} placeholder="Phone Number" type="text" />
                </label>
              </div>
              <div className="provider-modal-form-group">
                <label>District
                  <input name="address" value={editForm.address} onChange={handleEditChange} placeholder="Address" type="text" />
                </label>
              </div>
              <div className="provider-modal-form-group">
                <label>NIC
                  <input name="NIC" value={editForm.NIC} onChange={handleEditChange} placeholder="NIC" type="text" />
                </label>
              </div>
              <div className="provider-modal-form-group">
                <label>Description
                  <input name="description" value={editForm.description || ''} onChange={handleEditChange} placeholder="Description" type="text" />
                </label>
              </div>
              <div className="provider-modal-form-group">
                <label>Qualification
                  <input name="qualifications" value={editForm.qualifications || ''} onChange={handleEditChange} placeholder="Qualification" type="text" />
                </label>
              </div>
              <div className="provider-modal-form-group">
                <label>
                  Disable Status
                  <input name="disable_status" type="checkbox" checked={!!editForm.disable_status} onChange={handleEditChange} />
                </label>
            </div>
            </form>
            <div className="provider-modal-actions">
              <button onClick={closeModals}>Cancel</button>
              <button onClick={handleEditSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModal && (
        <div className="provider-modal-overlay">
          <div className="provider-modal">
            <div className="provider-modal-title">Provider Details</div>
            <button className="provider-modal-close" onClick={closeModals} title="Close">&times;</button>
            <div className="provider-modal-details">
              <div><b>Name:</b> {viewModal.name}</div>
              <div><b>Email:</b> {viewModal.email}</div>
              <div><b>Phone:</b> {viewModal.phone_number}</div>
              <div><b>District:</b> {viewModal.address}</div>
              <div><b>NIC:</b> {viewModal.NIC}</div>
              <div><b>Status:</b> {viewModal.status === 'active' ? 'Active' : 'Inactive'}</div>
              <div><b>Registered Date:</b> {viewModal.registered_date ? viewModal.registered_date.substring(0, 10) : ''}</div>
              <div><b>Description:</b> {viewModal.description || '-'}</div>
              <div><b>Qualification:</b> {viewModal.qualifications || '-'}</div>
            </div>
            <div className="provider-modal-actions">
              <button onClick={closeModals}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Provider; 