
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="top-nav">
          <div className="nav-inner">
            <Link to="/" className="brand-link">
              <img src="/octofitapp-small.png" alt="OctoFit logo" className="brand-logo" />
              <span>OctoFit Tracker</span>
            </Link>
            <ul className="nav-menu">
              <li><NavLink to="/activities">Activities</NavLink></li>
              <li><NavLink to="/leaderboard">Leaderboard</NavLink></li>
              <li><NavLink to="/teams">Teams</NavLink></li>
              <li><NavLink to="/users">Users</NavLink></li>
              <li><NavLink to="/workouts">Workouts</NavLink></li>
            </ul>
          </div>
        </nav>
        <main className="app-content">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={<h2>Welcome to OctoFit Tracker!</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
