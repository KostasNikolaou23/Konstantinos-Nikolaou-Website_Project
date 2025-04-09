import React, { useState } from "react";
import '../App.css';

const shows = [
  {
    title: "Movies",
    description: "Explore a variety of movies.",
    image: "https://static0.srcdn.com/wordpress/wp-content/uploads/2023/11/greatest-movies-of-all-time.jpg",
  },
  {
    title: "Series",
    description: "Watch through a never-ending list of series.",
    image: "https://i.imgflip.com/8prdek.jpg?a484200",
  },
  {
    title: "Kids Shows",
    description: "Fun and educational content for kids.",
    image: "https://www.highbrowmagazine.com/sites/default/files/4tvshows.jpg",
  },
  {
    title: "Documentaries",
    description: "Learn about things through these documentaries.",
    image: "https://tfiglobalnews.com/wp-content/uploads/2023/03/greatest-documentaries-of-all-time-art-001.jpg",
  },
];

function TestPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  return (
    <div className="container">
      <header className="header">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <h1>Movie Cave</h1>
        <nav className="navbar">
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
          <ul className={`menu ${menuOpen ? "open" : ""}`}>
            <li><a href="#">Home</a></li>
            <li><a href="#">Movies</a></li>
            <li><a href="#">Series</a></li>
            <li><a href="#">Kids</a></li>
            <li><a href="#">Documentaries</a></li>
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

      <section className="grid">
        {shows.map((show, index) => (
          <div key={index} className="card">
            <img src={show.image} alt={show.title} className="card-image" />
            <div className="card-content">
              <h2>{show.title}</h2>
              <p>{show.description}</p>
              <button className="watch-button">Watch Now</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default TestPage;