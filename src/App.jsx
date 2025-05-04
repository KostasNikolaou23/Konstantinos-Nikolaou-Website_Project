import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
// -----------------------------------------------------------
import Home from './Pages/Home';

// Account Functionality
import Login from './Pages/User/Login';
import Register from './Pages/User/Register';
import Track from './Pages/User/Track';
import Achievements from './Pages/User/Achievements';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/settings" element={<div>Settings</div>} />

        {/* Account Functionality */}
        <Route path="/user/login" element={<Login/>} />
        <Route path="/user/register" element={<Register/>} />
        <Route path="/user/track" element={<Track/>} />
        <Route path="/user/achievements" element={<Achievements/>} />
        <Route path="/user/mylist" element={<div>My List</div>} />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;