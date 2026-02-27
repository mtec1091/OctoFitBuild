/**
 * API Utility Functions
 * Centralized API calls with environment variable handling
 */

// Get the base API URL from codespace environment variable
const getBaseURL = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME || process.env.CODESPACE_NAME;
  console.log('[API] REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME);
  console.log('[API] CODESPACE_NAME:', process.env.CODESPACE_NAME);
  console.log('[API] Resolved codespace name:', codespace);
  
  if (!codespace) {
    console.warn('[API] CODESPACE_NAME environment variable not set. Using fallback URL: http://localhost:8000');
    return 'http://localhost:8000';
  }
  
  const baseURL = `https://${codespace}-8000.app.github.dev`;
  console.log('[API] Configured base URL:', baseURL);
  return baseURL;
};

/**
 * Fetch data from the REST API endpoint
 * @param {string} endpoint - The API endpoint (e.g., 'activities', 'users', 'teams')
 * @returns {Promise<Array>} Array of data from the API
 */
export const fetchFromAPI = async (endpoint) => {
  const baseURL = getBaseURL();
  const fullURL = `${baseURL}/api/${endpoint}/`;

  console.log(`[API] ========================================`);
  console.log(`[API] Fetching from endpoint: ${endpoint}`);
  console.log(`[API] Full REST API URL: ${fullURL}`);
  console.log(`[API] ========================================`);

  try {
    const response = await fetch(fullURL);

    console.log(`[API] Response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[API] Successfully fetched data from ${fullURL}`);
    console.log(`[API] Raw response data:`, data);
    console.log(`[API] Response is array:`, Array.isArray(data));
    console.log(`[API] Response has .results:`, data.hasOwnProperty('results'));

    // Handle both paginated response (.results) and plain array response
    const items = Array.isArray(data) ? data : (data.results || data);
    const itemCount = Array.isArray(items) ? items.length : 0;
    
    console.log(`[API] Parsed ${itemCount} items from ${endpoint}`);
    console.log(`[API] ========================================`);

    return items;
  } catch (error) {
    console.error(`[API] ======================================== `);
    console.error(`[API] Error fetching from ${fullURL}:`, error.message);
    console.error(`[API] Error details:`, error);
    console.error(`[API] ========================================`);
    throw error;
  }
};

/**
 * Get the base API URL for informational purposes
 * @returns {string} The base API URL
 */
export const getAPIBaseURL = () => {
  return getBaseURL();
};

const api = {
  fetchFromAPI,
  getAPIBaseURL,
};

export default api;
