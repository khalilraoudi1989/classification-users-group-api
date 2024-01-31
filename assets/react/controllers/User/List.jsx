import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users');
        const userData = response.data['hydra:member'];
        
        if (Array.isArray(userData)) {
          setUsers(userData);
        } else {
          console.error('Invalid response format. Expected an array of users.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user['@id']}>
              {/* Assuming user properties like firstName, lastName, email */}
              {user.firstName} {user.lastName} - {user.email}
            </li>
          ))
        ) : (
          <li>No users available</li>
        )}
      </ul>
      <Link to="/user/add" className="btn btn-success">Add User</Link>
    </div>
  );
};

export default Users;
