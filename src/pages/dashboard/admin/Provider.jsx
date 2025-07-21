import React, { useState, useEffect } from 'react';
import './Provider.css';
import { toast } from 'sonner';

const Provider = () => {
  const [providers, setProviders] = useState([]);
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
  const handleEditSave = () => {
    toast.info('Edit provider functionality not implemented yet.');
    closeModals();
  };
  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleAddProvider = async (e) => {
    e.preventDefault();
    if (!addForm.name || !addForm.email || !addForm.password || !addForm.phone || !addForm.address || !addForm.nic) {
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
        setAddForm({ name: '', email: '', password: '', phone: '', address: '', nic: '', description: '', qualification: '' });
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

  return (
    <div className="user-suggestion-wrapper">
      <h2 className="user-suggestion-heading">Provider Management</h2>
      <div className="provider-management-subtitle">Manage and review all registered Service Providers</div>
      <button className="add-provider-btn" onClick={() => setAddModal(true)}>Add New Provider</button>
      <div className="user-suggestion-table-container">
        <table className="user-suggestion-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>NIC</th>
              <th>Status</th>
              <th>Registered Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {providers.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', color: '#888', padding: '2rem 0' }}>
                  No providers found.
                </td>
              </tr>
            ) : (
              providers.map((p) => (
                <tr key={p.provider_id}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.phone_number}</td>
                  <td>{p.address}</td>
                  <td>{p.NIC}</td>
                  <td>{p.status === 'active' ? 'Active' : 'Inactive'}</td>
                  <td>{p.registered_date ? p.registered_date.substring(0, 10) : ''}</td>
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
                <label>Password
                  <input name="password" type="password" value={addForm.password} onChange={handleAddChange} placeholder="Password" required />
                </label>
              </div>
              <div className="provider-modal-form-group">
                <label>Phone Number
                  <input name="phone" value={addForm.phone} onChange={handleAddChange} placeholder="Phone Number" type="text" required />
                </label>
              </div>
              <div className="provider-modal-form-group">
                <label>Address
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
                <label>Password
                  <input name="password" type="password" value={editForm.password || ''} onChange={handleEditChange} placeholder="Password" />
                </label>
              </div>
              <div className="provider-modal-form-group">
                <label>Phone Number
                  <input name="phone_number" value={editForm.phone_number} onChange={handleEditChange} placeholder="Phone Number" type="text" />
                </label>
              </div>
              <div className="provider-modal-form-group">
                <label>Address
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
              <div><b>Address:</b> {viewModal.address}</div>
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