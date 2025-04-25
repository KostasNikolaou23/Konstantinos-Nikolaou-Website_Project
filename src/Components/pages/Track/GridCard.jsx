import React from "react";

export function GridCard({ name, poster, status, type, season, episode }) {
	return (
		<div className="card">
			<img src={poster} alt={name} className="card-image" />
			<div className="card-content">
				<h2>{name}</h2>
				{/* <p>{description}</p> */}
				<p>Status: {status}</p>

				{status === "Watching" && <p>Currently Watching</p>}
				{status === "To Watch" && <p>To Watch</p>}
				{status === "Watched" && <p>Watched</p>}

				{type === "series" &&
					(status === "Watching" ? (
						<p>
							Season {season}, Episode {episode}
						</p>
					) : status === "To Watch" ? (
						<p>
							Season {season}, Episode {episode}
						</p>
					) : null)}

        {/* If the media is either to be watched or in progress by user */}
				{status === "Watching" || status === "To Watch" ? (
					<button className="watch-button">Watch Now</button>
				) : null}
			</div>
		</div>
	);
}

export default GridCard;
