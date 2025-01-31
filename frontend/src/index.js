import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="914973085387-m4dv9f5nbqn3skeuukr3bqnh0g61034e.apps.googleusercontent.com">
      <Router>
        <App />
        <ToastContainer />
      </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>
);