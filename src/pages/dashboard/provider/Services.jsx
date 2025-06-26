import React, { useState } from 'react';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Plumbing Repair',
      description: 'Professional plumbing repair services for your home',
      basePrice: 50,
      duration: '2 hours',
      category: 'Plumbing',
      status: 'active',
      totalBookings: 25,
      rating: 4.8
    },
    {
      id: 2,
      name: 'House Cleaning',
      description: 'Thorough cleaning services for your entire home',
      basePrice: 80,
      duration: '3 hours',
      category: 'Cleaning',
      status: 'active',
      totalBookings: 42,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Electrical Installation',
      description: 'Safe and professional electrical installation services',
      basePrice: 75,
      duration: '4 hours',
      category: 'Electrical',
      status: 'inactive',
      totalBookings: 15,
      rating: 4.7
    }
  ]);

  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    basePrice: '',
    duration: '',
    category: '',
    status: 'active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddService = () => {
    if (newService.name && newService.description && newService.basePrice && newService.duration && newService.category) {
      const service = {
        id: services.length + 1,
        ...newService,
        totalBookings: 0,
        rating: 0
      };
      setServices(prev => [...prev, service]);
      setNewService({
        name: '',
        description: '',
        basePrice: '',
        duration: '',
        category: '',
        status: 'active'
      });
      setIsAddingService(false);
    }
  };

  const handleStatusChange = (serviceId, newStatus) => {
    setServices(prev =>
      prev.map(service =>
        service.id === serviceId
          ? { ...service, status: newStatus }
          : service
      )
    );
  };

  const handleDeleteService = (serviceId) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
  };

  const categories = ['Plumbing', 'Cleaning', 'Electrical', 'Painting', 'Carpentry', 'Gardening'];

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>My Services</h1>
        <button 
          className="add-service-btn"
          onClick={() => setIsAddingService(true)}
        >
          Add New Service
        </button>
      </div>

      {isAddingService && (
        <div className="add-service-form">
          <h2>Add New Service</h2>
          <div className="form-group">
            <label>Service Name</label>
            <input
              type="text"
              name="name"
              value={newService.name}
              onChange={handleInputChange}
              placeholder="Enter service name"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={newService.description}
              onChange={handleInputChange}
              placeholder="Enter service description"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Base Price ($)</label>
              <input
                type="number"
                name="basePrice"
                value={newService.basePrice}
                onChange={handleInputChange}
                placeholder="Enter base price"
              />
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                value={newService.duration}
                onChange={handleInputChange}
                placeholder="e.g., 2 hours"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={newService.category}
              onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button className="save-btn" onClick={handleAddService}>
              Add Service
            </button>
            <button className="cancel-btn" onClick={() => setIsAddingService(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-header">
              <h3>{service.name}</h3>
              <span className={`status-badge ${service.status}`}>
                {service.status}
              </span>
            </div>
            <p className="service-description">{service.description}</p>
            <div className="service-details">
              <div className="detail-item">
                <span className="label">Base Price:</span>
                <span className="value">${service.basePrice}</span>
              </div>
              <div className="detail-item">
                <span className="label">Duration:</span>
                <span className="value">{service.duration}</span>
              </div>
              <div className="detail-item">
                <span className="label">Category:</span>
                <span className="value">{service.category}</span>
              </div>
              <div className="detail-item">
                <span className="label">Total Bookings:</span>
                <span className="value">{service.totalBookings}</span>
              </div>
              <div className="detail-item">
                <span className="label">Rating:</span>
                <span className="value">
                  {service.rating ? `${service.rating} ★` : 'No ratings yet'}
                </span>
              </div>
            </div>
            <div className="service-actions">
              <select
                className="status-select"
                value={service.status}
                onChange={(e) => handleStatusChange(service.id, e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button 
                className="delete-btn"
                onClick={() => handleDeleteService(service.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services; 