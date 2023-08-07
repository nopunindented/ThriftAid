import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';
import { Provider } from 'react-redux';
import { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import Login from './auth/Login.js';
import Home from './pages/Home.tsx';
import Register from './auth/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import UserNavbar from './loggedinnavbar/UserNavbar.tsx';
import Profile from './pages/profile/Profile';
import NewPosting from './pages/postings/Posting'
import AllPostings from './pages/postings/AllPostings';
import Errorpage from './Errorpage';

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
            <Route path="*" element= {<Errorpage />} />
          </Routes>
          <UserNavbar />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;