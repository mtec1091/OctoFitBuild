import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/api';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('[Workouts Component] Initializing component and fetching workouts data...');
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        console.log('[Workouts Component] Calling API endpoint: /api/workouts/');
        const data = await fetchFromAPI('workouts');
        console.log('[Workouts Component] Raw API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsArray = Array.isArray(data) ? data : (data.results || []);
        console.log('[Workouts Component] Parsed workouts array:', workoutsArray);
        console.log('[Workouts Component] Total workouts count:', workoutsArray.length);
        
        setWorkouts(workoutsArray);
        setError(null);
      } catch (err) {
        console.error('[Workouts Component] Failed to load workouts:', err);
        setError(err.message);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };
    loadWorkouts();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      {loading && <div className="alert alert-info">Loading workouts...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && workouts.length === 0 && (
        <div className="alert alert-warning">No workouts found.</div>
      )}
      {!loading && !error && workouts.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={workout.id || idx}>
                  <td>{workout.id}</td>
                  <td>{workout.name || 'N/A'}</td>
                  <td>{workout.description || 'N/A'}</td>
                  <td>{workout.activity_name || workout.activity || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Workouts;
