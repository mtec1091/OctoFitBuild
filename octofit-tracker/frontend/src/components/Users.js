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
    <div className="container mt-5 mb-5">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-0">
            <i className="bi bi-people"></i> Users
          </h2>
          <p className="text-muted mt-2">Manage user profiles and track individual progress</p>
        </div>
      </div>

      {loading && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <strong>Loading users...</strong> Please wait while we fetch the data.
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>No users found.</strong> There are currently no users to display.
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-gradient">
            <h5 className="mb-0">All Users ({users.length})</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th className="col-1">#</th>
                  <th className="col-3">User Name</th>
                  <th className="col-4">Email</th>
                  <th className="col-4">Team</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.id || idx} className="align-middle">
                    <td>
                      <span className="badge bg-primary rounded-pill">{idx + 1}</span>
                    </td>
                    <td>
                      <strong>{user.username || 'N/A'}</strong>
                    </td>
                    <td>
                      <a href={`mailto:${user.email || ''}`} className="text-decoration-none">
                        {user.email || 'N/A'}
                      </a>
                    </td>
                    <td>
                      <span className="badge bg-secondary">Unassigned</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-light text-end text-muted small">
            Showing {users.length} user(s)
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
