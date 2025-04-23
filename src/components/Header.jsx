import { useState } from "react";

import { getSearchResults } from "./API"; // Correct relative path

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState(""); // State to store search input
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const handleSearchKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        const results = await getSearchResults(searchText);
        setSearchResults(results); // Update state with search results
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  return (
    <header className="header">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
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

          {/* Account Functionality */}
          <li><a href="/user/login">Login</a></li>
          <li><a href="/user/register">Register</a></li>
          <li><a href="/user/track">Track</a></li>
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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} // Update state on input change
            onKeyDown={handleSearchKeyDown} // Trigger search on Enter key press
          />
        )}
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              <a href={`https://www.themoviedb.org/movie/${result.id}`} target="_blank" rel="noopener noreferrer">
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Header;