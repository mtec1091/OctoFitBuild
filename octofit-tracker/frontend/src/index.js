import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

console.log('[Index] ========================================');
console.log('[Index] OctoFit Tracker Frontend Starting...');
console.log('[Index] Environment Variables:');
console.log('[Index] - NODE_ENV:', process.env.NODE_ENV);
console.log('[Index] - REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME);
console.log('[Index] - CODESPACE_NAME:', process.env.CODESPACE_NAME);
console.log('[Index] ========================================');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
