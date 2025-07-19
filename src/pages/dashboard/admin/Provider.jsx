import React, { useState } from 'react';
import './Provider.css';

const initialProviders = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'provider123',
    phone: '0712345678',
    address: '123 Main St, Colombo',
    nic: '901234567V',
    disabled: false,
    registered: '2024-06-01',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'provider456',
    phone: '0723456789',
    address: '456 Park Ave, Kandy',
    nic: '880123456V',
    disabled: true,
    registered: '2024-06-10',
  },
];

const Provider = () => {
  const [providers, setProviders] = useState(initialProviders);
  const [editModal, setEditModal] = useState(null); // provider object or null
  const [viewModal, setViewModal] = useState(null); // provider object or null
  const [editForm, setEditForm] = useState({});
  const [addModal, setAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    nic: '',
    disabled: false,
    registered: '',
  });

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
  const handleEditSave = () => {
    setProviders((prev) => prev.map((p) => p.id === editForm.id ? { ...editForm } : p));
    closeModals();
  };
  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleAddProvider = () => {
    if (!addForm.name || !addForm.email || !addForm.password) return;
    const newProvider = {
      ...addForm,
      id: Date.now(),
    };
    setProviders((prev) => [...prev, newProvider]);
    setAddForm({ name: '', email: '', password: '', phone: '', address: '', nic: '', disabled: false, registered: '' });
    setAddModal(false);
  };

  return (
    <div className="user-suggestion-wrapper">
      <h2 className="user-suggestion-heading">Provider Management</h2>
      <button className="add-provider-btn" onClick={() => setAddModal(true)}>Add New Provider</button>
      <div className="user-suggestion-table-container">
        <table className="user-suggestion-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>NIC</th>
              <th>Disable Status</th>
              <th>Registered Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {providers.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', color: '#888', padding: '2rem 0' }}>
                  No providers found.
                </td>
              </tr>
            ) : (
              providers.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.password}</td>
                  <td>{p.phone}</td>
                  <td>{p.address}</td>
                  <td>{p.nic}</td>
                  <td>{p.disabled ? 'Disabled' : 'Active'}</td>
                  <td>{p.registered}</td>
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
            <button className="provider-modal-close" onClick={closeModals} title="Close">&times;</button>
            <div className="provider-modal-form">
              <label>Name: <input name="name" value={addForm.name} onChange={handleAddChange} /></label>
              <label>Email: <input name="email" value={addForm.email} onChange={handleAddChange} /></label>
              <label>Password: <input name="password" type="password" value={addForm.password} onChange={handleAddChange} /></label>
              <label>Phone Number: <input name="phone" value={addForm.phone} onChange={handleAddChange} /></label>
              <label>Address: <input name="address" value={addForm.address} onChange={handleAddChange} /></label>
              <label>NIC: <input name="nic" value={addForm.nic} onChange={handleAddChange} /></label>
              <label>Disable Status: <input type="checkbox" name="disabled" checked={addForm.disabled} onChange={handleAddChange} /> Disabled</label>
              <label>Registered Date: <input name="registered" value={addForm.registered} onChange={handleAddChange} /></label>
            </div>
            <div className="provider-modal-actions">
              <button onClick={closeModals}>Cancel</button>
              <button onClick={handleAddProvider}>Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="provider-modal-overlay">
          <div className="provider-modal">
            <div className="provider-modal-title">Edit Provider</div>
            <button className="provider-modal-close" onClick={closeModals} title="Close">&times;</button>
            <div className="provider-modal-form">
              <label>Name: <input name="name" value={editForm.name} onChange={handleEditChange} /></label>
              <label>Email: <input name="email" value={editForm.email} onChange={handleEditChange} /></label>
              <label>Password: <input name="password" type="password" value={editForm.password || ''} onChange={handleEditChange} /></label>
              <label>Phone Number: <input name="phone" value={editForm.phone} onChange={handleEditChange} /></label>
              <label>Address: <input name="address" value={editForm.address} onChange={handleEditChange} /></label>
              <label>NIC: <input name="nic" value={editForm.nic} onChange={handleEditChange} /></label>
              <label>Disable Status: <input type="checkbox" name="disabled" checked={editForm.disabled} onChange={handleEditChange} /> Disabled</label>
              <label>Registered Date: <input name="registered" value={editForm.registered} onChange={handleEditChange} /></label>
            </div>
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
              <div><b>Password:</b> {viewModal.password}</div>
              <div><b>Phone Number:</b> {viewModal.phone}</div>
              <div><b>Address:</b> {viewModal.address}</div>
              <div><b>NIC:</b> {viewModal.nic}</div>
              <div><b>Disable Status:</b> {viewModal.disabled ? 'Disabled' : 'Active'}</div>
              <div><b>Registered Date:</b> {viewModal.registered}</div>
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