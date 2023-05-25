import './App.css';
import './navbar/Navbar'

import { Route, Routes } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Home from './pages/Home'
import SignupPage from './pages/Signupp';
import { useLocation } from 'react-router-dom';
import NavbarMaybe from './navmaybe';
import Dashboard from './pages/userdashboard';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path= "/signup" Component={SignupPage} />
        <Route exact path= "/dashboard" Component={Dashboard} />
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
