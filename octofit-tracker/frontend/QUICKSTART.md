# OctoFit Tracker Frontend - Quick Start Guide

## 🚀 Quick Setup

### In GitHub Codespaces

1. **Install Dependencies**
   ```bash
   cd /workspaces/OctoFitBuild/octofit-tracker/frontend
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm start
   ```

3. **Access the Application**
   - The browser should open automatically to `http://localhost:3000`
   - Or navigate to it manually in the browser

### Local Development

Follow the same steps above, but ensure:
- Backend is running on `http://localhost:8000`
- Node.js v14+ is installed

## 📋 What's Running

### Frontend
- **URL**: `http://localhost:3000`
- **Framework**: React 19 with React Router v7
- **Port**: 3000

### Backend
- **URL**: `http://localhost:8000` (local) or `https://{CODESPACE_NAME}-8000.app.github.dev` (codespace)
- **Framework**: Django REST Framework
- **Port**: 8000
- **API Base**: `/api/`

## 🔍 Verify Everything Works

1. **Open Browser Console** (F12 or Ctrl+Shift+I)
2. **Look for These Logs**:
   ```
   [App] OctoFit Tracker initialized
   [App] API Base URL: https://codespace-name-8000.app.github.dev
   [API] Fetching from endpoint: users
   [API] Full URL: https://codespace-name-8000.app.github.dev/api/users/
   ```

3. **Expected Behavior**:
   - ✅ Navigation menu visible at top
   - ✅ Home page with 5 feature cards
   - ✅ Clicking links navigates to different pages
   - ✅ Data tables populate from API
   - ✅ Console shows API logs (no errors)

## 🚨 Troubleshooting

### Blank Page
- Check browser console (F12) for errors
- Verify backend is running
- Check Network tab to see if API requests are being made

### Data Not Loading
- Check browser console for `[API]` logs
- Look for error messages like "HTTP Error: 404"
- Verify backend has data in database
- Check that port 8000 is forwarded in codespaces

### API Connection Error
- Ensure backend started with: `python manage.py runserver 0.0.0.0:8000`
- In codespaces, verify port 8000 is forwarded as public
- Check that CORS is enabled in Django settings

### Port Already in Use
- Kill existing process: `lsof -i :3000` then kill the PID
- Or use `npm start -- --port 3001`

## 📱 Available Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with feature overview |
| `/users` | Users | List of user profiles |
| `/teams` | Teams | Team information |
| `/activities` | Activities | Available fitness activities |
| `/workouts` | Workouts | Workout suggestions |
| `/leaderboard` | Leaderboard | Competitive rankings |

## 🔄 API Endpoints

All endpoints follow the pattern: `/api/{endpoint}/`

```bash
GET /api/activities/    # Fetch activities
GET /api/leaderboard/   # Fetch leaderboard
GET /api/teams/         # Fetch teams
GET /api/users/         # Fetch users
GET /api/workouts/      # Fetch workouts
```

## 💾 Development Workflow

1. **Code Changes**:
   - Edit React components in `src/`
   - Hot reload automatically reloads the page

2. **Adding New Component**:
   ```bash
   # Create in src/components/NewComponent.js
   # Import in src/App.js
   # Add route in App.js
   # Add navigation link in navbar
   ```

3. **API Changes**:
   - Update endpoint in `src/utils/api.js` if structure changes
   - Components automatically use the new endpoint

## 📊 Console Logging

### Enable All Logs
Logs are automatically enabled. Check Console tab for:

- `[App]` - Application initialization
- `[API]` - API requests and responses
- `[Component Name Component]` - Component-specific logs

### Sample Log Output
```
[App] OctoFit Tracker initialized
[App] API Base URL: https://my-codespace-8000.app.github.dev
[App] Available routes: Home, Users, Teams, Activities, Workouts, Leaderboard
[Users Component] Initializing component and fetching users data...
[API] Fetching from endpoint: users
[API] Full URL: https://my-codespace-8000.app.github.dev/api/users/
[API] Successfully fetched data from /users/
[API] Response data: [...]
[API] Parsed 5 items from /users/
[Users Component] Successfully loaded users: (5) [{...}, {...}, ...]
```

## 🛠️ Available Commands

```bash
# Start development server with hot reload
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (⚠️ irreversible)
npm run eject
```

## 📚 Documentation Files

- **FRONTEND_UPDATES.md** - Detailed changes made to frontend
- **ENVIRONMENT.md** - Environment variable configuration
- **README.md** - Complete frontend documentation

## ✅ Testing Checklist

Before marking as done, verify:

- [ ] Frontend starts without errors
- [ ] Navigation menu works
- [ ] All 5 pages load (Users, Teams, Activities, Workouts, Leaderboard)
- [ ] Data displays in tables
- [ ] Console shows no errors
- [ ] Console shows [API] logs with successful fetches
- [ ] Loading states appear while fetching
- [ ] Errors display if backend is down
- [ ] Responsive design works on mobile

## 🔗 Useful Links

- React Documentation: https://react.dev/
- React Router: https://reactrouter.com/
- Bootstrap: https://getbootstrap.com/
- Django REST Framework: https://www.django-rest-framework.org/

## 💡 Tips

- Use keyboard shortcut `Ctrl+Shift+C` to inspect elements in browser
- Use React DevTools browser extension for debugging
- Check browser Network tab to see actual API requests
- Zoom out browser (Ctrl+-) to see responsive design

---

**Need Help?** Check the FRONTEND_UPDATES.md for detailed information about the implementation.
