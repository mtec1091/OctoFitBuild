import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('[Users Component] Initializing component and fetching users data...');
    const loadUsers = async () => {
      try {
        setLoading(true);
        console.log('[Users Component] Calling API endpoint: /api/users/');
        const data = await fetchFromAPI('users');
        console.log('[Users Component] Raw API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersArray = Array.isArray(data) ? data : (data.results || []);
        console.log('[Users Component] Parsed users array:', usersArray);
        console.log('[Users Component] Total users count:', usersArray.length);
        
        setUsers(usersArray);
        setError(null);
      } catch (err) {
        console.error('[Users Component] Failed to load users:', err);
        setError(err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      {loading && <div className="alert alert-info">Loading users...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && users.length === 0 && (
        <div className="alert alert-warning">No users found.</div>
      )}
      {!loading && !error && users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id || idx}>
                  <td>{user.id}</td>
                  <td>{user.name || 'N/A'}</td>
                  <td>{user.email || 'N/A'}</td>
                  <td>{user.team_name || user.team || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
