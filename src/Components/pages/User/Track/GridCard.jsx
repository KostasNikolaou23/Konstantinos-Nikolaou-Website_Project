import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Stack from 'react-bootstrap/Stack';


export function GridCard({
	name,
	poster,
	status,
	type,
	season,
	episode,
	progress,
}) {
	return (
		<div className="card">
			<img src={poster} alt={name} className="card-image" />
			<div className="card-content">
				<h2 class="card-seriesname">{name}</h2>
				

				<Stack gap={3}>

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
					) : null)
				}


				{/* Progress Bar for in progress stuff */}
				{status === "Watching" ? (
					// if progress is in between 0 and 20, use variant danger
					// if progress is in between 20 and 50, use variant warning
					// if progress is in between 50 and 80, use variant info
					// if progress is in between 80 and 100, use variant success

					<ProgressBar
						now={progress}
						label={`${progress}%`}
						variant={
							progress < 20
								? "danger"
								: progress < 50
								? "warning"
								: progress < 75
								? "info"
								: "success"
						}
						animated
						style={{ width: "100%" }}
					/>
						
					// <ProgressBar now={progress} label={`${progress}%`} />
				) : null}

				{/* If the media is either to be watched or in progress by user */}
				{ status === "To Watch" ? (
					<button className="watch-button">Watch Now</button>
				) : status === "Watching" ? (
					<button className="watch-button">Continue Watching</button>
				) : null }

				{/* If the media is done being watched, let user review with a 5 star system */}

				{ status === "Watched" ? (
					<div className="rating">
						<p>Rate this (System In Progress)</p>
						<div className="stars">
							<span className="star" role="img" aria-label="star">⭐</span>
							<span className="star" role="img" aria-label="star">⭐</span>
							<span className="star" role="img" aria-label="star">⭐</span>
							<span className="star" role="img" aria-label="star">⭐</span>
							<span className="star" role="img" aria-label="star">⭐</span>
						</div>
					</div>
				) : null}
				
				</Stack>
			</div>
		</div>
	);
}

export default GridCard;
