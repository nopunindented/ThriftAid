import './App.css';
import './navbar/Navbar'

import { Route, Routes } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <div className='App'>
      <Routes>
      <Route exact path="/" Component={Home} />
      <Route exact path="/about" Component={About} />
      </Routes>
      <Navbar />
    </div>
  );
}
/* React router shenanigans
<Route exact path="/" Component={Home} />
<Route exact path="/about" Component={About} />
*/

export default App;
