import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './Pages/Home';
import AlternativeMovies from './Pages/AlternativeMovies';
import TestPage from './Pages/TestPage';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/AlternativeMovies" element={<AlternativeMovies/>} />
        <Route path="/testpage" element={<TestPage/>} />
        <Route path="*" element={<div>404 Not Found</div>} />

      </Routes>
    </Router>
  );
}

export default App;