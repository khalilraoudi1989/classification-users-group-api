import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Add = ({ onAddGroup }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requiredFields = [
        'name',
        'description',
      ];

      const hasEmptyFields = requiredFields.some((field) => !formData[field]);

      if (!hasEmptyFields) {
        const response = await axios.post('http://127.0.0.1:8000/api/groups', formData, {
          headers: {
            'Content-Type': 'application/ld+json',
            'accept': 'application/ld+json'
          },
        });

        if (typeof onAddUser === 'function') {
          onAddGroup(response.data);
        } else {
          console.error('onAddGroup is not a function');
        }

        setSuccessMessage('The group has been successfully added!');

        setFormData({
          name: '',
          description: '',
        });
      } else {
        console.error('All required fields must be filled.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error status:', error.response.status);
        console.error('Error response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received from the server');
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  return (
    <div style={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Add a User</h2>
      {successMessage && (
        <p style={{ color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>
          {successMessage}
        </p>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>Add</button>
      </form>
    </div>
  );
};

export default Add;