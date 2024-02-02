import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const GroupDetails = () => {
  const { groupId } = useParams();
  const history = useNavigate();

  const [groupData, setGroupData] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/groups/${groupId}`);
        setGroupData(response.data);
      } catch (error) {
        console.error('Error fetching group data:', error);
        setErrorMessage('Error fetching group data');
      } finally {
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [groupId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/groups/${groupId}`, {
        headers: {
          'Accept': 'application/ld+json',
        },
      });

      setSuccessMessage('Le Group a été supprimé avec succès!');
      // Redirect to user list or any other page after successful delete
      history('/groups');
    } catch (error) {
      console.error('Error deleting group:', error);
      setErrorMessage('Error deleting group');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Group Details</h2>
      <p>{groupData.name} {groupData.description}</p>
      <p>Created Date: {groupData.createdDate}</p>
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

export default GroupDetails;
