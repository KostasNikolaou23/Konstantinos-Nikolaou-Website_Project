import React from "react";

export function GridItem({ show }) {
  return (
    <div className="card">
      <img src={show.image} alt={show.title} className="card-image" />
      <div className="card-content">
        <h2>{show.title}</h2>
        <p>{show.description}</p>
        <button className="watch-button">Watch Now</button>
      </div>
    </div>
  );
}

export default GridItem;