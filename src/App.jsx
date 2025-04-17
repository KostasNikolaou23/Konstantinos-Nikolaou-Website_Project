import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './Pages/Home';
import AlternativeMovies from './Pages/AlternativeMovies';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/AlternativeMovies" element={<AlternativeMovies/>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;