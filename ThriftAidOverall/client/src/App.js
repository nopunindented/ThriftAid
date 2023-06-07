import { useLocation } from 'react-router-dom';
import NavbarMaybe from './navmaybe';
import { LoginForm } from './pages/account/loginpage/Loginpage';
import Register from './pages/Signup.js'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";
import PrivateRoute from "./pages/private-route/PrivateRoute";
import Dashboard from './pages/dashboard/Dashboard';
import { Provider } from "react-redux";
import Login from './pages/Login';


if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
