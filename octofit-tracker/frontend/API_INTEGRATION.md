# OctoFit Tracker Frontend - API Integration Guide

## Overview

The OctoFit Tracker frontend is a React application that connects to the Django REST Framework backend API running on port 8000. The app dynamically constructs the API URL based on the GitHub Codespace environment.

## Architecture

### API URL Construction

The frontend uses the `CODESPACE_NAME` environment variable to construct the backend API URL:

- **Codespaces**: `https://${CODESPACE_NAME}-8000.app.github.dev`
- **Local Development**: `http://localhost:8000` (fallback)

### Component Structure

```
src/
├── App.js                    # Main app with navigation and routing
├── index.js                  # React app entry point
├── components/
│   ├── Activities.js         # Activities list component
│   ├── Leaderboard.js        # Leaderboard component
│   ├── Teams.js              # Teams list component
│   ├── Users.js              # Users list component
│   └── Workouts.js           # Workouts list component
└── utils/
    └── api.js                # API utility functions
```

## API Integration Details

### API Utility (`utils/api.js`)

The API utility provides centralized functions for making REST API calls:

#### `getAPIBaseURL()`
Returns the base URL for the backend API.

```javascript
const baseURL = getAPIBaseURL();
// Returns: https://${CODESPACE_NAME}-8000.app.github.dev
// or: http://localhost:8000 (fallback)
```

#### `fetchFromAPI(endpoint)`
Fetches data from a specific API endpoint and handles both paginated and plain array responses.

```javascript
const users = await fetchFromAPI('users');
// Fetches from: https://${CODESPACE_NAME}-8000.app.github.dev/api/users/
```

**Supported Endpoints:**
- `users` → `/api/users/`
- `teams` → `/api/teams/`
- `activities` → `/api/activities/`
- `workouts` → `/api/workouts/`
- `leaderboard` → `/api/leaderboard/`

**Response Handling:**
The function automatically handles both response formats:
- Paginated: `{ results: [...], count: N }`
- Plain array: `[...]`

### Component Implementation

Each component follows the same pattern:

1. **State Management**: Uses React hooks (`useState`) for data, loading, and error states
2. **Data Fetching**: Uses `useEffect` to fetch data on component mount
3. **API Integration**: Calls `fetchFromAPI()` with the appropriate endpoint
4. **Response Handling**: Handles both paginated (`.results`) and plain array responses
5. **Console Logging**: Comprehensive logging for debugging

#### Example: Users Component

```javascript
useEffect(() => {
  console.log('[Users Component] Initializing...');
  const loadUsers = async () => {
    try {
      setLoading(true);
      console.log('[Users Component] Calling API endpoint: /api/users/');
      const data = await fetchFromAPI('users');
      console.log('[Users Component] Raw API response:', data);
      
      // Handle both paginated (.results) and plain array responses
      const usersArray = Array.isArray(data) ? data : (data.results || []);
      console.log('[Users Component] Parsed users array:', usersArray);
      console.log('[Users Component] Total users count:', usersArray.length);
      
      setUsers(usersArray);
      setError(null);
    } catch (err) {
      console.error('[Users Component] Failed to load users:', err);
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  loadUsers();
}, []);
```

## Console Logging

The app provides extensive console logging for debugging:

### On App Start (`index.js`)
```
[Index] ========================================
[Index] OctoFit Tracker Frontend Starting...
[Index] Environment Variables:
[Index] - NODE_ENV: development
[Index] - REACT_APP_CODESPACE_NAME: friendly-space-engine-7r96x5x9r9735wv
[Index] - CODESPACE_NAME: friendly-space-engine-7r96x5x9r9735wv
[Index] ========================================
```

### API URL Configuration (`api.js`)
```
[API] REACT_APP_CODESPACE_NAME: friendly-space-engine-7r96x5x9r9735wv
[API] CODESPACE_NAME: friendly-space-engine-7r96x5x9r9735wv
[API] Resolved codespace name: friendly-space-engine-7r96x5x9r9735wv
[API] Configured base URL: https://friendly-space-engine-7r96x5x9r9735wv-8000.app.github.dev
```

### API Requests (`api.js`)
```
[API] ========================================
[API] Fetching from endpoint: users
[API] Full REST API URL: https://friendly-space-engine-7r96x5x9r9735wv-8000.app.github.dev/api/users/
[API] ========================================
[API] Response status: 200 OK
[API] Successfully fetched data from https://...
[API] Raw response data: [...]
[API] Response is array: true
[API] Response has .results: false
[API] Parsed 5 items from users
[API] ========================================
```

### Component Loading
```
[Users Component] Initializing component and fetching users data...
[Users Component] Calling API endpoint: /api/users/
[Users Component] Raw API response: [...]
[Users Component] Parsed users array: [...]
[Users Component] Total users count: 5
```

## Setup Instructions

### 1. Initial Setup

Run the setup script to configure environment variables:

```bash
cd octofit-tracker/frontend
./setup.sh
```

This will:
- Detect if running in GitHub Codespaces
- Create `.env` file with `REACT_APP_CODESPACE_NAME`
- Display the backend API URL

### 2. Install Dependencies

```bash
npm install
```

Required packages:
- `react` & `react-dom`: React framework
- `react-router-dom`: Routing
- `bootstrap`: UI components
- `web-vitals`: Performance monitoring

### 3. Start the Development Server

```bash
npm start
```

The app will be available at:
- **Codespaces**: `https://${CODESPACE_NAME}-3000.app.github.dev`
- **Local**: `http://localhost:3000`

## Navigation

The app uses `react-router-dom` for navigation:

- **Home** (`/`) - Dashboard with links to all sections
- **Users** (`/users`) - User management
- **Teams** (`/teams`) - Team management
- **Activities** (`/activities`) - Activity tracking
- **Workouts** (`/workouts`) - Workout suggestions
- **Leaderboard** (`/leaderboard`) - Competitive rankings

Navigation is implemented in [src/App.js](src/App.js#L76-L108) using:
- `<Link>` components for navigation links
- `<Routes>` and `<Route>` for route definitions
- Bootstrap navbar for responsive design

## Backend API Requirements

### CORS Configuration

The Django backend must have CORS enabled for the frontend origin:

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    f"https://{os.environ.get('CODESPACE_NAME', 'localhost')}-3000.app.github.dev",
    "http://localhost:3000",
]
```

### API Endpoints

All endpoints should be accessible at `/api/<resource>/`:

- `GET /api/users/` - List all users
- `GET /api/teams/` - List all teams
- `GET /api/activities/` - List all activities
- `GET /api/workouts/` - List all workouts
- `GET /api/leaderboard/` - Get leaderboard data

### Response Format

The backend can return either:

**Plain array:**
```json
[
  { "id": 1, "name": "User 1", ... },
  { "id": 2, "name": "User 2", ... }
]
```

**Paginated (DRF PageNumberPagination):**
```json
{
  "count": 10,
  "next": "...",
  "previous": null,
  "results": [
    { "id": 1, "name": "User 1", ... },
    { "id": 2, "name": "User 2", ... }
  ]
}
```

The frontend handles both formats automatically.

## Troubleshooting

### Issue: "CODESPACE_NAME not set"

**Symptom:** Console shows:
```
[API] CODESPACE_NAME environment variable not set. Using fallback URL: http://localhost:8000
```

**Solution:**
- Run `./setup.sh` to create the `.env` file
- Or manually create `.env` with: `REACT_APP_CODESPACE_NAME=$CODESPACE_NAME`
- Restart the development server

### Issue: CORS Error

**Symptom:** Browser console shows CORS error

**Solution:**
- Ensure Django backend has `django-cors-headers` installed
- Add frontend URL to `CORS_ALLOWED_ORIGINS` in backend settings
- Verify backend is running on port 8000

### Issue: 404 Not Found

**Symptom:** API returns 404

**Solution:**
- Verify backend is running: `python manage.py runserver 0.0.0.0:8000`
- Check backend URLs are configured correctly
- Verify API endpoints exist: visit `https://...-8000.app.github.dev/api/`

### Issue: Empty Data

**Symptom:** Components show "No data found"

**Solution:**
- Check browser console for API errors
- Verify backend has data: run `python manage.py populate_db`
- Test API directly: `curl https://...-8000.app.github.dev/api/users/`

## Development Tips

1. **Keep Console Open**: Watch the browser console for detailed API logs
2. **Use React DevTools**: Install React Developer Tools browser extension
3. **Hot Reload**: Changes to React components auto-reload
4. **Environment Variables**: Restart server after changing `.env` file
5. **API Testing**: Test API endpoints in browser before using in components

## File Reference

- [src/App.js](src/App.js) - Main app component with routing
- [src/index.js](src/index.js) - App entry point
- [src/utils/api.js](src/utils/api.js) - API utility functions
- [src/components/Users.js](src/components/Users.js) - Users component
- [src/components/Teams.js](src/components/Teams.js) - Teams component
- [src/components/Activities.js](src/components/Activities.js) - Activities component
- [src/components/Workouts.js](src/components/Workouts.js) - Workouts component
- [src/components/Leaderboard.js](src/components/Leaderboard.js) - Leaderboard component

## Next Steps

- [ ] Add create/edit/delete functionality
- [ ] Implement user authentication
- [ ] Add data visualization (charts, graphs)
- [ ] Implement real-time updates
- [ ] Add pagination controls for large datasets
- [ ] Implement search and filtering
