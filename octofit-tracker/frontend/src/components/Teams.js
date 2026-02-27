import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('[Teams Component] Initializing component and fetching teams data...');
    const loadTeams = async () => {
      try {
        setLoading(true);
        console.log('[Teams Component] Calling API endpoint: /api/teams/');
        const data = await fetchFromAPI('teams');
        console.log('[Teams Component] Raw API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsArray = Array.isArray(data) ? data : (data.results || []);
        console.log('[Teams Component] Parsed teams array:', teamsArray);
        console.log('[Teams Component] Total teams count:', teamsArray.length);
        
        setTeams(teamsArray);
        setError(null);
      } catch (err) {
        console.error('[Teams Component] Failed to load teams:', err);
        setError(err.message);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };
    loadTeams();
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-0">
            <i className="bi bi-people-fill"></i> Teams
          </h2>
          <p className="text-muted mt-2">Create and manage teams for group challenges</p>
        </div>
      </div>

      {loading && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <strong>Loading teams...</strong> Please wait while we fetch the data.
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      )}

      {!loading && !error && teams.length === 0 && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>No teams found.</strong> There are currently no teams to display.
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      )}

      {!loading && !error && teams.length > 0 && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-gradient">
            <h5 className="mb-0">All Teams ({teams.length})</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th className="col-1">#</th>
                  <th className="col-3">Team Name</th>
                  <th className="col-8">Description</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, idx) => (
                  <tr key={team.id || idx} className="align-middle">
                    <td>
                      <span className="badge bg-primary rounded-pill">{team.id}</span>
                    </td>
                    <td>
                      <strong>{team.name || 'N/A'}</strong>
                    </td>
                    <td>
                      <span className="text-muted">{team.description || 'No description available'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-light text-end text-muted small">
            Showing {teams.length} team(s)
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
