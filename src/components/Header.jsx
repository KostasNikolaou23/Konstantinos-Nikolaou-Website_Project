import { useState } from "react";
import '../App.css';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

	return (
    <header className="header">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <h1>Movie Cave</h1>
      <nav className="navbar">
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`menu ${menuOpen ? "open" : ""}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/movies">Movies</a></li>
          <li><a href="/series">Series</a></li>
          <li><a href="/kids">Kids</a></li>
          <li><a href="/documentaries">Documentaries</a></li>
        </ul>
      </nav>
      <div className={`search-container ${searchOpen ? "open" : ""}`}>
        <button className="search-toggle" onClick={toggleSearch}>
          <i className="fa fa-search"></i>
        </button>
        {searchOpen && (
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
        )}
      </div>
    </header>
	);
}

export default Header;