import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AttachUserToGroups = () => {
  const { userId } = useParams();
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/groups`);
        const groupData = response.data['hydra:member'];

        if (Array.isArray(groupData)) {
          setGroups(groupData);
        } else {
          console.error('Invalid response format. Expected an array of groups.');
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleGroupChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedGroups(selectedOptions);
  };

  const handleAttachClick = async () => {
    try {

      const response = await axios.post(`http://127.0.0.1:8000/api/users/${userId}/attach-to-groups`, {
        groupIds: selectedGroups,
      });
      setSuccessMessage('User attached to groups successfully');
      history('/users'); // Redirige vers /list après l'attachement réussi
  
    } catch (error) {
      setErrorMessage('Error deleting user');
      (`Error attaching user to groups: ${error.message}`);
      history('/users'); // Redirige vers /list après l'attachement échoué
    }
    };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Attach User to Groups</h3>
      <select multiple onChange={handleGroupChange} style={{ width: '200px', marginRight: '10px' }}>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
      <button onClick={handleAttachClick} style={{ padding: '5px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
        Attach
      </button>
    </div>
  );
};

export default AttachUserToGroups;
