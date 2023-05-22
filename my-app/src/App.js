import logo from './logo.svg';
import './App.css';
import './navbar/Navbar'

import Navbar from './navbar/Navbar';
import { Route } from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import Homepage from './pages/Home';

function App() {
  return (
    <div className='App'>
      <Homepage />
    </div>
  );
}
/* React router shenanigans
<Route exact path="/" Component={Home} />
<Route exact path="/about" Component={About} />
*/

export default App;
