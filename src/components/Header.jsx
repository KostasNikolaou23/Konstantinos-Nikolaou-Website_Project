import { useState } from "react";
import '../App.css';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

	return (
			<header className="header">
        <h1>Movie Cave</h1>

        <nav className="navbar">
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
          <ul className={`menu ${menuOpen ? "open" : ""}`}>
            <li><a href="#">Home</a></li>
            <li><a href="#">Drama</a></li>
            <li><a href="#">Documentaries</a></li>
            <li><a href="#">Kids</a></li>
            <li><a href="#">Live TV</a></li>
          </ul>
        </nav>
        <div className="search-container">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </header>
	);
}

export default Header;