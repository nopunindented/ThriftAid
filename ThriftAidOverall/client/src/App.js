import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';
import { Provider } from 'react-redux';
import Login from './auth/Login.js';
import Home from './pages/Home.js';
import Register from './auth/Signup';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  useEffect(() => {
    // Check if the user is logged in on each App render
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      setAuthToken(jwtToken);
      const decoded = jwt_decode(jwtToken);
      store.dispatch(setCurrentUser(decoded));

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
      }
    }

    // Handle redirecting to login page when user is not authenticated
    const { isAuthenticated } = store.getState().auth;
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, []);

  const navigate = useNavigate(); // Add this line to import the `useNavigate` hook

  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
