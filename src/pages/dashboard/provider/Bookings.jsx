import React, { useState } from 'react';
import './Bookings.css';

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  const bookings = [
    {
      id: 1,
      serviceName: 'House Cleaning',
      customerName: 'John Doe',
      customerPhone: '+1 234-567-8901',
      customerEmail: 'john@example.com',
      date: '2024-03-20',
      time: '14:00',
      duration: '2 hours',
      price: 150,
      status: 'completed',
      rating: 5,
      address: '123 Main St, City, State'
    },
    {
      id: 2,
      serviceName: 'Plumbing Service',
      customerName: 'Jane Smith',
      customerPhone: '+1 234-567-8902',
      customerEmail: 'jane@example.com',
      date: '2024-03-21',
      time: '10:00',
      duration: '3 hours',
      price: 200,
      status: 'pending',
      rating: null,
      address: '456 Oak Ave, City, State'
    },
    {
      id: 3,
      serviceName: 'Electrical Repair',
      customerName: 'Mike Johnson',
      customerPhone: '+1 234-567-8903',
      customerEmail: 'mike@example.com',
      date: '2024-03-22',
      time: '15:30',
      duration: '1.5 hours',
      price: 120,
      status: 'in-progress',
      rating: null,
      address: '789 Pine Rd, City, State'
    }
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleServiceFilter = (e) => {
    setServiceFilter(e.target.value);
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesService = serviceFilter === 'all' || booking.serviceName === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  const renderRating = (rating) => {
    if (!rating) return 'Not rated yet';
    return '⭐'.repeat(rating);
  };

  return (
    <div className="bookings-page">
      <div className="bookings-header">
        <h2>Service Bookings</h2>
        <div className="bookings-filters">
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={serviceFilter}
            onChange={handleServiceFilter}
            className="filter-select"
          >
            <option value="all">All Services</option>
            <option value="House Cleaning">House Cleaning</option>
            <option value="Plumbing Service">Plumbing Service</option>
            <option value="Electrical Repair">Electrical Repair</option>
          </select>
        </div>
      </div>

      <div className="bookings-table-container">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Customer</th>
              <th>Contact</th>
              <th>Date & Time</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.serviceName}</td>
                <td>{booking.customerName}</td>
                <td>
                  <div className="contact-info">
                    <p>{booking.customerPhone}</p>
                    <p>{booking.customerEmail}</p>
                  </div>
                </td>
                <td>
                  <div className="datetime-info">
                    <p>{booking.date}</p>
                    <p>{booking.time}</p>
                  </div>
                </td>
                <td>{booking.duration}</td>
                <td>${booking.price}</td>
                <td>
                  <span className={`status-badge ${booking.status}`}>
                    {booking.status}
                  </span>
                </td>
                <td>{renderRating(booking.rating)}</td>
                <td>
                  <div className="action-buttons">
                    <button className="view-btn">View Details</button>
                    {booking.status === 'completed' && !booking.rating && (
                      <button className="rate-btn">Rate Customer</button>
                    )}
                    {booking.status === 'pending' && (
                      <button className="contact-btn">Contact Customer</button>
                    )}
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

export default Bookings; 