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
    <div className="container mt-4">
      <h2>Teams</h2>
      {loading && <div className="alert alert-info">Loading teams...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && teams.length === 0 && (
        <div className="alert alert-warning">No teams found.</div>
      )}
      {!loading && !error && teams.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={team.id || idx}>
                  <td>{team.id}</td>
                  <td>{team.name || 'N/A'}</td>
                  <td>{team.description || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Teams;
