import React, { useEffect, useState } from "react";
import GridCard from "../../Components/pages/User/MyList/GridCard";
import API from "../../Components/API"; // Import the API component

const trackingData = [
	{
		mvdbID: "931349-ash",
		type: "movie",
		added: "2023-01-01",
	},
	{
		mvdbID: 67890,
		type: "series",
		status: "To Watch",
		added: "2023-01-01",
	},
	{
		mvdbID: 54321,
		type: "movie",
		added: "2023-01-01",
	},
	{
		mvdbID: 13579,
		type: "movie",
		added: "2023-01-01",
	},
];

export function MyList() {
	const [posters, setPosters] = useState({});
	const [titles, setTitles] = useState({}); // State to store movie/series titles

	useEffect(() => {
		async function fetchData() {
			const posterData = {};
			const titleData = {};
			for (const item of trackingData) {
				try {
					// Fetch poster data
					let posterResponse;
					if (item.type === "movie") {
						posterResponse = await API.getImages(item.type, item.mvdbID);
					} else if (item.type === "series") {
						posterResponse = await API.getImages("tv", item.mvdbID);
					}

					if (posterResponse?.posters?.length > 0) {
						posterData[item.mvdbID] = posterResponse.posters[0].file_path;
					} else {
						console.warn(`No poster found for ${item.mvdbID}`);
						posterData[item.mvdbID] = null; // Fallback to null
					}

					// Fetch movie/series details to get the title
					const detailsResponse = await API.getMovieDetails(item.mvdbID);
					titleData[item.mvdbID] =
						detailsResponse?.title || detailsResponse?.name || "Unknown Title";
				} catch (error) {
					console.error(`Error fetching data for ${item.mvdbID}:`, error);
					posterData[item.mvdbID] = null; // Fallback to null
					titleData[item.mvdbID] = "Unknown Title"; // Fallback title
				}
			}
			setPosters(posterData);
			setTitles(titleData);
		}
		fetchData();
	}, []);

	return (
		<div className="container">
			<section className="grid">
				{trackingData.map((item, index) => {
					const baseUrl = "https://image.tmdb.org/t/p/w200/";
					const posterPath = posters[item.mvdbID];
					const poster = posterPath
						? `${baseUrl}${posterPath}`
						: "path/to/fallback-image.jpg";
					const title = titles[item.mvdbID] || "Loading...";

					return (
						<GridCard
							key={index}
							name={title} // Use the fetched title here
							poster={poster} // Use the fetched poster here
							type={item.type}
							added={item.added}
						/>
					);
				})}
			</section>
		</div>
	);
}

export default MyList;
