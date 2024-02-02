import React, { useState } from 'react';
import axios from 'axios';

const Add = ({ onAddUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    type: '',
    password: '',
    phone: '',
    age: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const value = e.target.name === 'age' ? parseInt(e.target.value, 10) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requiredFields = [
        'firstName',
        'lastName',
        'email',
        'type',
        'password',
        'phone',
        'age',
      ];

      const hasEmptyFields = requiredFields.some((field) => !formData[field]);

      if (!hasEmptyFields) {
        const response = await axios.post('http://127.0.0.1:8000/api/users', formData, {
          headers: {
            'Content-Type': 'application/ld+json',
            'accept': 'application/ld+json'
          },
        });

        if (typeof onAddUser === 'function') {
          onAddUser(response.data);
        } else {
          console.error('onAddUser is not a function');
        }

        setSuccessMessage('The user has been successfully added!');

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          type: '',
          password: '',
          phone: '',
          age: '',
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
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        
        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>Add</button>
      </form>
    </div>
  );
};

export default Add;
