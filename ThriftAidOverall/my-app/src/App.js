import './App.css';
import './navbar/Navbar'

import { Route, Routes } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Home from './pages/Home'
import { useLocation } from 'react-router-dom';
import NavbarMaybe from './navmaybe';
import Dashboard from './pages/userdashboard';
import { Signup } from './pages/account/signuppageform/Signform';
import Loggedin from './pages/account/loginpage/Loginpage';
import Userfront from "@userfront/core";
import UserNavbar from './loggedinnavbar/UserNavbar';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path= "/signup" Component={SignupFormNew} />
        <Route exact path= "/dashboard" Component={Dashboard} />
        <Route exact path= "/login" Component={LoginForm} />
      </Routes>
      <NavbarMaybe />
    </div>
  );
}
/* React router shenanigans
<Route exact path="/" Component={Home} />
<Route exact path="/about" Component={About} />
*/

export default App;
