/**
 * API Utility Functions
 * Centralized API calls with environment variable handling
 */

// Get the base API URL from codespace environment variable
const getBaseURL = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME || process.env.CODESPACE_NAME;
  if (!codespace) {
    console.warn('CODESPACE_NAME environment variable not set. Using fallback URL.');
    return 'http://localhost:8000';
  }
  return `https://${codespace}-8000.app.github.dev`;
};

/**
 * Fetch data from the REST API endpoint
 * @param {string} endpoint - The API endpoint (e.g., 'activities', 'users', 'teams')
 * @returns {Promise<Array>} Array of data from the API
 */
export const fetchFromAPI = async (endpoint) => {
  const baseURL = getBaseURL();
  const fullURL = `${baseURL}/api/${endpoint}/`;

  console.log(`[API] Fetching from endpoint: ${endpoint}`);
  console.log(`[API] Full URL: ${fullURL}`);

  try {
    const response = await fetch(fullURL);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[API] Successfully fetched data from /${endpoint}/`);
    console.log(`[API] Response data:`, data);

    // Handle both paginated response (.results) and plain array response
    const items = data.results || data;
    console.log(`[API] Parsed ${items.length} items from /${endpoint}/`);

    return items;
  } catch (error) {
    console.error(`[API] Error fetching from /${endpoint}/:`, error.message);
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

export default {
  fetchFromAPI,
  getAPIBaseURL,
};
