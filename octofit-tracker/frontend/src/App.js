import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getAPIBaseURL } from './utils/api';

function Home() {
  return (
    <div className="container mt-5 mb-5">
      {/* Header Section */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold mb-3">
            <i className="bi bi-lightning-fill text-warning"></i> Welcome to OctoFit Tracker
          </h1>
          <p className="lead text-muted fw-normal">
            Track your fitness activities, compete with teams, and reach your goals!
          </p>
        </div>
      </div>

      {/* Features Grid - Row 1 */}
      <div className="row g-4 mb-5">
        {/* Users Card */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="mb-3">
                <i className="bi bi-people text-primary" style={{fontSize: '3rem'}}></i>
              </div>
              <h5 className="card-title fw-bold">Users</h5>
              <p className="card-text text-muted">
                Manage user profiles and track individual progress.
              </p>
              <Link to="/users" className="btn btn-primary btn-lg">
                View Users <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Teams Card */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="mb-3">
                <i className="bi bi-people-fill text-success" style={{fontSize: '3rem'}}></i>
              </div>
              <h5 className="card-title fw-bold">Teams</h5>
              <p className="card-text text-muted">
                Create and manage teams for group challenges.
              </p>
              <Link to="/teams" className="btn btn-success btn-lg">
                View Teams <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Activities Card */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="mb-3">
                <i className="bi bi-lightning-charge text-info" style={{fontSize: '3rem'}}></i>
              </div>
              <h5 className="card-title fw-bold">Activities</h5>
              <p className="card-text text-muted">
                Browse and log various fitness activities.
              </p>
              <Link to="/activities" className="btn btn-info btn-lg">
                View Activities <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid - Row 2 */}
      <div className="row g-4">
        {/* Workouts Card */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="mb-3">
                <i className="bi bi-heart-pulse text-danger" style={{fontSize: '3rem'}}></i>
              </div>
              <h5 className="card-title fw-bold">Workouts</h5>
              <p className="card-text text-muted">
                Access personalized workout suggestions.
              </p>
              <Link to="/workouts" className="btn btn-danger btn-lg">
                View Workouts <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Leaderboard Card */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="mb-3">
                <i className="bi bi-trophy text-warning" style={{fontSize: '3rem'}}></i>
              </div>
              <h5 className="card-title fw-bold">Leaderboard</h5>
              <p className="card-text text-muted">
                See who's leading in the fitness challenge.
              </p>
              <Link to="/leaderboard" className="btn btn-warning btn-lg">
                View Leaderboard <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm bg-light">
            <div className="card-body text-center">
              <div className="mb-3">
                <i className="bi bi-graph-up text-secondary" style={{fontSize: '3rem'}}></i>
              </div>
              <h5 className="card-title fw-bold">Analytics</h5>
              <p className="card-text text-muted">
                Track your progress and achievements.
              </p>
              <button className="btn btn-secondary btn-lg disabled">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    console.log('[App] OctoFit Tracker initialized');
    console.log('[App] API Base URL:', getAPIBaseURL());
    console.log('[App] Available routes: Home, Users, Teams, Activities, Workouts, Leaderboard');
  }, []);

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            <i className="bi bi-lightning-charge me-2"></i>OctoFit Tracker
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  <i className="bi bi-house-fill me-1"></i>Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <i className="bi bi-people me-1"></i>Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  <i className="bi bi-people-fill me-1"></i>Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  <i className="bi bi-lightning-charge me-1"></i>Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  <i className="bi bi-heart-pulse me-1"></i>Workouts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  <i className="bi bi-trophy me-1"></i>Leaderboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
