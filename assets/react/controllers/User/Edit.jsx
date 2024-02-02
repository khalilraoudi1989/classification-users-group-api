import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditUser = () => {
  const { userId } = useParams();

  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
        const fetchedUserData = response.data;

        setUserData(fetchedUserData);

        setFormData({
          firstName: fetchedUserData.firstName,
          lastName: fetchedUserData.lastName,
          email: fetchedUserData.email,
          type: fetchedUserData.type,
          // Remove the password field
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use PATCH method to update the user data
      await axios.patch(`http://127.0.0.1:8000/api/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'application/merge-patch+json',
          'accept': 'application/ld+json'
        },
      });

      setSuccessMessage('L\'utilisateur a été modifié avec succès!');
    } catch (error) {
      console.error('Error editing user:', error);
      console.log('Response data:', error.response.data);
    }
  };

  return (
    <div style={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Modifier un utilisateur</h2>
      {successMessage && (
        <p style={{ color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>
          {successMessage}
        </p>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label htmlFor="firstName">Prénom :</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label htmlFor="lastName">Nom :</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label htmlFor="type">Type :</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type || ''}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>Modifier</button>
      </form>
    </div>
  );
};

export default EditUser;
