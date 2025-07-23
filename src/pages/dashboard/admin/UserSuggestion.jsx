import React, { useEffect, useState } from 'react';
import './UserSuggestion.css';

const UserSuggestion = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost/project-root/backend/home-management-system-Backend/api/admin_messages.php')
      .then(res => res.json())
      .then(data => setSuggestions(data.messages || []))
      .catch(() => setSuggestions([]));
  }, []);

  return (
    <div className="user-suggestion-wrapper">
      <h2 className="user-suggestion-heading">User Suggestion</h2>
      <div className="user-suggestion-table-container">
        <table className="user-suggestion-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {suggestions.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: '#888', padding: '2rem 0' }}>
                  No suggestions found.
                </td>
              </tr>
            ) : (
              suggestions.map((s, i) => (
                <tr key={i}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.phone_number}</td>
                  <td>{s.subject}</td>
                  <td>{s.message}</td>
                  <td>{s.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserSuggestion;