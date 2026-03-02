import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../utils/api';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('[Activities Component] Initializing component and fetching activities data...');
    const loadActivities = async () => {
      try {
        setLoading(true);
        console.log('[Activities Component] Calling API endpoint: /api/activities/');
        const data = await fetchFromAPI('activities');
        console.log('[Activities Component] Raw API response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesArray = Array.isArray(data) ? data : (data.results || []);
        console.log('[Activities Component] Parsed activities array:', activitiesArray);
        console.log('[Activities Component] Total activities count:', activitiesArray.length);
        
        setActivities(activitiesArray);
        setError(null);
      } catch (err) {
        console.error('[Activities Component] Failed to load activities:', err);
        setError(err.message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };
    loadActivities();
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-0">
            <i className="bi bi-lightning-charge"></i> Activities
          </h2>
          <p className="text-muted mt-2">Browse and manage fitness activities</p>
        </div>
      </div>

      {loading && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <strong>Loading activities...</strong> Please wait while we fetch the data.
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      )}

      {!loading && !error && activities.length === 0 && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>No activities found.</strong> There are currently no activities to display.
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      )}

      {!loading && !error && activities.length > 0 && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-gradient">
            <h5 className="mb-0">All Activities ({activities.length})</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-dark">
                <tr>
                  <th className="col-1">#</th>
                  <th className="col-2">User</th>
                  <th className="col-2">Activity Type</th>
                  <th className="col-1">Duration (min)</th>
                  <th className="col-2">Calories Burned</th>
                  <th className="col-2">Date</th>
                  <th className="col-2">Team</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={activity.id || idx} className="align-middle">
                    <td>
                      <span className="badge bg-primary rounded-pill">{activity.id}</span>
                    </td>
                    <td>
                      <strong>{(activity.user && activity.user.username) || 'N/A'}</strong>
                    </td>
                    <td>
                      <span className="badge bg-info">{activity.activity_type || 'N/A'}</span>
                    </td>
                    <td>{activity.duration || 'N/A'}</td>
                    <td>{activity.calories_burned || 'N/A'}</td>
                    <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}</td>
                    <td>
                      <span className="badge bg-success">{(activity.team && activity.team.name) || 'No Team'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-light text-end text-muted small">
            Showing {activities.length} activity/activities
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
