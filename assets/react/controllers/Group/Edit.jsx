import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditGroup = () => {
  const { groupId } = useParams();

  const [groupData, setGroupData] = useState({});
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/groups/${groupId}`);
        const fetchedGroupData = response.data;

        setGroupData(fetchedGroupData);

        setFormData({
          name: fetchedGroupData.name,
          description: fetchedGroupData.description,
        });
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchGroupData();
  }, [groupId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use PATCH method to update the group data
      await axios.patch(`http://127.0.0.1:8000/api/groups/${groupId}`, formData, {
        headers: {
          'Content-Type': 'application/merge-patch+json',
          'accept': 'application/ld+json'
        },
      });

      setSuccessMessage('Le group a été modifié avec succès!');
    } catch (error) {
      console.error('Error editing group:', error);
      console.log('Response data:', error.response.data);
    }
  };

  return (
    <div style={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Modifier un group</h2>
      {successMessage && (
        <p style={{ color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>
          {successMessage}
        </p>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px', width: '100%' }}>
          <label htmlFor="description">Description :</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description || ''}
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

export default EditGroup;
