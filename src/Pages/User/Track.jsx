import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import API from "../../Components/API"; // Import the API component
import GridCard from "../../Components/pages/Track/GridCard";

// Sample data for tracking
const trackingData = [
	{
		mvdbID: "931349-ash",
		type: "movie",
		status: "Watched",
		startDate: "2023-01-01",
	},
	{
		mvdbID: 67890,
		type: "series",
		status: "To Watch",
		season: 1,
		episode: 1,
		startDate: "2023-02-01",
	},
	{
		mvdbID: 54321,
		type: "movie",
		status: "Watching",
		startDate: "2023-03-01",
	},
];

export function Track() {
	const [posters, setPosters] = useState({});
	const [titles, setTitles] = useState({}); // State to store movie titles

	useEffect(() => {
		async function fetchData() {
			const posterData = {};
			const titleData = {};
			for (const item of trackingData) {
				try {
					// Fetch poster data
					console.log("ID: ", item.mvdbID, "Type: ", item.type);
					let posterResponse;
					if (item.type === "movie") {
						posterResponse = await API.getImages(item.type, item.mvdbID);
					} else if (item.type === "series") {
						posterResponse = await API.getImages(
							"tv",
							item.mvdbID,
							item.season,
							item.episode
						);
					}
					console.log(posterResponse);
					posterData[item.mvdbID] = posterResponse?.posters?.[0]?.file_path || "";

					// Fetch movie details to get the title
					const detailsResponse = await API.getMovieDetails(item.mvdbID);
					console.log(detailsResponse);

					titleData[item.mvdbID] =
						detailsResponse?.title || "Unknown Title";
				} catch (error) {
					console.error(`Error fetching data for ${item.mvdbID}:`, error);
				}
			}
			setPosters(posterData);
			setTitles(titleData);
		}
		fetchData();
	}, []);

	return (
		<div className="container">
			<Header />
			<center>

                {/* Search function */}
                

				<section className="grid">
					{trackingData.map((item, index) => {
						const baseUrl = "https://image.tmdb.org/t/p/w200/";
						const posterPath = posters[item.mvdbID];
						const poster = posterPath ? `${baseUrl}${posterPath}` : "";
						const title = titles[item.mvdbID] || "Loading...";

						return (
							<GridCard
								key={index}
								name={title} // Use the fetched title here
								poster={poster}
								status={item.status}
							/>
						);
					})}
				</section>
			</center>
		</div>
	);
}

export default Track;
