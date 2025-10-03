import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users when component mounts
  useEffect(() => {
    axios.get('/api/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch users:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div>
      <h2>Registered Users</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>
            {u.name} - {u.email} ({u.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
