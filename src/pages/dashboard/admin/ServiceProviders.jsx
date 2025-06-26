import React, { useState } from 'react';
import './ServiceProviders.css';

const ServiceProviders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedService, setSelectedService] = useState('all');

  const providers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 234 567 8900',
      service: 'Plumbing',
      status: 'active',
      rating: 4.8,
      totalJobs: 156,
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 234 567 8901',
      service: 'Electrical',
      status: 'pending',
      rating: 0,
      totalJobs: 0,
      joinDate: '2024-02-01'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.w@example.com',
      phone: '+1 234 567 8902',
      service: 'Cleaning',
      status: 'active',
      rating: 4.5,
      totalJobs: 89,
      joinDate: '2024-01-20'
    },
    {
      id: 4,
      name: 'Emily Brown',
      email: 'emily.b@example.com',
      phone: '+1 234 567 8903',
      service: 'Painting',
      status: 'inactive',
      rating: 4.2,
      totalJobs: 45,
      joinDate: '2024-01-10'
    }
  ];

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || provider.status === selectedStatus;
    const matchesService = selectedService === 'all' || provider.service === selectedService;
    return matchesSearch && matchesStatus && matchesService;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleServiceFilter = (e) => {
    setSelectedService(e.target.value);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'status-badge active';
      case 'inactive':
        return 'status-badge inactive';
      case 'pending':
        return 'status-badge pending';
      default:
        return 'status-badge';
    }
  };

  const handleStatusChange = (providerId, newStatus) => {
    // In a real application, this would make an API call to update the status
  };

  return (
    <div className="service-providers-page">
      <div className="providers-header">
        <h1>Service Providers</h1>
        <div className="providers-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search providers..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="filter-box">
            <select value={selectedStatus} onChange={handleStatusFilter}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="filter-box">
            <select value={selectedService} onChange={handleServiceFilter}>
              <option value="all">All Services</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Painting">Painting</option>
            </select>
          </div>
          <button className="add-provider-btn">Add New Provider</button>
        </div>
      </div>

      <div className="providers-table-container">
        <table className="providers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Service</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Total Jobs</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProviders.map(provider => (
              <tr key={provider.id}>
                <td>{provider.name}</td>
                <td>
                  <div className="contact-info">
                    <div>{provider.email}</div>
                    <div>{provider.phone}</div>
                  </div>
                </td>
                <td>
                  <span className="service-badge">
                    {provider.service}
                  </span>
                </td>
                <td>
                  <span className={getStatusBadgeClass(provider.status)}>
                    {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                  </span>
                </td>
                <td>
                  {provider.rating > 0 ? (
                    <div className="rating">
                      <span className="rating-value">{provider.rating}</span>
                      <span className="rating-star">★</span>
                    </div>
                  ) : (
                    <span className="no-rating">No ratings</span>
                  )}
                </td>
                <td>{provider.totalJobs}</td>
                <td>{provider.joinDate}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn view"
                      onClick={() => console.log(`View provider ${provider.id}`)}
                    >
                      View
                    </button>
                    <button 
                      className="action-btn edit"
                      onClick={() => console.log(`Edit provider ${provider.id}`)}
                    >
                      Edit
                    </button>
                    <select
                      className="status-select"
                      value={provider.status}
                      onChange={(e) => handleStatusChange(provider.id, e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceProviders; 