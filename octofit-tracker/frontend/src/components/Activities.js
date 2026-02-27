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
    <div className="container mt-4">
      <h2>Activities</h2>
      {loading && <div className="alert alert-info">Loading activities...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && activities.length === 0 && (
        <div className="alert alert-warning">No activities found.</div>
      )}
      {!loading && !error && activities.length > 0 && (
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
              {activities.map((activity, idx) => (
                <tr key={activity.id || idx}>
                  <td>{activity.id}</td>
                  <td>{activity.name || 'N/A'}</td>
                  <td>{activity.description || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Activities;
