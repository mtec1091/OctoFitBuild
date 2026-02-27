# Frontend Environment Configuration

## Environment Variables

### REACT_APP_CODESPACE_NAME
This variable is automatically set by GitHub Codespaces. It contains the name of your codespace.

In GitHub Codespaces, the following environment variables are automatically available:
- `CODESPACE_NAME` - The name of your codespace
- `CODESPACES` - Set to 'true' when running in a codespace

The frontend automatically uses the `CODESPACE_NAME` environment variable to construct the API base URL:
```
https://${CODESPACE_NAME}-8000.app.github.dev
```

## Local Development (Outside Codespaces)

If running locally without a codespace, the fallback URL used is:
```
http://localhost:8000
```

You can override this by setting the `REACT_APP_CODESPACE_NAME` environment variable:
```bash
export REACT_APP_CODESPACE_NAME=my-codespace-name
npm start
```

## Available API Endpoints

The frontend makes requests to the following REST API endpoints:

- `/api/activities/` - List of fitness activities
- `/api/leaderboard/` - Competitive leaderboard data
- `/api/teams/` - Team information and management
- `/api/users/` - User profiles and data
- `/api/workouts/` - Workout plans and suggestions

All endpoints support both:
- **Paginated responses** with a `results` field (e.g., `{ results: [...], count: 10 }`)
- **Plain array responses** (e.g., `[...]`)

## Console Logging

The frontend includes comprehensive logging to help with debugging:

1. **App initialization logs** - View available routes and API base URL
2. **API utility logs** - Track all API requests with `[API]` prefix
3. **Component logs** - Each component logs initialization and data fetching with component-specific prefix (e.g., `[Activities Component]`)

Open the browser DevTools (F12) and check the Console tab to see detailed logs.

## Running the Frontend

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The development server typically runs on `http://localhost:3000`
