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
    <div className="container mt-5 mb-5">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-0">
            <i className="bi bi-heart-pulse"></i> Workouts
          </h2>
          <p className="text-muted mt-2">Access personalized workout suggestions and routines</p>
        </div>
      </div>

      {loading && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <strong>Loading workouts...</strong> Please wait while we fetch the data.
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      )}

      {!loading && !error && workouts.length === 0 && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>No workouts found.</strong> There are currently no workouts to display.
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      )}

      {!loading && !error && workouts.length > 0 && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-gradient">
            <h5 className="mb-0">All Workouts ({workouts.length})</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th className="col-1">#</th>
                  <th className="col-3">Workout Name</th>
                  <th className="col-3">Description</th>
                  <th className="col-2">Activity Type</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, idx) => (
                  <tr key={workout.id || idx} className="align-middle">
                    <td>
                      <span className="badge bg-primary rounded-pill">{workout.id}</span>
                    </td>
                    <td>
                      <strong>{workout.name || 'N/A'}</strong>
                    </td>
                    <td>
                      <span className="text-muted">{workout.description || 'No description available'}</span>
                    </td>
                    <td>
                      <span className="badge bg-info">{workout.activity_name || workout.activity || 'N/A'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-light text-end text-muted small">
            Showing {workouts.length} workout(s)
          </div>
        </div>
      )}
    </div>
  );
};

export default Workouts;
