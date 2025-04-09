import React, { useState } from "react";
import './testpage.css';

const shows = [
  {
    title: "Drama Series",
    description: "Explore a variety of gripping dramas.",
    image: "https://via.placeholder.com/300x180.png?text=Drama",
  },
  {
    title: "Documentaries",
    description: "Eye-opening and informative documentaries.",
    image: "https://via.placeholder.com/300x180.png?text=Documentary",
  },
  {
    title: "Kids Shows",
    description: "Fun and educational content for kids.",
    image: "https://via.placeholder.com/300x180.png?text=Kids",
  },
  {
    title: "Live TV",
    description: "Watch Greek national TV channels live.",
    image: "https://via.placeholder.com/300x180.png?text=Live+TV",
  },
];

export function TestPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="app">
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
          <input type="text" placeholder="Search shows..." className="search-input" />
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