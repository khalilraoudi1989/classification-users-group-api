import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AttachUserToGroups from './AttachUserToGroups';

const Users = () => {
  const pageSize = 20;

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users?itemsPerPage=${pageSize}&page=${currentPage}`);
        const userData = response.data['hydra:member'];
        const totalItems = response.data['hydra:totalItems'];

        if (Array.isArray(userData)) {
          setUsers(userData);
          setTotalPages(Math.ceil(totalItems / pageSize));
        } else {
          console.error('Invalid response format. Expected an array of users.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>User List</h2>
        <Link to="/user/add" style={{ marginLeft: '10px', padding: '10px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none' }}>
          Add User
        </Link>
      </div>

      {users.length > 0 ? (
        <div>
          <table style={{ width: '70%', margin: '0 auto', borderCollapse: 'collapse' }}>
            {/* Table Header */}
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>First Name</th>
                <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Last Name</th>
                <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Email</th>
                <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Type</th>
                <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Age</th>
                <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Phone</th>
                <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {users.map((user) => {
                const userId = user['@id'] ? user['@id'].split('/').pop() : 'defaultUserId';
                return (
                  <tr key={userId} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{user.firstName}</td>
                    <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{user.lastName}</td>
                    <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{user.email}</td>
                    <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{user.type}</td>
                    <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{user.age}</td>
                    <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{user.phone}</td>
                    <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                      <Link
                        to={`/users/${userId}/attach-to-groups`}
                        onClick={() => handleUserClick(userId)}
                        style={{ textDecoration: 'none', marginRight: '5px', color: '#007bff', display: 'inline-block' }}
                      >
                        <i className="fas fa-users"></i> Attach To Groups
                      </Link>
                      <Link
                        to={`/user/show/${userId}`}
                        style={{ textDecoration: 'none', marginRight: '5px', color: '#007bff', display: 'inline-block' }}
                      >
                        <i className="fas fa-eye"></i> Show
                      </Link>
                      <Link
                        to={`/user/edit/${userId}`}
                        style={{ textDecoration: 'none', marginRight: '5px', color: '#007bff', display: 'inline-block' }}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </Link>
                      <Link
                        to={`/user/delete/${userId}`}
                        style={{ textDecoration: 'none', marginRight: '5px', color: 'red', display: 'inline-block' }}
                      >
                        <i className="fas fa-trash-alt"></i> Delete
                      </Link>
                    </td>


                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Pagination */}
          <div style={{ marginTop: '20px' }}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index + 1} onClick={() => handlePageChange(index + 1)} style={{ margin: '5px', padding: '5px', cursor: 'pointer', backgroundColor: currentPage === index + 1 ? '#28a745' : '#007bff', color: 'white', border: 'none' }}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p>No users available</p>
      )}
      {selectedUserId !== null && (
      
      <AttachUserToGroups
        userId={selectedUserId}
        onAttachSuccess={() => {
          // Handle success, e.g., show a success message or update the user list
          console.log('User attached to groups successfully');
          setSuccessMessage('User attached to groups successfully');
          setErrorMessage(null); // Reset error message
          setSelectedUserId(null); // Reset selectedUserId
        }}
        onAttachError={(error) => {
          // Handle error, e.g., show an error message
          console.error('Error attaching user to groups:', error);
          setErrorMessage('Error attaching user to groups');
          setSuccessMessage(null); // Reset success message
        }}
      />
    )}
    </div>
  );
};

export default Users;
