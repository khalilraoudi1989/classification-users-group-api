import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GroupShow = () => {
  const { groupId } = useParams();
  const [groupDetails, setGroupDetails] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/groups/${groupId}`);
        setGroupDetails(response.data);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  return (
    <div>
      <h2>Group Details</h2>
      {groupDetails ? (
        <div>
          <p>Name: {groupDetails.name}</p>
          <p>Description: {groupDetails.description}</p>
          <p>Created Date: {groupDetails.createdDate}</p>
          <p>Updated Date: {groupDetails.updatedDate}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GroupShow;
