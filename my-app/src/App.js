import './App.css';
import './navbar/Navbar'

import { Route, Routes } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Home from './pages/Home'
import { useLocation } from 'react-router-dom';
import NavbarMaybe from './navmaybe';
import Dashboard from './pages/userdashboard';
import SignupForm from './pages/signuppageform/Signform';
import Loggedin from './pages/loginpage/Loginpage';
import Userfront from "@userfront/core";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path= "/signup" Component={SignupForm} />
        <Route exact path= "/dashboard" Component={Dashboard} />
        <Route exact path= "/login" Component={Loggedin} />
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
