import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Components/Header';
import Footer from './Components/Footer';

// Pages
// -----------------------------------------------------------
import Home from './Pages/Home';


// Account Functionality
import Login from './Pages/User/Login';
import Register from './Pages/User/Register';
import Track from './Pages/User/Track';
import Achievements from './Pages/User/Achievements';
import MyList from './Pages/User/MyList';
import Profile from './Pages/User/Profile';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/settings" element={<div>Settings</div>} />

          {/* Account Functionality */}
          <Route path="/user/login" element={<Login/>} />
          <Route path="/user/register" element={<Register/>} />
          <Route path="/user/track" element={<Track/>} />
          <Route path="/user/achievements" element={<Achievements/>} />
          <Route path="/user/mylist" element={<MyList/>} />
          <Route path="/user/profile" element={<Profile/>} />


          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;