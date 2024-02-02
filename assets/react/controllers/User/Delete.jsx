import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const { userId } = useParams();
  const history = useNavigate();

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`, {
        headers: {
          'Accept': 'application/ld+json',
        },
      });

      setSuccessMessage('L\'utilisateur a été supprimé avec succès!');
      // Redirect to user list or any other page after successful delete
      history('/users');
    } catch (error) {
      console.error('Error deleting user:', error);
      setErrorMessage('Error deleting user');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>{userData.firstName} {userData.lastName}</p>
      <p>Email: {userData.email}</p>
      <p>Type: {userData.type}</p>
      <p>Created Date: {userData.createdDate}</p>
      <button
        style={{
          textDecoration: 'none',
          marginRight: '5px',
          color: '#dc3545',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={handleDelete}
      >
        Delete
      </button>
      {successMessage && <p style={{ color: 'green', fontWeight: 'bold' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>}
    </div>
  );
};

export default UserDetails;
