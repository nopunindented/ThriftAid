import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';
import { Provider } from 'react-redux';
import { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import Login from './auth/Login.tsx';
import Home from './pages/Home.tsx';
import Register from './auth/Signup.tsx';
import Dashboard from './pages/dashboard/Dashboard.tsx';
import UserNavbar from './loggedinnavbar/UserNavbar.tsx';
import Profile from './pages/profile/Profile.tsx';
import NewPosting from './pages/postings/Posting.tsx'
import AllPostings from './pages/postings/AllPostings.tsx';
import Errorpage from './Errorpage.tsx';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      setAuthToken(jwtToken);
      try {
        const decoded = jwt_decode(jwtToken);
        store.dispatch(setCurrentUser(decoded));
  
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          store.dispatch(logoutUser());
          navigate('/login');
        }
      } catch (error) {
        console.error('Error decoding JWT token:', error);
        store.dispatch(logoutUser());
      }
    }
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    let title = 'ThriftAid'; // Default title

    // Customize titles based on paths
    if (path === '/') {
      title = 'ThriftAid';
    } 
    else if (path === '/dashboard') {
      title = 'Dashboard';
    } else if (path === '/profile') {
      title = 'Profile';
    } // Add more conditions as needed
    else if (path === '/create') {
      title = 'Create';
    } 
    else if (path === '/allpostings') {
      title = 'All Postings';
    }
    else if (path === '/register') {
      title = 'Sign up';
    } 
    else if (path === '/login') {
      title = 'Login';
    } 
    else {
      title = '404';
    } 
    document.title = title; // Update the document's title
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<NewPosting />} />
            <Route path="/allpostings" element={<AllPostings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Errorpage />} />
          </Routes>
          <UserNavbar />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
