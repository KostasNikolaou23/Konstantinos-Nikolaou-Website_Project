import { useState, useEffect } from "react";
import GridItem from "../Components/pages/Home/GridItem";
import { getTrendingContent } from "../Components/API";

import "bootstrap/dist/css/bootstrap.min.css"; //Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS

function Home() {
	const [trendingMovies, setTrendingMovies] = useState([]);
	const [trendingTVSeries, setTrendingTVSeries] = useState([]);

	useEffect(() => {
		async function fetchContent() {
			try {
				const movies = await getTrendingContent("movies", 4);
				setTrendingMovies(movies);

				const tvSeries = await getTrendingContent("tvseries", 4);
				console.log("TV Series Data:", tvSeries); // Debugging
				setTrendingTVSeries(tvSeries);
			} catch (error) {
				console.error("Error fetching content:", error);
			}
		}

		fetchContent();
	}, []);

	return (
		<div className="container fluid">
			{/* Movies Section */}
			<div className="row align-items-center">
				<div className="col">
					<h2>Movies</h2>
				</div>
				<div className="col"></div>
				<div className="col d-flex justify-content-end">
					<button className="watch-button">View More</button>
				</div>
			</div>
			<section className="grid">
				{trendingMovies.map((movie, index) => (
					<GridItem
						key={index}
						cardName={movie.title}
						cardDesc={movie.overview}
						cardImage={
							movie.poster_path
								? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
								: "path/to/fallback-image.jpg"
						}
						enableFavoriteButton={true} // Enable favorite button for movies
						enableReviewButton={true} // Enable review button for movies
					/>
				))}
			</section>

			{/* TV Series Section */}
			<div className="row align-items-center">
				<div className="col">
					<h2>TV Series</h2>
				</div>
				<div className="col"></div>
				<div className="col d-flex justify-content-end">
					<a href="/tvseries">
						<button className="watch-button">View More</button>
					</a>
				</div>
			</div>
			<section className="grid">
				{trendingTVSeries.length > 0 ? (
					trendingTVSeries.map((series, index) => (
						<GridItem
							key={index}
							cardName={series.name}
							cardDesc={series.overview}
							cardImage={
								series.poster_path
									? `https://image.tmdb.org/t/p/w500/${series.poster_path}`
									: "path/to/fallback-image.jpg"
							}
						/>
					))
				) : (
					<p>No TV series available at the moment.</p>
				)}
			</section>
		</div>
	);
}

export default Home;
