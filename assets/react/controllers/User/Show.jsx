import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserShow = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchUserGroups = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}/groups`);
        setUserGroups(response.data);
      } catch (error) {
        console.error('Error fetching user groups:', error);
      }
    };

    fetchUserDetails();
    fetchUserGroups();
  }, [userId]);

  return (
    <div>
      <h2>User Details</h2>
      {userDetails ? (
        <div>
          <p>First Name: {userDetails.firstName}</p>
          <p>Last Name: {userDetails.lastName}</p>
          <p>Email: {userDetails.email}</p>
          <p>Type: {userDetails.type}</p>
          <p>Phone: {userDetails.phone}</p>

          {userGroups.length > 0 && (
            <div>
              <h3>Attached Groups</h3>
              <ul>
                {userGroups.map((group) => (
                  <li key={group.name}>{group.description}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserShow;
