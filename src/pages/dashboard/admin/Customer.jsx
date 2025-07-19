import React, { useState } from 'react';
import './Customer.css';

const initialCustomers = [
  {
    id: 1,
    name: 'Alice Green',
    email: 'alice.green@example.com',
    password: 'customer123',
    phone: '0771234567',
    address: '12 Lake Rd, Colombo',
    nic: '920123456V',
    disabled: false,
    registered: '2024-05-20',
  },
  {
    id: 2,
    name: 'Bob Brown',
    email: 'bob.brown@example.com',
    password: 'customer456',
    phone: '0782345678',
    address: '34 Hill St, Galle',
    nic: '910987654V',
    disabled: true,
    registered: '2024-06-02',
  },
];

const Customer = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [editModal, setEditModal] = useState(null); // customer object or null
  const [viewModal, setViewModal] = useState(null); // customer object or null
  const [editForm, setEditForm] = useState({});

  const openEdit = (customer) => {
    setEditForm({ ...customer });
    setEditModal(customer);
  };
  const openView = (customer) => setViewModal(customer);
  const closeModals = () => { setEditModal(null); setViewModal(null); };
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleEditSave = () => {
    setCustomers((prev) => prev.map((c) => c.id === editForm.id ? { ...editForm } : c));
    closeModals();
  };

  return (
    <div>
      <div className="customer-management-header">
        <h1>Customer Management</h1>
        <p>Manage and review all registered customers</p>
      </div>
      <div className="customer-table-container">
        <table className="customer-table">
          <thead className="customer-table-header">
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
            {customers.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', color: '#888', padding: '2rem 0' }}>
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr className="customer-table-row" key={c.id}>
                  <td className="customer-table-cell">{c.name}</td>
                  <td className="customer-table-cell">{c.email}</td>
                  <td className="customer-table-cell">{c.password}</td>
                  <td className="customer-table-cell">{c.phone}</td>
                  <td className="customer-table-cell">{c.address}</td>
                  <td className="customer-table-cell">{c.nic}</td>
                  <td className="customer-table-cell">{c.disabled ? 'Disabled' : 'Active'}</td>
                  <td className="customer-table-cell">{c.registered}</td>
                  <td className="customer-table-cell">
                    <div className="customer-action-btn-group">
                      <button className="customer-action-btn edit-btn" onClick={() => openEdit(c)}>Edit</button>
                      <button className="customer-action-btn view-btn" onClick={() => openView(c)}>View</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className="customer-modal-overlay">
          <div className="customer-modal">
            <div className="customer-modal-title">Edit Customer</div>
            <button className="customer-modal-close" onClick={closeModals} title="Close">&times;</button>
            <div className="customer-modal-form">
              <label>Name: <input name="name" value={editForm.name} onChange={handleEditChange} /></label>
              <label>Email: <input name="email" value={editForm.email} onChange={handleEditChange} /></label>
              <label>Password: <input name="password" type="password" value={editForm.password || ''} onChange={handleEditChange} /></label>
              <label>Phone Number: <input name="phone" value={editForm.phone} onChange={handleEditChange} /></label>
              <label>Address: <input name="address" value={editForm.address} onChange={handleEditChange} /></label>
              <label>NIC: <input name="nic" value={editForm.nic} onChange={handleEditChange} /></label>
              <label>Disable Status: <input type="checkbox" name="disabled" checked={editForm.disabled} onChange={handleEditChange} /> Disabled</label>
              <label>Registered Date: <input name="registered" value={editForm.registered} onChange={handleEditChange} /></label>
            </div>
            <div className="customer-modal-actions">
              <button onClick={closeModals}>Cancel</button>
              <button onClick={handleEditSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModal && (
        <div className="customer-modal-overlay">
          <div className="customer-modal">
            <div className="customer-modal-title">Customer Details</div>
            <button className="customer-modal-close" onClick={closeModals} title="Close">&times;</button>
            <div className="customer-modal-details">
              <div><b>Name:</b> {viewModal.name}</div>
              <div><b>Email:</b> {viewModal.email}</div>
              <div><b>Password:</b> {viewModal.password}</div>
              <div><b>Phone Number:</b> {viewModal.phone}</div>
              <div><b>Address:</b> {viewModal.address}</div>
              <div><b>NIC:</b> {viewModal.nic}</div>
              <div><b>Disable Status:</b> {viewModal.disabled ? 'Disabled' : 'Active'}</div>
              <div><b>Registered Date:</b> {viewModal.registered}</div>
            </div>
            <div className="customer-modal-actions">
              <button onClick={closeModals}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer; 