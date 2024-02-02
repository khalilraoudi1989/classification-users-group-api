import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Groups = () => {
  const pageSize = 20;

  const [groups, setGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/groups?itemsPerPage=${pageSize}&page=${currentPage}`);
        const GroupData = response.data['hydra:member'];
        const totalItems = response.data['hydra:totalItems'];

        if (Array.isArray(GroupData)) {
          setGroups(GroupData);
          setTotalPages(Math.ceil(totalItems / pageSize));
        } else {
          console.error('Invalid response format. Expected an array of groups.');
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>Group List</h2>
        <Link to="/group/add" style={{ marginLeft: '10px', padding: '10px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none' }}>
          Add Group
        </Link>
      </div>

      {groups.length > 0 ? (
        <div>
          <table style={{ width: '70%', margin: '0 auto', borderCollapse: 'collapse' }}>
            {/* Table Header */}
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Name</th>
                <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Description</th>
                <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {groups.map((group) => {
                const groupId = group['@id'] ? group['@id'].split('/').pop() : 'defaultGroupId';
                return (
                  <tr key={groupId} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{group.name}</td>
                    <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{group.description}</td>
                    <Link
                        to={`/group/edit/${groupId}`}
                        style={{ textDecoration: 'none', marginRight: '5px', color: '#007bff', display: 'inline-block' }}
                      >
                        <i className="fas fa-edit"></i> Edit
                    </Link>
                    <Link
                        to={`/group/show/${groupId}`}
                        style={{ textDecoration: 'none', marginRight: '5px', color: '#007bff', display: 'inline-block' }}
                      >
                        <i className="fas fa-eye"></i> Show
                      </Link>
                      <Link
                        to={`/group/delete/${groupId}`}
                        style={{ textDecoration: 'none', marginRight: '5px', color: 'red', display: 'inline-block' }}
                      >
                        <i className="fas fa-trash-alt"></i> Delete
                      </Link>
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
        <p>No groups available</p>
      )}
      
    </div>
  );
};

export default Groups;
