import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
// -----------------------------------------------------------
import Home from './Pages/Home';
import AlternativeMovies from './Pages/AlternativeMovies';

// Account Functionality
import Login from './Pages/User/Login';
import Register from './Pages/User/Register';
import Track from './Pages/User/Track';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/AlternativeMovies" element={<AlternativeMovies/>} />

        {/* Account Functionality */}
        <Route path="/user/login" element={<Login/>} />
        <Route path="/user/register" element={<Register/>} />
        <Route path="/user/track" element={<Track/>} />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;