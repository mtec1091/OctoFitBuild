# OctoFit Tracker Frontend

A modern React-based fitness tracking application that connects to a Django REST API backend. Users can track fitness activities, manage teams, compete on leaderboards, and access personalized workout suggestions.

## Features

- **User Management** - View and manage user profiles
- **Team Management** - Create and manage fitness teams for group challenges
- **Activity Tracking** - Browse and log fitness activities
- **Workout Suggestions** - Access personalized workout plans
- **Competitive Leaderboard** - Compare fitness progress with other users
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Real-time API Integration** - Data synced with Django REST backend

## Project Structure

```
src/
├── components/
│   ├── Activities.js    # Activities listing and display
│   ├── Leaderboard.js   # Competitive leaderboard view
│   ├── Teams.js         # Team management component
│   ├── Users.js         # User profiles and display
│   └── Workouts.js      # Workout suggestions and display
├── utils/
│   └── api.js           # Centralized API client with environment handling
├── App.js               # Main app component with navigation
├── App.css              # Application styling
├── index.js             # React DOM entry point
└── index.css            # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- GitHub Codespace or local development environment

### Installation

1. Navigate to the frontend directory:
```bash
cd octofit-tracker/frontend
```

2. Install dependencies:
```bash
npm install
```

### Available Scripts

#### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes. Check the console for compilation errors.

#### `npm test`

Launches the test runner in interactive watch mode. See [Create React App testing documentation](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder. The build is minified and filenames include hashes for optimal caching. Your app is ready to be deployed!

## API Integration

The frontend connects to a Django REST API backend. The API base URL is automatically configured based on the environment:

### In GitHub Codespaces
```
https://${CODESPACE_NAME}-8000.app.github.dev
```

### In Local Development
```
http://localhost:8000
```

### API Endpoints

- `GET /api/activities/` - Fetch activities
- `GET /api/leaderboard/` - Fetch leaderboard data
- `GET /api/teams/` - Fetch teams
- `GET /api/users/` - Fetch users
- `GET /api/workouts/` - Fetch workouts

All responses support both paginated (`results` field) and plain array formats.

## Environment Configuration

For detailed environment variable setup, see [ENVIRONMENT.md](./ENVIRONMENT.md)

The application automatically detects the codespace name from the `CODESPACE_NAME` environment variable when running in GitHub Codespaces.

## Debugging

### Console Logging

The application includes comprehensive console logging to help with debugging:

1. **App-level logs** - Initialization and available routes
2. **API utility logs** - All API requests with `[API]` prefix
3. **Component logs** - Each component logs with its name prefix (e.g., `[Users Component]`)

Open browser DevTools (F12) and check the Console tab to see detailed logs.

### Browser DevTools

- **Console** - View logs, errors, and warnings
- **Network** - Monitor API requests and responses
- **Application** - Check stored data and cookies
- **React DevTools** - Inspect component props and state

## Dependencies

Key dependencies:
- **React** (v19) - UI framework
- **React Router DOM** (v7) - Navigation and routing
- **Bootstrap** (v5) - CSS framework and components
- **React Scripts** (v5) - Create React App build tools

See [package.json](./package.json) for complete dependency list.

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Development Tips

1. **Component Structure** - All components follow a consistent pattern: fetch data on mount, show loading/error states, display data in tables
2. **API Calls** - Use the `fetchFromAPI()` function from `utils/api.js` for consistent error handling
3. **Styling** - Bootstrap classes are used throughout for responsive design. See `App.css` for custom overrides
4. **State Management** - Simple useState hooks manage component-level state. For complex state, consider adding Redux/Context API

## Troubleshooting

### Blank Page or 404 on Navigation

Ensure the React Router is properly configured in `index.js` with `<BrowserRouter>` wrapper.

### API Connection Errors

1. Check browser console (F12) for error logs
2. Verify backend is running on port 8000
3. In codespaces, verify port 8000 is forwarded correctly
4. Check CORS headers from backend

### No Data Displayed

1. Check browser console for API logs
2. Verify API endpoint URLs in `utils/api.js`
3. Check backend API responses in Network tab
4. Verify database has test data

## Learn More

- [React Documentation](https://react.dev/)
- [Create React App Documentation](https://create-react-app.dev/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [React Router Documentation](https://reactrouter.com/)

## Production Deployment

To build for production:

```bash
npm run build
```

This creates an optimized production build in the `build` folder. The build is minified and ready for deployment to any static hosting service.


### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
