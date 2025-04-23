import React from "react";

export function GridCard({ name, poster, status }) {
  return (
    <div className="card">
      <img src={poster} alt={name} className="card-image" />
      <div className="card-content">
        <h2>{name}</h2>
        {/* <p>{description}</p> */}
        <p>Status: {status}</p>

        {status === "Watching" && (
          <p>Currently Watching</p>
        )}
        {status === "To Watch" && (
          <p>To Watch</p>
        )}
        {status === "Watched" && (
          <p>Watched</p>
        )}
        
        <button className="watch-button">Watch Now</button>
      </div>
    </div>
  );
}

export default GridCard;