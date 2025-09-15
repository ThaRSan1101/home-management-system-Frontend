import React, { useState, useEffect } from 'react';
import './Customer.css';
import { toast, Toaster } from 'sonner';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [editModal, setEditModal] = useState(null); // customer object or null
  const [viewModal, setViewModal] = useState(null); // customer object or null
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch customers utility
  const fetchCustomers = () => {
    setLoading(true);
    fetch('http://localhost/project-root/backend/home-management-system-Backend/api/admin_customers.php', {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        if (data.status === 'success' && Array.isArray(data.data)) {
          const mapped = data.data.map(c => ({
            id: c.user_id,
            name: c.name,
            email: c.email,
            phone: c.phone_number,
            address: c.address,
            nic: c.NIC,
            disabled: !!c.disable_status,
            registered: c.registered_date ? c.registered_date.split('T')[0] : '',
          }));
          setCustomers(mapped);
        } else {
          setCustomers([]);
        }
        setLoading(false);
      })
      .catch(err => {
        setCustomers([]);
        setLoading(false);
        console.error('Failed to fetch customers:', err);
      });
  };

  // Toggle customer status (enable/disable)
  const toggleCustomerStatus = (customer) => {
    if (loading) return;
    
    const newStatus = customer.disabled ? 0 : 1;
    const action = customer.disabled ? 'enable' : 'disable';
    
    setLoading(true);
    fetch('http://localhost/project-root/backend/home-management-system-Backend/api/admin_update_customer.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        user_id: customer.id, 
        disable_status: newStatus 
      }),
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          toast.success(`Customer ${action}d successfully!`);
          fetchCustomers();
        } else {
          toast.error(data.message || `Failed to ${action} customer.`);
          setLoading(false);
        }
      })
      .catch(() => {
        toast.error('Network or server error.');
        setLoading(false);
      });
  };
  
  // Toggle customer status directly without confirmation
  const confirmToggleStatus = (customer) => {
    toggleCustomerStatus(customer);
  };

  // Mark only customer registration notifications as hidden when visiting customer page
  const markNotificationsAsHidden = async () => {
    try {
      await fetch('http://localhost/project-root/backend/home-management-system-Backend/api/notification.php?action=mark_customer_registration_hidden', {
        method: 'GET',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error marking customer registration notifications as hidden:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    markNotificationsAsHidden(); // Mark notifications as hidden when page loads
  }, []);

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
                  
                  <td className="customer-table-cell">{c.phone}</td>
                  <td className="customer-table-cell">{c.address}</td>
                  <td className="customer-table-cell">{c.nic}</td>
                  <td className="customer-table-cell">{c.disabled ? 'Disabled' : 'Active'}</td>
                  <td className="customer-table-cell">{c.registered}</td>
                  <td className="customer-table-cell">
                    <div className="customer-action-btn-group">
                      <button 
                        className={`customer-action-btn ${c.disabled ? 'enable-btn' : 'disable-btn'}`}
                        onClick={() => confirmToggleStatus(c)}
                        disabled={loading}
                      >
                        {c.disabled ? 'Enable' : 'Disable'}
                      </button>
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
            <form className="customer-modal-form-grid">
              <div className="customer-modal-form-group">
                <label> Name
                  <input name="name" value={editForm.name} onChange={handleEditChange} placeholder="First and Last Name" type="text" />
                </label>
              </div>
              <div className="customer-modal-form-group">
                <label> Email
                  <input name="email" value={editForm.email} onChange={handleEditChange} placeholder="E-mail Address" type="text" />
                </label>
              </div>
              
              <div className="customer-modal-form-group">
                <label> Phone Number
                  <input name="phone" value={editForm.phone} onChange={handleEditChange} placeholder="Phone Number" type="text" />
                </label>
              </div>
              <div className="customer-modal-form-group">
                <label> Address
                  <input name="address" value={editForm.address} onChange={handleEditChange} placeholder="Address" type="text" />
                </label>
              </div>
              <div className="customer-modal-form-group">
                <label> NIC
                  <input name="nic" value={editForm.nic} onChange={handleEditChange} placeholder="NIC" type="text" />
                </label>
              </div>
              <div className="customer-modal-form-group">
                <label>
                  <input 
                    type="checkbox" 
                    name="disabled" 
                    checked={editForm.disabled} 
                    onChange={handleEditChange} 
                    style={{marginRight:'0.5rem'}} 
                  />
                  Disable Account
                </label>
              </div>
            </form>
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
              
              <div><b>Phone Number:</b> {viewModal.phone}</div>
              <div><b>Address:</b> {viewModal.address}</div>
              <div><b>NIC:</b> {viewModal.nic}</div>
              <div><b>Status:</b> {viewModal.disabled ? 'Disabled' : 'Active'}</div>
              <div><b>Disable Status:</b> {viewModal.disabled ? 'Disabled' : 'Active'}</div>
              
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