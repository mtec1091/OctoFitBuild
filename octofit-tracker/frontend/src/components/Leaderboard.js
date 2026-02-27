import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/api';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('[Leaderboard Component] Initializing component and fetching leaderboard data...');
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        console.log('[Leaderboard Component] Calling API endpoint: /api/leaderboard/');
        const data = await fetchFromAPI('leaderboard');
        console.log('[Leaderboard Component] Raw API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardArray = Array.isArray(data) ? data : (data.results || []);
        console.log('[Leaderboard Component] Parsed leaderboard array:', leaderboardArray);
        console.log('[Leaderboard Component] Total leaderboard entries:', leaderboardArray.length);
        
        setLeaderboard(leaderboardArray);
        setError(null);
      } catch (err) {
        console.error('[Leaderboard Component] Failed to load leaderboard:', err);
        setError(err.message);
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };
    loadLeaderboard();
  }, []);

  const getMedalIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '🏆';
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-0">
            <i className="bi bi-trophy"></i> Leaderboard
          </h2>
          <p className="text-muted mt-2">See who's leading in the fitness challenge</p>
        </div>
      </div>

      {loading && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <strong>Loading leaderboard...</strong> Please wait while we fetch the data.
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      )}

      {!loading && !error && leaderboard.length === 0 && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>No leaderboard data found.</strong> There are currently no leaderboard entries to display.
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      )}

      {!loading && !error && leaderboard.length > 0 && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-gradient">
            <h5 className="mb-0">Top Performers ({leaderboard.length})</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th className="col-1" style={{width: '80px'}}>Rank</th>
                  <th className="col-3">User Name</th>
                  <th className="col-3">Team</th>
                  <th className="col-2">Total Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, idx) => {
                  const rank = idx + 1;
                  const medal = getMedalIcon(rank);
                  const userName = typeof entry.user === 'object' && entry.user
                    ? (entry.user.username || entry.user_name || 'N/A')
                    : (entry.user_name || entry.user || 'N/A');
                  const teamName = typeof entry.team === 'object' && entry.team
                    ? (entry.team.name || entry.team_name || 'No Team')
                    : (entry.team_name || entry.team || 'No Team');
                  return (
                    <tr key={entry.id || idx} className="align-middle">
                      <td>
                        <span style={{fontSize: '1.25rem'}}>{medal}</span>
                        <span className="badge bg-primary rounded-pill ms-2">{rank}</span>
                      </td>
                      <td>
                        <strong>{userName}</strong>
                      </td>
                      <td>
                        <span className="badge bg-success">{teamName}</span>
                      </td>
                      <td>
                        <span className="badge bg-warning text-dark fw-bold" style={{fontSize: '1rem'}}>
                          {entry.total_points || 0}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-light text-end text-muted small">
            Showing {leaderboard.length} leaderboard entry/entries
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
