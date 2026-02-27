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

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      {loading && <div className="alert alert-info">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && leaderboard.length === 0 && (
        <div className="alert alert-warning">No leaderboard data found.</div>
      )}
      {!loading && !error && leaderboard.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Total Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => (
                <tr key={entry.id || idx}>
                  <td>{idx + 1}</td>
                  <td>{entry.user_name || entry.user || 'N/A'}</td>
                  <td>{entry.team_name || entry.team || 'N/A'}</td>
                  <td>{entry.total_points || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
